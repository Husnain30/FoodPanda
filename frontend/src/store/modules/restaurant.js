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
     restaurantDetails: {},
  restaurantStats: {},
  detailsLoading: false,
  detailsError: null

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
  // Promotions Management - NEW ADDITION
  promotions: [],
  promotionsLoading: false,
  promotionsError: null
}

const getters = {
  // Dashboard
  getDashboardStats: (state) => state.stats,
  getStatsLoading: (state) => state.statsLoading,
  getStatsError: (state) => state.statsError,
    getRestaurantDetails: (state) => state.restaurantDetails,
  getRestaurantStats: (state) => state.restaurantStats,
  getDetailsLoading: (state) => state.detailsLoading,
  getDetailsError: (state) => state.detailsError,

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
  // Promotions - NEW ADDITION
  getAllPromotions: (state) => state.promotions,
  getPromotionsLoading: (state) => state.promotionsLoading,
  getPromotionsError: (state) => state.promotionsError,
  getActivePromotions: (state) => state.promotions.filter(p => p.status === 'active'),
  getScheduledPromotions: (state) => state.promotions.filter(p => p.status === 'scheduled'),



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

    SET_DETAILS_LOADING(state, loading) {
    state.detailsLoading = loading
  },
  SET_DETAILS_ERROR(state, error) {
    state.detailsError = error
  },
  SET_RESTAURANT_DETAILS(state, details) {
    state.restaurantDetails = details
  },
  SET_RESTAURANT_STATS(state, stats) {
    state.restaurantStats = stats
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
  // Promotions Mutations - NEW ADDITION

  SET_PROMOTIONS(state, promotions) {
  // Handle API response format
  if (promotions && promotions.data && Array.isArray(promotions.data)) {
    state.promotions = promotions.data
  } else if (Array.isArray(promotions)) {
    state.promotions = promotions
  } else {
    state.promotions = []
  }
  console.log('🔄 SET_PROMOTIONS:', state.promotions) // Debug log
},
  SET_PROMOTIONS_LOADING(state, loading) {
    state.promotionsLoading = loading
  },
  SET_PROMOTIONS_ERROR(state, error) {
    state.promotionsError = error
  },

  ADD_PROMOTION(state, promotion) {
    state.promotions.unshift(promotion)
  },
  UPDATE_PROMOTION(state, updatedPromotion) {
    const index = state.promotions.findIndex(p => p.id === updatedPromotion.id)
    if (index !== -1) {
      state.promotions.splice(index, 1, updatedPromotion)
    }
  },
  DELETE_PROMOTION(state, promotionId) {
    state.promotions = state.promotions.filter(p => p.id !== promotionId)
  }
}

const actions = {
  // Fetch Restaurant Stats - UPDATED FOR API INTEGRATION


  async fetchRestaurantWithStats({ commit }, restaurantId) {
    commit('SET_DETAILS_LOADING', true)
    commit('SET_DETAILS_ERROR', null)

    try {
      console.log('🏪 Fetching restaurant details and stats:', restaurantId)

      // Fetch both details and stats in parallel
      const [detailsResponse, statsResponse] = await Promise.all([
        api.get(`restaurant/restaurants/${restaurantId}`),
        api.get(`restaurant/restaurants/${restaurantId}/stats`)
      ])

      console.log('🏪 Details Response:', detailsResponse.data)
      console.log('📊 Stats Response:', statsResponse.data)

      commit('SET_RESTAURANT_DETAILS', detailsResponse.data)
      commit('SET_RESTAURANT_STATS', statsResponse.data)

      return {
        details: detailsResponse.data,
        stats: statsResponse.data
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch restaurant data'
      commit('SET_DETAILS_ERROR', errorMessage)
      console.error('❌ Error fetching restaurant data:', error)
      throw error
    } finally {
      commit('SET_DETAILS_LOADING', false)
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
    // So so the call should be: GET /restaurant/orders
    const response = await api.get('restaurant/restaurant/orders', {
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

async createPromotion({ dispatch }, promotionData) {
  try {
    console.log('🎉 Creating promotion:', promotionData)
    const response = await api.post('restaurant/promotions', promotionData)
    console.log('✅ Created promotion:', response.data)

    // Refresh promotions list
    await dispatch('fetchPromotions')

    return response.data
  } catch (error) {
    console.error('❌ Error creating promotion:', error)
    throw error
  }
},
async fetchPromotions({ commit }) {
  try {
    commit('SET_PROMOTIONS_LOADING', true)
    console.log('🚀 Fetching promotions from API...')

    const response = await api.get('restaurant/promotions')
    console.log('✅ API Response:', response.data)

    // Pass only the data array, not whole response
    commit('SET_PROMOTIONS', response.data.data) // 👈 Extract data array
    commit('SET_PROMOTIONS_ERROR', null)

    return response.data.data
  } catch (error) {
    console.error('❌ Error fetching promotions:', error)
    commit('SET_PROMOTIONS_ERROR', error.message || 'Failed to fetch promotions')
    throw error
  } finally {
    commit('SET_PROMOTIONS_LOADING', false)
  }
},
 async updatePromotion({ dispatch }, { id, data }) {
  try {
    console.log('🎉 Updating promotion:', id, data)
    const response = await api.patch(`restaurant/promotions/${id}`, data)
    console.log('🎉 Updated promotion:', response.data)

    // Refresh promotions list
    await dispatch('fetchPromotions')

    return response.data
  } catch (error) {
    console.error('❌ Error updating promotion:', error)
    throw error
  }
},

  async deletePromotion({ commit }, promotionId) {
    try {
      console.log('🎉 Deleting promotion:', promotionId)
      await api.delete(`restaurant/promotions/${promotionId}`)

      commit('DELETE_PROMOTION', promotionId)
    } catch (error) {
      console.error('❌ Error deleting promotion:', error)
      throw error
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
