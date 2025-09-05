<template>
  <div class="orders-page">
    <!-- Modern Header with Glassmorphism -->
    <header class="orders-header">
      <div class="header-content">
        <div class="title-section">
          <h1 class="page-title">
            <span class="icon-wrapper">🛒</span>
            Orders Management
            <span class="order-count" v-if="filteredOrders.length">{{ filteredOrders.length }}</span>
          </h1>
          <p class="subtitle">Manage your restaurant orders efficiently</p>
        </div>

        <div class="filters-section">
          <div class="search-wrapper">
            <div class="search-input">
              <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42-1.42zM11 18a7 7 0 1 1 7-7 7 7 0 0 1-7 7z"/>
              </svg>
              <input
                type="text"
                placeholder="Search orders..."
                v-model="searchQuery"
              />
            </div>
          </div>

          <div class="status-filter">
            <select v-model="statusFilter">
              <option value="">All Status</option>
              <option value="pending">⏳ Pending</option>
              <option value="preparing">👨‍🍳 Preparing</option>
              <option value="ready">✅ Ready</option>
              <option value="delivered">🚚 Delivered</option>
              <option value="cancelled">❌ Cancelled</option>
            </select>
          </div>
        </div>
      </div>
    </header>

    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p>Loading your orders...</p>
      </div>
    </div>

    <!-- Orders Container -->
    <div v-if="!loading" class="orders-container">
      <!-- Empty State -->
      <div v-if="filteredOrders.length === 0" class="empty-state">
        <div class="empty-icon">🍽️</div>
        <h3>No orders found</h3>
        <p>{{ searchQuery || statusFilter ? 'Try adjusting your filters' : 'New orders will appear here' }}</p>
        <button v-if="searchQuery || statusFilter" @click="clearFilters" class="clear-filters-btn">
          Clear Filters
        </button>
      </div>

      <!-- Orders Grid for Mobile/Tablet -->
      <div v-else class="orders-grid mobile-view">
        <div
          v-for="order in filteredOrders"
          :key="order.id"
          class="order-card"
          :class="[`status-${order.status}`]"
        >
          <div class="card-header">
            <div class="order-info">
              <h4 class="order-id">#{{ order.id }}</h4>
              <span class="order-time">{{ formatTime(order.created_at) }}</span>
            </div>
            <div class="status-badge" :class="order.status">
              {{ getStatusIcon(order.status) }} {{ capitalizeFirst(order.status) }}
            </div>
          </div>

          <div class="card-body">
            <div class="customer-info">
              <div class="info-item">
                <span class="label">Customer:</span>
                <span class="value">User #{{ order.user_id }}</span>
              </div>
              <div class="info-item">
                <span class="label">Amount:</span>
                <span class="value amount">Rs. {{ parseFloat(order.total_price).toFixed(2) }}</span>
              </div>
              <div class="info-item" v-if="order.rider_fee > 0">
                <span class="label">Delivery Fee:</span>
                <span class="value">Rs. {{ parseFloat(order.rider_fee).toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <div class="card-actions">
            <button
              @click="updateOrderStatus(order.id, 'preparing')"
              :disabled="!canUpdateTo(order.status, 'preparing')"
              class="action-btn accept"
            >
              👨‍🍳 Start Preparing
            </button>
            <button
              @click="updateOrderStatus(order.id, 'ready')"
              :disabled="!canUpdateTo(order.status, 'ready')"
              class="action-btn ready"
            >
              ✅ Mark Ready
            </button>
            <button
              @click="updateOrderStatus(order.id, 'delivered')"
              :disabled="!canUpdateTo(order.status, 'delivered')"
              class="action-btn deliver"
            >
              🚚 Delivered
            </button>
            <button
              @click="updateOrderStatus(order.id, 'cancelled')"
              :disabled="!canUpdateTo(order.status, 'cancelled')"
              class="action-btn cancel"
            >
              ❌ Cancel
            </button>
          </div>
        </div>
      </div>

      <!-- Orders Table for Desktop -->
      <div class="orders-table desktop-view">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="order in filteredOrders"
                :key="order.id"
                class="order-row"
                :class="[`status-${order.status}`]"
              >
                <td class="order-id-cell">
                  <span class="order-id-badge">#{{ order.id }}</span>
                </td>
                <td class="customer-cell">
                  <div class="customer-info">
                    <div class="customer-name">User #{{ order.user_id }}</div>
                  </div>
                </td>
                <td class="amount-cell">
                  <div class="amount-info">
                    <div class="total">Rs. {{ parseFloat(order.total_price).toFixed(2) }}</div>
                    <div v-if="order.rider_fee > 0" class="rider-fee">
                      +Rs. {{ parseFloat(order.rider_fee).toFixed(2) }} delivery
                    </div>
                  </div>
                </td>
                <td class="time-cell">
                  {{ formatTime(order.created_at) }}
                </td>
                <td class="status-cell">
                  <span class="status-badge" :class="order.status">
                    {{ getStatusIcon(order.status) }} {{ capitalizeFirst(order.status) }}
                  </span>
                </td>
                <td class="actions-cell">
                  <div class="action-buttons">
                    <button
                      @click="updateOrderStatus(order.id, 'preparing')"
                      :disabled="!canUpdateTo(order.status, 'preparing')"
                      class="action-btn small accept"
                      title="Start Preparing"
                    >
                      👨‍🍳
                    </button>
                    <button
                      @click="updateOrderStatus(order.id, 'ready')"
                      :disabled="!canUpdateTo(order.status, 'ready')"
                      class="action-btn small ready"
                      title="Mark Ready"
                    >
                      ✅
                    </button>
                    <button
                      @click="updateOrderStatus(order.id, 'delivered')"
                      :disabled="!canUpdateTo(order.status, 'delivered')"
                      class="action-btn small deliver"
                      title="Mark Delivered"
                    >
                      🚚
                    </button>
                    <button
                      @click="updateOrderStatus(order.id, 'cancelled')"
                      :disabled="!canUpdateTo(order.status, 'cancelled')"
                      class="action-btn small cancel"
                      title="Cancel Order"
                    >
                      ❌
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Floating Action Button -->
    <button class="fab" @click="refreshOrders" title="Refresh Orders">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
      </svg>
    </button>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'

export default {
  name: "OrdersPage",
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

    // Filtered orders
    const filteredOrders = computed(() => {
      return allOrders.value.filter((order) => {
        const matchesSearch = !searchQuery.value ||
          order.id.toString().includes(searchQuery.value) ||
          order.user_id.toString().includes(searchQuery.value)

        const matchesStatus = !statusFilter.value || order.status === statusFilter.value

        return matchesSearch && matchesStatus
      })
    })

    // Helper methods
    const formatTime = (dateString) => {
      return new Date(dateString).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    const capitalizeFirst = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const getStatusIcon = (status) => {
      const icons = {
        pending: '⏳',
        preparing: '👨‍🍳',
        ready: '✅',
        delivered: '🚚',
        cancelled: '❌'
      }
      return icons[status] || '📋'
    }

    const canUpdateTo = (currentStatus, newStatus) => {
      const statusFlow = {
        pending: ['preparing', 'cancelled'],
        preparing: ['ready', 'cancelled'],
        ready: ['delivered'],
        delivered: [],
        cancelled: []
      }
      return statusFlow[currentStatus]?.includes(newStatus) || false
    }

    const clearFilters = () => {
      searchQuery.value = ""
      statusFilter.value = ""
    }

    // Get restaurant ID
    const getRestaurantId = () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        return user.restaurant_id || user.id
      } catch (error) {
        console.error('Error parsing user data:', error)
        return null
      }
    }

    // Load orders
    const loadOrders = async () => {
      try {
        const restaurantId = getRestaurantId()
        if (!restaurantId) return

        await store.dispatch('restaurant/fetchRestaurantOrders', restaurantId)
      } catch (error) {
        console.error('Error loading orders:', error)
        $q.notify({
          color: 'negative',
          message: 'Failed to load orders',
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

        // Update local state immediately
        const orderIndex = allOrders.value.findIndex(order => order.id === orderId)
        if (orderIndex !== -1) {
          allOrders.value[orderIndex].status = newStatus
        }

        $q.notify({
          color: 'positive',
          message: `Order #${orderId} updated to ${newStatus}`,
          icon: 'check'
        })
      } catch (error) {
        console.error('Error updating order status:', error)
        const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Failed to update order status'
        $q.notify({
          color: 'negative',
          message: errorMsg,
          icon: 'error'
        })
      }
    }

    const refreshOrders = () => {
      loadOrders()
      $q.notify({
        color: 'info',
        message: 'Refreshing orders...',
        icon: 'refresh',
        timeout: 1000
      })
    }

    onMounted(() => {
      loadOrders()
    })

    return {
      searchQuery,
      statusFilter,
      filteredOrders,
      loading,
      error,
      updateOrderStatus,
      refreshOrders,
      formatTime,
      capitalizeFirst,
      getStatusIcon,
      canUpdateTo,
      clearFilters
    }
  }
}
</script>

<style scoped>
.orders-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0;
  position: relative;
}

/* Header Styles */
.orders-header {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
}

.title-section {
  flex: 1;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon-wrapper {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem;
  border-radius: 12px;
  font-size: 1.5rem;
}

.order-count {
  background: #ff6b6b;
  color: white;
  font-size: 0.8rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  margin-left: 1rem;
}

.subtitle {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  margin: 0;
}

.filters-section {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.search-wrapper {
  position: relative;
}

.search-input {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1rem;
  color: #666;
  z-index: 1;
}

.search-input input {
  width: 300px;
  padding: 0.875rem 1rem 0.875rem 3rem;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.search-input input:focus {
  outline: none;
  background: white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.status-filter select {
  padding: 0.875rem 1rem;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 180px;
}

.status-filter select:focus {
  outline: none;
  background: white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

/* Loading Styles */
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.loading-spinner {
  text-align: center;
  color: white;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Orders Container */
.orders-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 2rem;
}

/* Empty State */
.empty-state {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 4rem 2rem;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.clear-filters-btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-filters-btn:hover {
  background: #5a6fd8;
  transform: translateY(-2px);
}

/* Mobile View - Cards */
.mobile-view {
  display: none;
}

.orders-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.order-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border-left: 4px solid #ddd;
}

.order-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.order-card.status-pending {
  border-left-color: #ffa726;
}

.order-card.status-preparing {
  border-left-color: #42a5f5;
}

.order-card.status-ready {
  border-left-color: #66bb6a;
}

.order-card.status-delivered {
  border-left-color: #26c6da;
}

.order-card.status-cancelled {
  border-left-color: #ef5350;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.order-id {
  font-size: 1.4rem;
  font-weight: 700;
  color: #333;
  margin: 0 0 0.25rem 0;
}

.order-time {
  color: #666;
  font-size: 0.9rem;
}

.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.pending {
  background: #fff3e0;
  color: #f57c00;
}

.status-badge.preparing {
  background: #e3f2fd;
  color: #1976d2;
}

.status-badge.ready {
  background: #e8f5e8;
  color: #388e3c;
}

.status-badge.delivered {
  background: #e0f2f1;
  color: #00796b;
}

.status-badge.cancelled {
  background: #ffebee;
  color: #d32f2f;
}

.card-body {
  margin-bottom: 1.5rem;
}

.customer-info {
  display: grid;
  gap: 0.5rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label {
  color: #666;
  font-weight: 500;
}

.value {
  font-weight: 600;
  color: #333;
}

.value.amount {
  color: #2e7d32;
  font-size: 1.1rem;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.action-btn {
  flex: 1;
  min-width: 120px;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-btn.accept {
  background: #e8f5e8;
  color: #388e3c;
}

.action-btn.accept:hover:not(:disabled) {
  background: #388e3c;
  color: white;
}

.action-btn.preparing {
  background: #e3f2fd;
  color: #1976d2;
}

.action-btn.preparing:hover:not(:disabled) {
  background: #1976d2;
  color: white;
}

.action-btn.deliver {
  background: #e0f2f1;
  color: #00796b;
}

.action-btn.deliver:hover:not(:disabled) {
  background: #00796b;
  color: white;
}

.action-btn.cancel {
  background: #ffebee;
  color: #d32f2f;
}

.action-btn.cancel:hover:not(:disabled) {
  background: #d32f2f;
  color: white;
}

/* Desktop View - Table */
.desktop-view {
  display: block;
}

.table-container {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: rgba(102, 126, 234, 0.1);
}

th {
  padding: 1.5rem 1rem;
  text-align: left;
  font-weight: 600;
  color: #333;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.order-row {
  transition: all 0.3s ease;
  border-bottom: 1px solid #f5f5f5;
}

.order-row:hover {
  background: rgba(102, 126, 234, 0.05);
}

td {
  padding: 1.5rem 1rem;
  vertical-align: middle;
}

.order-id-badge {
  background: #f0f2ff;
  color: #5a6acf;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  font-weight: 600;
}

.customer-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.customer-name {
  font-weight: 600;
  color: #333;
}

.amount-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.total {
  font-weight: 700;
  color: #2e7d32;
  font-size: 1.1rem;
}

.rider-fee {
  color: #666;
  font-size: 0.85rem;
}

.time-cell {
  color: #666;
  font-size: 0.9rem;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.action-btn.small {
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 8px;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Floating Action Button */
.fab {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #667eea;
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
  z-index: 1000;
}

.fab:hover {
  transform: scale(1.1);
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.6);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .header-content {
    flex-direction: column;
    gap: 1.5rem;
  }

  .filters-section {
    width: 100%;
    justify-content: space-between;
  }

  .search-input input {
    width: 250px;
  }
}

@media (max-width: 768px) {
  .orders-header {
    padding: 1.5rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .filters-section {
    flex-direction: column;
    gap: 1rem;
  }

  .search-input input {
    width: 100%;
  }

  .orders-container {
    padding: 0 1rem 1rem;
  }

  /* Switch to mobile view */
  .desktop-view {
    display: none;
  }

  .mobile-view {
    display: block;
  }

  .fab {
    bottom: 1rem;
    right: 1rem;
    width: 50px;
    height: 50px;
  }
}

@media (max-width: 480px) {
  .orders-header {
    padding: 1rem;
  }

  .page-title {
    font-size: 1.5rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .order-count {
    margin-left: 0;
  }

  .card-actions {
    flex-direction: column;
  }

  .action-btn {
    min-width: auto;
  }
}
</style>
