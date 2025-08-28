
// src/store/modules/admin.js
import api from "src/boot/axios"

const state = {
  // Loading states
  loading: {
    users: false,
    restaurants: false,
    riders: false,
    orders: false,
    analytics: false,
    stats: false,
  },
  
  // Data
  users: [],
  restaurants: [],
  riders: [],
  orders: [],
  payments: [],
  analytics: {},

  
  // Stats
  stats: {
    totalUsers: 0,
    totalRestaurants: 0,
    totalRiders: 0,
    totalOrders: 0,
    revenue: 0,
    activeUsers: 0,
    avgRating: 0,
  },
  
  // Recent activities
  recentActivities: [],
  
  // Errors
  errors: {},
}

const mutations = {
  // Loading mutations
  SET_LOADING(state, { type, status }) {
    state.loading[type] = status
  },
  
  SET_PAYMENTS(state, payments) {
  state.payments = payments
},
  // Data mutations
  SET_USERS(state, users) {
    state.users = users
  },
  
  SET_RESTAURANTS(state, restaurants) {
    state.restaurants = restaurants
  },
  
  SET_RIDERS(state, riders) {
    state.riders = riders
  },
  
  SET_ORDERS(state, orders) {
    state.orders = orders
  },
  
  SET_ANALYTICS(state, analytics) {
    state.analytics = analytics
  },
  
  SET_STATS(state, stats) {
    state.stats = { ...state.stats, ...stats }
  },
  
  SET_RECENT_ACTIVITIES(state, activities) {
    state.recentActivities = activities
  },
  
  // Error mutations
  SET_ERROR(state, { type, error }) {
    state.errors[type] = error
  },
  
  CLEAR_ERROR(state, type) {
    delete state.errors[type]
  },
  REMOVE_USER(state, userId) {
  state.users = state.users.filter(user => user.id !== userId)
}
}

const actions = {
async deleteUser({ commit }, userId) {
  try {
    await api.delete(`admin/users/${userId}`)  // ✅ check backend route
    commit('REMOVE_USER', userId)              // remove from state
  } catch (error) {
    console.error("❌ Error deleting user:", error)
    throw error
  }
},

  
// Add this action to your admin.js store actions:
async registerUser(_, userData) {
  try {
    const response = await api.post('auth/register', userData)
    return response.data
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to register user'
    console.error('Error registering user:', error)
    throw new Error(errorMessage)
  }
},
  async fetchPayments({ commit }) {
  commit('SET_LOADING', { type: 'payments', status: true })
  commit('CLEAR_ERROR', 'payments')
  
  try {
    const response = await api.get("admin/payments")
    
    let paymentsData = []
    if (Array.isArray(response.data)) {
      paymentsData = response.data
    } else if (response.data?.data) {
      paymentsData = response.data.data
    } else if (response.data?.payments) {
      paymentsData = response.data.payments
    }
    
    commit("SET_PAYMENTS", paymentsData)
    return paymentsData
  } catch (error) {
    console.error("❌ Error fetching payments:", error)
    commit('SET_ERROR', { type: 'payments', error: error.message })
    commit("SET_PAYMENTS", [])
    throw error
  } finally {
    commit('SET_LOADING', { type: 'payments', status: false })
  }
},


async createPayment({ dispatch }, paymentData) {
  try {
    await api.post("admin/payments", paymentData)
    await dispatch("fetchPayments") // Refresh list
  } catch (error) {
    console.error("❌ Error creating payment:", error)
    throw error
  }
},

async deletePayment({ dispatch }, paymentId) {
  try {
    await api.delete(`admin/payments/${paymentId}`)
    await dispatch("fetchPayments") // Refresh list
  } catch (error) {
    console.error("❌ Error deleting payment:", error)
    throw error
  }
},
  // ========== USERS ==========
  async fetchUsers({ commit }) {
    commit('SET_LOADING', { type: 'users', status: true })
    commit('CLEAR_ERROR', 'users')
    
    try {
      const response = await api.get("admin/users")
      
      let usersData = []
      if (Array.isArray(response.data)) {
        usersData = response.data
      } else if (response.data?.data) {
        usersData = response.data.data
      } else if (response.data?.users) {
        usersData = response.data.users
      }
      
      commit("SET_USERS", usersData)
      
      // Update stats
      commit("SET_STATS", { 
        totalUsers: usersData.length,
        activeUsers: usersData.filter(user => user.status === 'active' || user.is_active).length
      })
      
      return usersData
    } catch (error) {
      console.error("❌ Error fetching users:", error)
      commit('SET_ERROR', { type: 'users', error: error.message })
      commit("SET_USERS", [])
      throw error
    } finally {
      commit('SET_LOADING', { type: 'users', status: false })
    }
  },
  // Add these to your admin.js store module

// In actions object, add these rider-specific actions:

async createRider({ dispatch }, riderData) {
  try {
    await api.post("admin/riders", riderData);
    await dispatch("fetchRiders"); // Refresh list
  } catch (error) {
    console.error("❌ Error creating rider:", error);
    throw error;
  }
},

async updateRider({ dispatch }, { id, riderData }) {
  try {
    await api.put(`admin/riders/${id}`, riderData);
    await dispatch("fetchRiders"); // Refresh list
  } catch (error) {
    console.error("❌ Error updating rider:", error);
    throw error;
  }
},

async deleteRider({ dispatch }, riderId) {
  try {
    await api.delete(`admin/riders/${riderId}`);
    await dispatch("fetchRiders"); // Refresh list
  } catch (error) {
    console.error("❌ Error deleting rider:", error);
    throw error;
  }
},

  // ========== RESTAURANTS ==========

  async registerRestaurant({ dispatch }, restaurantData) {
  try {
    const response = await api.post("/restaurants/register", restaurantData);
    
    // Refresh the restaurants list to show the new restaurant
    await dispatch("fetchRestaurants");
    
    return response.data;
  } catch (error) {
    console.error("❌ Error registering restaurant:", error);
    
    // Handle different error response formats
    let errorMessage = "Failed to register restaurant";
    
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.response?.data?.error) {
      errorMessage = error.response.data.error;
    } else if (error.response?.data?.errors) {
      // Handle validation errors
      const errors = error.response.data.errors;
      errorMessage = Object.values(errors).flat().join(', ');
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    // Create a new error with a user-friendly message
    const friendlyError = new Error(errorMessage);
    throw friendlyError;
  }
},
  async fetchRestaurants({ commit }) {
    commit('SET_LOADING', { type: 'restaurants', status: true })
    commit('CLEAR_ERROR', 'restaurants')
    
    try {
      const response = await api.get("admin/restaurants")
      
      let restaurantsData = []
      if (Array.isArray(response.data)) {
        restaurantsData = response.data
      } else if (response.data?.data) {
        restaurantsData = response.data.data
      } else if (response.data?.restaurants) {
        restaurantsData = response.data.restaurants
      }
      
      commit("SET_RESTAURANTS", restaurantsData)
      
      // Update stats
      const avgRating = restaurantsData.length > 0 
        ? restaurantsData.reduce((sum, restaurant) => sum + (restaurant.rating || 0), 0) / restaurantsData.length
        : 0
        
      commit("SET_STATS", { 
        totalRestaurants: restaurantsData.length,
        avgRating: Math.round(avgRating * 10) / 10
      })
      
      return restaurantsData
    } catch (error) {
      console.error("❌ Error fetching restaurants:", error)
      commit('SET_ERROR', { type: 'restaurants', error: error.message })
      commit("SET_RESTAURANTS", [])
      throw error
    } finally {
      commit('SET_LOADING', { type: 'restaurants', status: false })
    }
  },
  async createRestaurant({ dispatch }, restaurantData) {
  try {
    await api.post("admin/restaurants", restaurantData);
    await dispatch("fetchRestaurants"); // Refresh list
  } catch (error) {
    console.error("❌ Error creating restaurant:", error);
    throw error;
  }
},

async updateRestaurant({ dispatch }, { id, restaurantData }) {
  try {
    await api.put(`admin/restaurants/${id}`, restaurantData);
    await dispatch("fetchRestaurants"); // Refresh list
  } catch (error) {
    console.error("❌ Error updating restaurant:", error);
    throw error;
  }
},

async deleteRestaurant({ dispatch }, restaurantId) {
  try {
    await api.delete(`admin/restaurants/${restaurantId}`);
    await dispatch("fetchRestaurants"); // Refresh list
  } catch (error) {
    console.error("❌ Error deleting restaurant:", error);
    throw error;
  }
},


  // ========== RIDERS ==========
  async fetchRiders({ commit }) {
    commit('SET_LOADING', { type: 'riders', status: true })
    commit('CLEAR_ERROR', 'riders')
    
    try {
      const response = await api.get("admin/riders")
      
      let ridersData = []
      if (Array.isArray(response.data)) {
        ridersData = response.data
      } else if (response.data?.data) {
        ridersData = response.data.data
      } else if (response.data?.riders) {
        ridersData = response.data.riders
      }
      
      commit("SET_RIDERS", ridersData)
      
      // Update stats
      commit("SET_STATS", { totalRiders: ridersData.length })
      
      return ridersData
    } catch (error) {
      console.error("❌ Error fetching riders:", error)
      commit('SET_ERROR', { type: 'riders', error: error.message })
      commit("SET_RIDERS", [])
      throw error
    } finally {
      commit('SET_LOADING', { type: 'riders', status: false })
    }
  },

  // ========== ORDERS ==========
  async fetchOrders({ commit }) {
    commit('SET_LOADING', { type: 'orders', status: true })
    commit('CLEAR_ERROR', 'orders')
    
    try {
      const response = await api.get("admin/orders")
      
      let ordersData = []
      if (Array.isArray(response.data)) {
        ordersData = response.data
      } else if (response.data?.data) {
        ordersData = response.data.data
      } else if (response.data?.orders) {
        ordersData = response.data.orders
      }
      
      commit("SET_ORDERS", ordersData)
      
      // Update stats
      commit("SET_STATS", { totalOrders: ordersData.length })
      
      return ordersData
    } catch (error) {
      console.error("❌ Error fetching orders:", error)
      commit('SET_ERROR', { type: 'orders', error: error.message })
      commit("SET_ORDERS", [])
      throw error
    } finally {
      commit('SET_LOADING', { type: 'orders', status: false })
    }
  },

  // ========== ANALYTICS ==========
  async fetchAnalytics({ commit }) {
    commit('SET_LOADING', { type: 'analytics', status: true })
    commit('CLEAR_ERROR', 'analytics')
    
    try {
      const response = await api.get("admin/analytics")
      
      const analyticsData = response.data || {}
      commit("SET_ANALYTICS", analyticsData)
      
      // Update stats from analytics
      if (analyticsData.revenue) {
        commit("SET_STATS", { revenue: analyticsData.revenue })
      }
      
      // Set recent activities from analytics if available
      if (analyticsData.recent_activities) {
        commit("SET_RECENT_ACTIVITIES", analyticsData.recent_activities)
      }
      
      return analyticsData
    } catch (error) {
      console.error("❌ Error fetching analytics:", error)
      commit('SET_ERROR', { type: 'analytics', error: error.message })
      commit("SET_ANALYTICS", {})
      throw error
    } finally {
      commit('SET_LOADING', { type: 'analytics', status: false })
    }
  },

  // ========== FETCH ALL DATA ==========
  async fetchDashboardData({ dispatch, commit }) {
    commit('SET_LOADING', { type: 'stats', status: true })
    
    try {
      // Fetch all data in parallel
      await Promise.allSettled([
        dispatch("fetchUsers"),
        dispatch("fetchRestaurants"), 
        dispatch("fetchRiders"),
        dispatch("fetchOrders"),
        dispatch("fetchAnalytics")
      ])
      
      return true
    } catch (error) {
      console.error("❌ Error fetching dashboard data:", error)
      throw error
    } finally {
      commit('SET_LOADING', { type: 'stats', status: false })
    }
  },

  // ========== REFRESH DATA ==========
  async refreshDashboard({ dispatch }) {
    return await dispatch('fetchDashboardData')
  },
}

const getters = {
  // Loading getters
  isLoading: (state) => (type) => state.loading[type],
  isAnyLoading: (state) => Object.values(state.loading).some(loading => loading),
  
  // Data getters
  users: (state) => state.users,
  restaurants: (state) => state.restaurants,
  riders: (state) => state.riders,
  orders: (state) => state.orders,
  payments: (state) => state.payments,
  analytics: (state) => state.analytics,
  
  // Stats getters
  stats: (state) => state.stats,
  totalUsers: (state) => state.stats.totalUsers,
  totalRestaurants: (state) => state.stats.totalRestaurants,
  totalRiders: (state) => state.stats.totalRiders,
  totalOrders: (state) => state.stats.totalOrders,
  revenue: (state) => state.stats.revenue,
  activeUsers: (state) => state.stats.activeUsers,
  avgRating: (state) => state.stats.avgRating,
  
  // Recent activities
  recentActivities: (state) => state.recentActivities,
  
  // Error getters
  errors: (state) => state.errors,
  hasError: (state) => (type) => !!state.errors[type],
  
  // Computed stats
  revenueFormatted: (state) => {
    const revenue = state.stats.revenue || 0
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0
    }).format(revenue)
  },
  
  // Quick links with dynamic counts
  quickLinks: (state) => [
    { 
      label: "Manage Users", 
      to: "/admin/users", 
      icon: "people",
      description: "Customer accounts & profiles",
      color: "#6366f1",
      count: `${state.stats.totalUsers}+`
    },
    { 
      label: "Restaurant Partners", 
      to: "/admin/restaurants", 
      icon: "store",
      description: "Partner restaurant management",
      color: "#10b981",
      count: state.stats.totalRestaurants.toString()
    },
    { 
      label: "Delivery Fleet", 
      to: "/admin/riders", 
      icon: "two_wheeler",
      description: "Rider management & tracking",
      color: "#f59e0b",
      count: state.stats.totalRiders.toString()
    },
    { 
      label: "Order Management", 
      to: "/admin/orders", 
      icon: "receipt_long",
      description: "Order tracking & support",
      color: "#8b5cf6",
      count: `${state.stats.totalOrders}+`
    },
    { 
      label: "Financial Reports", 
      to: "/admin/payments", 
      icon: "payments",
      description: "Payment processing & reports",
      color: "#06b6d4",
      count: state.stats.revenue ? `PKR ${(state.stats.revenue / 1000000).toFixed(1)}M` : "PKR 0"
    },
    { 
      label: "Analytics Dashboard", 
      to: "/admin/analytics", 
      icon: "analytics",
      description: "Business intelligence & insights",
      color: "#ec4899",
      count: "Live"
    }
  ],
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}