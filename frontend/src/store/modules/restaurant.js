// store/modules/restaurant.js
import api from '../../boot/axios'

const state = {
  // Dashboard Stats
  stats: {
    revenue: 0,
    orders: 0,
    customers: 0,
    rating: 0,
    averageOrderValue: 0,
    completionRate: 0,
    returnRate: 0,
    peakHours: '',
  },

  // Orders Management
  orders: [],
  ordersLoading: false,
  ordersError: null,

  // Menu Management
  menuItems: [],
  menuLoading: false,
  menuError: null,

  // Restaurants Gallery - NEW ADDITION
  restaurants: [],
  restaurantsLoading: false,
  restaurantsError: null,

  // Loading States
  statsLoading: false,
  statsError: null,
}

const getters = {
  // Dashboard
  getDashboardStats: (state) => state.stats,
  getStatsLoading: (state) => state.statsLoading,
  getStatsError: (state) => state.statsError,

  // Orders
  getAllOrders: (state) => state.orders,
  getRecentOrders: (state) => state.orders.slice(0, 5),
  getOrdersLoading: (state) => state.ordersLoading,
  getOrdersError: (state) => state.ordersError,
  
  // Filter orders by status
  getOrdersByStatus: (state) => (status) => {
    return status ? state.orders.filter(order => order.status === status) : state.orders
  },

  // Menu
  getMenuItems: (state) => state.menuItems,
  getMenuLoading: (state) => state.menuLoading,
  getMenuError: (state) => state.menuError,

  // Restaurants - NEW ADDITION
  getAllRestaurants: (state) => state.restaurants,
  getRestaurantsLoading: (state) => state.restaurantsLoading,
  getRestaurantsError: (state) => state.restaurantsError,
}

const mutations = {
  // Stats Mutations
  SET_STATS_LOADING(state, loading) {
    state.statsLoading = loading
  },
  SET_STATS_ERROR(state, error) {
    state.statsError = error
  },
  SET_STATS(state, stats) {
    state.stats = stats
  },

  // Orders Mutations
  SET_ORDERS_LOADING(state, loading) {
    state.ordersLoading = loading
  },
  SET_ORDERS_ERROR(state, error) {
    state.ordersError = error
  },
  SET_ORDERS(state, orders) {
    state.orders = orders
  },
  UPDATE_ORDER_STATUS(state, { orderId, status }) {
    const order = state.orders.find(o => o.id === orderId)
    if (order) {
      order.status = status
    }
  },
  ADD_ORDER(state, order) {
    state.orders.unshift(order)
  },

  // Menu Mutations
  SET_MENU_LOADING(state, loading) {
    state.menuLoading = loading
  },
  SET_MENU_ERROR(state, error) {
    state.menuError = error
  },
  SET_MENU_ITEMS(state, items) {
    state.menuItems = items
  },
  ADD_MENU_ITEM(state, menuItem) {
    state.menuItems.push(menuItem)
  },
  UPDATE_MENU_ITEM(state, updatedItem) {
    const index = state.menuItems.findIndex(item => item.id === updatedItem.id)
    if (index !== -1) {
      state.menuItems.splice(index, 1, updatedItem)
    }
  },
  DELETE_MENU_ITEM(state, itemId) {
    state.menuItems = state.menuItems.filter(item => item.id !== itemId)
  },

  // Restaurants Mutations - NEW ADDITION
  SET_RESTAURANTS_LOADING(state, loading) {
    state.restaurantsLoading = loading
  },
  SET_RESTAURANTS_ERROR(state, error) {
    state.restaurantsError = error
  },
  SET_RESTAURANTS(state, restaurants) {
    state.restaurants = restaurants
  },
}

const actions = {
  // Fetch Restaurant Stats - UPDATED FOR API INTEGRATION
  async fetchRestaurantStats({ commit }, restaurantId) {
    commit('SET_STATS_LOADING', true)
    commit('SET_STATS_ERROR', null)

    try {
      console.log('📊 API Call: Fetching stats for restaurant:', restaurantId)
      const response = await api.get(`restaurants/${restaurantId}/stats`)
      console.log('📊 API Response:', response.data)
      
      const statsData = {
        revenue: response.data.revenue || 0,
        orders: response.data.orders_count || 0,
        customers: response.data.customers_count || 0,
        rating: response.data.average_rating || 0,
        averageOrderValue: response.data.average_order_value || 0,
        completionRate: response.data.completion_rate || 0,
        returnRate: response.data.return_rate || 0,
        peakHours: response.data.peak_hours || 'N/A',
      }
      
      commit('SET_STATS', statsData)
      console.log('✅ Stats updated in store:', statsData)
      return response.data
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch stats'
      commit('SET_STATS_ERROR', errorMessage)
      console.error('❌ Error fetching restaurant stats:', error)
      throw error
    } finally {
      commit('SET_STATS_LOADING', false)
    }
  },

// Replace your existing fetchRestaurantOrders function with this:

async fetchRestaurantOrders({ commit }, restaurantId) {
  commit('SET_ORDERS_LOADING', true)
  commit('SET_ORDERS_ERROR', null)

  try {
    console.log('📋 API Call: Fetching orders for restaurant:', restaurantId)
    
    // FIXED: Use the correct endpoint that matches your Laravel route
    // Your Laravel route: Route::get('/restaurant/orders', ...)
    // So the call should be: GET /restaurant/orders
    const response = await api.get('restaurant/orders', {
      params: {
        restaurant_id: restaurantId  // Pass restaurant ID as query parameter
      }
    })
    
    console.log('📋 API Response:', response.data)
    
    // Handle different response structures
    const ordersData = response.data.data || response.data || []
    
    commit('SET_ORDERS', ordersData)
    console.log('✅ Orders loaded in store:', ordersData.length)
    return ordersData
    
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch restaurant orders'
    commit('SET_ORDERS_ERROR', errorMessage)
    console.error('❌ Error fetching restaurant orders:', error)
    throw error
  } finally {
    commit('SET_ORDERS_LOADING', false)
  }
},

// Also fix your updateOrderStatus action to match the correct endpoint


  // NEW ACTION: Fetch All Restaurants for Gallery
  async fetchAllRestaurants({ commit }) {
    commit('SET_RESTAURANTS_LOADING', true)
    commit('SET_RESTAURANTS_ERROR', null)

    try {
      console.log('🏪 API Call: Fetching all restaurants')
      const response = await api.get('restaurant/restaurants')
      console.log('🏪 API Response:', response.data)
      
      // Handle different response structures
      const restaurantsData = response.data.data || response.data || []
      
      commit('SET_RESTAURANTS', restaurantsData)
      console.log('✅ Restaurants loaded in store:', restaurantsData.length)
      return restaurantsData
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch restaurants'
      commit('SET_RESTAURANTS_ERROR', errorMessage)
      console.error('❌ Error fetching restaurants:', error)
      throw error
    } finally {
      commit('SET_RESTAURANTS_LOADING', false)
    }
  },

  // Fetch Restaurant Details
  async fetchRestaurantDetails(context, restaurantId) {
    try {
      console.log('🏪 API Call: Fetching restaurant details:', restaurantId)
      const response = await api.get(`restaurants/${restaurantId}`)
      console.log('🏪 API Response:', response.data)
      return response.data
    } catch (error) {
      console.error('❌ Error fetching restaurant details:', error)
      throw error
    }
  },

  // Update Order Status
async updateOrderStatus({ commit }, { orderId, status }) {
  try {
    console.log('🔄 API Call: Updating order status:', { orderId, status })
    // FIXED: Using your correct endpoint structure
    const response = await api.patch(`restaurant/orders/${orderId}/status`, { 
      status: status 
    })
    
    commit('UPDATE_ORDER_STATUS', { orderId, status })
    console.log('✅ Order status updated')
    
    return response.data
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to update order status'
    console.error('❌ Error updating order status:', error)
    throw new Error(errorMessage)
  }
},


  // Fetch Menu Items
  async fetchMenuItems({ commit }, restaurantId) {
  commit('SET_MENU_LOADING', true)
  commit('SET_MENU_ERROR', null)

  try {
    console.log('🍽️ API Call: Fetching menu items for restaurant:', restaurantId)
    // FIXED: Using your correct endpoint structure
    const response = await api.get(`restaurant/menu/${restaurantId}`)
    console.log('🍽️ API Response:', response.data)
    
    // Handle different response structures
    const menuData = response.data.data || response.data || []
    commit('SET_MENU_ITEMS', menuData)
    return menuData
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch menu items'
    commit('SET_MENU_ERROR', errorMessage)
    console.error('❌ Error fetching menu items:', error)
    throw error
  } finally {
    commit('SET_MENU_LOADING', false)
  }
},


  // Add Menu Item with Image
  async addMenuItemWithImage({ commit }, formData) {
  try {
    console.log('🍕 API Call: Adding menu item with image')
    console.log('🍕 FormData contents:')
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1])
    }
    
    // FIXED: Using your correct endpoint
    const response = await api.post('restaurant/menu', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      timeout: 30000
    })
    
    console.log('✅ Menu item added successfully:', response.data)
    commit('ADD_MENU_ITEM', response.data)
    return response.data
  } catch (error) {
    console.error('❌ API Error:', error.response?.data || error)
    const errorMessage = error.response?.data?.message || 'Failed to add menu item'
    throw new Error(errorMessage)
  }
},

  // Update Menu Item with Image
async updateMenuItemWithImage({ commit }, { itemId, formData }) {
  try {
    console.log('🔄 API Call: Updating menu item:', itemId)
    console.log('🔄 FormData contents:')
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1])
    }
    
    // FIXED: Using your correct endpoint
    const response = await api.patch(`restaurant/menu/${itemId}`, formData, {
      headers: { 
        'Content-Type': 'multipart/form-data' 
      },
      timeout: 30000
    })
    
    console.log('✅ Menu item updated successfully')
    commit('UPDATE_MENU_ITEM', response.data)
    return response.data
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to update menu item'
    console.error('❌ Error updating menu item:', error)
    throw new Error(errorMessage)
  }
},

  // Delete Menu Item
async deleteMenuItem({ commit }, itemId) {
  try {
    console.log('🗑️ API Call: Deleting menu item:', itemId)
    // FIXED: Using your correct endpoint
    await api.delete(`restaurant/menu/${itemId}`)
    
    commit('DELETE_MENU_ITEM', itemId)
    console.log('✅ Menu item deleted successfully')
    
    return true
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to delete menu item'
    console.error('❌ Error deleting menu item:', error)
    throw new Error(errorMessage)
  }
},

  // Clear All Data (useful for logout)
  clearRestaurantData({ commit }) {
    console.log('🧹 Clearing restaurant data')
    commit('SET_STATS', {
      revenue: 0,
      orders: 0,
      customers: 0,
      rating: 0,
      averageOrderValue: 0,
      completionRate: 0,
      returnRate: 0,
      peakHours: '',
    })
    commit('SET_ORDERS', [])
    commit('SET_MENU_ITEMS', [])
    commit('SET_RESTAURANTS', [])
    commit('SET_STATS_ERROR', null)
    commit('SET_ORDERS_ERROR', null)
    commit('SET_MENU_ERROR', null)
    commit('SET_RESTAURANTS_ERROR', null)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}