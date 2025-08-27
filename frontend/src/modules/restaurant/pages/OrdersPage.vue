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
import OrdersTable from "../components/OrdersTable.vue";

export default {
  name: "OrdersPage",
  components: { OrdersTable },
  setup() {
    const store = useStore()

    // Reactive data
    const searchQuery = ref("")
    const statusFilter = ref("")

    // Computed properties
  const filteredOrders = computed(() => {
  const orders = store.getters['restaurant/getAllOrders'] || []
  return orders.filter((order) => {
    const matchesSearch = order.customer.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = statusFilter.value ? order.status === statusFilter.value : true
    return matchesSearch && matchesStatus
  })
})
    const loading = computed(() => store.getters['restaurant/getOrdersLoading'])

    // Get restaurant ID
    const getRestaurantId = () => {
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      return user.restaurant_id || user.id || 1
    }

    // Load orders from API
    const loadOrders = async () => {
  try {
    const restaurantId = getRestaurantId()
    if (!restaurantId) {
      console.error('No restaurant ID found')
      return
    }
    await store.dispatch('restaurant/fetchRestaurantOrders', restaurantId)
  } catch (error) {
    console.error('Error loading orders:', error)
    // You can add a notification here if needed
  }
}
    // Update order status
    const updateOrderStatus = async (orderId, newStatus) => {
      await store.dispatch('restaurant/updateOrderStatus', { orderId, status: newStatus })
    }

    // Load orders on mount
    onMounted(() => {
      loadOrders()
    })
  

    return {
      searchQuery,
      statusFilter,
      filteredOrders,
      loading,
      updateOrderStatus
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
