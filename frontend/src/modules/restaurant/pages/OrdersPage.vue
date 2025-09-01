<!-- src/modules/restaurant/pages/OrdersPage.vue -->
<template>
  <div class="orders-page">
    <!-- Page Header -->
    <header class="orders-header">
      <h2>🛒 Orders Management</h2>
      <div class="filters">
        <input 
          type="text" 
          placeholder="🔍 Search orders by customer..." 
          v-model="searchQuery" 
        />
        <select v-model="statusFilter">
          <option value="">All Status</option>
          <option value="Pending">⏳ Pending</option>
          <option value="Accepted">✅ Accepted</option>
          <option value="Delivered">🚚 Delivered</option>
          <option value="Rejected">❌ Rejected</option>
        </select>
      </div>
    </header>
<div v-if="loading" style="text-align: center; padding: 40px;">
  <div>Loading orders...</div>
</div>
    <!-- Orders Table -->
  <OrdersTable 
  v-if="!loading"
  :orders="filteredOrders" 
  @update-status="updateOrderStatus" 
/>
  </div>
</template>



<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'
import OrdersTable from "../components/OrdersTable.vue";

export default {
  name: "OrdersPage",
  components: { OrdersTable },
  setup() {
    const store = useStore()
    const $q = useQuasar()

    // Reactive data
    const searchQuery = ref("")
    const statusFilter = ref("")

    // Computed properties from Vuex store
    const allOrders = computed(() => store.getters['restaurant/getAllOrders'] || [])
    const loading = computed(() => store.getters['restaurant/getOrdersLoading'] || false)
    const error = computed(() => store.getters['restaurant/getOrdersError'] || null)

    // Filtered orders based on search and status
    const filteredOrders = computed(() => {
      return allOrders.value.filter((order) => {
        // Search filter - check customer name or order id
        const matchesSearch = !searchQuery.value || 
          (order.customer_name && order.customer_name.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
          (order.customer && order.customer.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
          order.id.toString().includes(searchQuery.value)
        
        // Status filter
        const matchesStatus = !statusFilter.value || order.status === statusFilter.value
        
        return matchesSearch && matchesStatus
      })
    })

    // Get restaurant ID from localStorage
    const getRestaurantId = () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        const restaurantId = user.restaurant_id || user.id
        
        if (!restaurantId) {
          console.warn('No restaurant ID found in user data')
          $q.notify({
            color: 'warning',
            message: 'Restaurant ID not found. Please login again.',
            icon: 'warning'
          })
          return null
        }
        
        console.log('Using restaurant ID for orders:', restaurantId)
        return restaurantId
      } catch (error) {
        console.error('Error parsing user data:', error)
        return null
      }
    }

    // Load orders from API
    const loadOrders = async () => {
      try {
        const restaurantId = getRestaurantId()
        if (!restaurantId) {
          return
        }
        
        console.log('Loading orders for restaurant:', restaurantId)
        await store.dispatch('restaurant/fetchRestaurantOrders', restaurantId)
        console.log('Orders loaded:', allOrders.value.length)
      } catch (error) {
        console.error('Error loading orders:', error)
        $q.notify({
          color: 'negative',
          message: 'Failed to load orders',
          caption: error.message,
          icon: 'error'
        })
      }
    }

    // Update order status
    const updateOrderStatus = async (orderId, newStatus) => {
      try {
        console.log('Updating order status:', { orderId, newStatus })
        await store.dispatch('restaurant/updateOrderStatus', { 
          orderId, 
          status: newStatus 
        })
        
        $q.notify({
          color: 'positive',
          message: `Order ${orderId} status updated to ${newStatus}`,
          icon: 'check'
        })
      } catch (error) {
        console.error('Error updating order status:', error)
        $q.notify({
          color: 'negative',
          message: 'Failed to update order status',
          caption: error.message,
          icon: 'error'
        })
      }
    }

    // Refresh orders
    const refreshOrders = () => {
      loadOrders()
    }

    // Load orders on component mount
    onMounted(() => {
      console.log('OrdersPage mounted')
      loadOrders()
    })

    return {
      // Data
      searchQuery,
      statusFilter,
      
      // Computed
      filteredOrders,
      loading,
      error,
      
      // Methods
      updateOrderStatus,
      refreshOrders,
      loadOrders
    }
  }
}
</script>
<style scoped>
.orders-page {
  padding: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.orders-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.orders-header h2 {
  font-size: 1.6rem;
  margin-bottom: 12px;
}

.filters {
  display: flex;
  gap: 10px;
}

.filters input,
.filters select {
  padding: 8px 12px;
  border: 1px solid #dcdde1;
  border-radius: 8px;
  font-size: 0.9rem;
}
</style>
