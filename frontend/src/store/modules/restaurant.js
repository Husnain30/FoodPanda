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
}

const actions = {
  // Fetch Restaurant Stats
  async fetchRestaurantStats({ commit }, restaurantId) {
    commit('SET_STATS_LOADING', true)
    commit('SET_STATS_ERROR', null)

    try {
      const response = await api.get(`/restaurants/${restaurantId}/stats`)
      
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

  // Fetch Restaurant Orders
  async fetchRestaurantOrders({ commit }, restaurantId) {
    commit('SET_ORDERS_LOADING', true)
    commit('SET_ORDERS_ERROR', null)

    try {
      const response = await api.get(`/orders/restaurant/${restaurantId}`)
      
      // Transform API response to match frontend structure
      const ordersData = response.data.map(order => ({
        id: order.id,
        customer: order.customer?.name || 'Unknown Customer',
        customer_phone: order.customer?.phone || '',
        items: order.items || [],
        amount: parseFloat(order.total_amount || 0),
        status: order.status || 'Pending',
        time: order.created_at ? new Date(order.created_at).toLocaleTimeString() : 'N/A',
        created_at: order.created_at,
        delivery_address: order.delivery_address || '',
        payment_method: order.payment_method || '',
      }))
      
      commit('SET_ORDERS', ordersData)
      return ordersData
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch orders'
      commit('SET_ORDERS_ERROR', errorMessage)
      console.error('❌ Error fetching restaurant orders:', error)
      throw error
    } finally {
      commit('SET_ORDERS_LOADING', false)
    }
  },

  // Update Order Status
  async updateOrderStatus({ commit }, { orderId, status }) {
    try {
      const response = await api.patch(`/orders/${orderId}`, { status })
      
      commit('UPDATE_ORDER_STATUS', { orderId, status })
      
      return response.data
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update order status'
      console.error('❌ Error updating order status:', error)
      throw new Error(errorMessage)
    }
  },

  // Fetch Menu Items (commented out since you don't have GET route yet)
  async fetchMenuItems({ commit }, restaurantId) {
    commit('SET_MENU_LOADING', true)
    commit('SET_MENU_ERROR', null)

    try {
      const response = await api.get(`menu?restaurant_id=${restaurantId}`)
      commit('SET_MENU_ITEMS', response.data)
      return response.data
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
      console.log('Making API request to add menu item') // Debug log
      
      const response = await api.post('menu', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        timeout: 30000 // 30 second timeout for image upload
      })
      
      console.log('Menu item added successfully:', response.data) // Debug log
      commit('ADD_MENU_ITEM', response.data)
      return response.data
    } catch (error) {
      console.error('API Error:', error.response?.data || error) // Debug log
      const errorMessage = error.response?.data?.message || 'Failed to add menu item'
      console.error('❌ Error adding menu item with image:', error)
      throw new Error(errorMessage)
    }
  },

  // Update Menu Item with Image
  async updateMenuItemWithImage({ commit }, { itemId, formData }) {
    try {
      const response = await api.patch(`menu/${itemId}`, formData, {
        headers: { 
          'Content-Type': 'multipart/form-data' 
        },
        timeout: 30000 // 30 second timeout for image upload
      })
      
      commit('UPDATE_MENU_ITEM', response.data)
      return response.data
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update menu item'
      console.error('❌ Error updating menu item with image:', error)
      throw new Error(errorMessage)
    }
  },

  // Delete Menu Item
  async deleteMenuItem({ commit }, itemId) {
    try {
      await api.delete(`menu/${itemId}`)
      
      // Remove from state using mutation
      commit('DELETE_MENU_ITEM', itemId)
      
      return true
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete menu item'
      console.error('❌ Error deleting menu item:', error)
      throw new Error(errorMessage)
    }
  },

  // Clear All Data (useful for logout)
  clearRestaurantData({ commit }) {
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
    commit('SET_STATS_ERROR', null)
    commit('SET_ORDERS_ERROR', null)
    commit('SET_MENU_ERROR', null)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}