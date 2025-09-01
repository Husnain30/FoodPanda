<!-- REPLACE your OrdersTable.vue template with this: -->

<template>
  <div class="orders-table">
    <!-- Empty State -->
    <div v-if="orders.length === 0" class="empty-state">
      <p>No orders found</p>
    </div>
    
    <!-- Orders Table -->
    <table v-else>
      <thead>
        <tr>
          <th>🆔 Order ID</th>
          <th>👤 Customer</th>
          <th>🍽️ Items</th>
          <th>💵 Amount</th>
          <th>⏰ Time</th>
          <th>📌 Status</th>
          <th>⚡ Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>#{{ order.id }}</td>
          <td>{{ getCustomerName(order) }}</td>
          <td>
            <ul>
              <li v-for="(item, index) in getOrderItems(order)" :key="index">
                {{ item }}
              </li>
            </ul>
          </td>
          <td>Rs. {{ getOrderAmount(order) }}</td>
          <td>{{ getOrderTime(order) }}</td>
          <td>
            <span :class="['status-badge', getOrderStatus(order).toLowerCase()]">
              {{ getOrderStatus(order) }}
            </span>
          </td>
          <td>
            <button 
              class="btn accept"
              @click="handleStatusUpdate(order.id, 'Accepted')"
              :disabled="!canAccept(order)"
            >
              ✅ Accept
            </button>
            <button 
              class="btn reject"
              @click="handleStatusUpdate(order.id, 'Rejected')"
              :disabled="!canReject(order)"
            >
              ❌ Reject
            </button>
            <button 
              class="btn deliver"
              @click="handleStatusUpdate(order.id, 'Delivered')"
              :disabled="!canDeliver(order)"
            >
              🚚 Delivered
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>


export default {
  name: "OrdersTable",
  props: {
    orders: {
      type: Array,
      required: true,
    },
  },
  emits: ['update-status'],
  setup(props, { emit }) {
    
    // Helper methods to handle different data structures
    const getCustomerName = (order) => {
      return order.customer_name || 
             order.customer?.name || 
             order.customer || 
             order.user?.name || 
             'Unknown Customer'
    }

    const getOrderItems = (order) => {
      // Handle different possible structures
      if (order.items && Array.isArray(order.items)) {
        return order.items.map(item => 
          typeof item === 'string' ? item : 
          item.name || 
          `${item.menu_item?.name || 'Item'} x${item.quantity || 1}`
        )
      }
      
      if (order.order_items && Array.isArray(order.order_items)) {
        return order.order_items.map(item => 
          `${item.menu_item?.name || item.name || 'Item'} x${item.quantity || 1}`
        )
      }
      
      // Fallback
      return [order.item_names || 'Order items']
    }

    const getOrderAmount = (order) => {
      return order.total_amount || order.amount || order.total || 0
    }

    const getOrderTime = (order) => {
      if (order.created_at) {
        return new Date(order.created_at).toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }
      return order.time || order.order_time || 'N/A'
    }

    const getOrderStatus = (order) => {
      return order.status || 'Pending'
    }

    const canAccept = (order) => {
      const status = getOrderStatus(order).toLowerCase()
      return status === 'pending' || status === 'new'
    }

    const canReject = (order) => {
      const status = getOrderStatus(order).toLowerCase()
      return status === 'pending' || status === 'new'
    }

    const canDeliver = (order) => {
      const status = getOrderStatus(order).toLowerCase()
      return status === 'accepted' || status === 'preparing'
    }

    const handleStatusUpdate = (orderId, newStatus) => {
      console.log('OrdersTable: Emitting status update:', { orderId, newStatus })
      emit('update-status', orderId, newStatus)
    }

    return {
      // Helper methods
      getCustomerName,
      getOrderItems,
      getOrderAmount,
      getOrderTime,
      getOrderStatus,
      canAccept,
      canReject,
      canDeliver,
      handleStatusUpdate
    }
  }
}
</script>


<style scoped>
.orders-table table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.orders-table th,
.orders-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #f1f1f1;
  font-size: 0.9rem;
}

.orders-table thead {
  background: #00a8ff;
  color: #fff;
}

.orders-table ul {
  margin: 0;
  padding-left: 18px;
}

/* Status Badges */
.status-badge {
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  color: #fff;
}
.status-badge.pending {
  background: #fbc531;
}
.status-badge.accepted {
  background: #4cd137;
}
.status-badge.delivered {
  background: #00a8ff;
}
.status-badge.rejected {
  background: #e84118;
}

/* Buttons */
.btn {
  padding: 6px 12px;
  margin-right: 6px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: 0.3s;
}

.btn.accept {
  background: #44bd32;
  color: #fff;
}
.btn.accept:disabled {
  background: #95afc0;
  cursor: not-allowed;
}

.btn.reject {
  background: #e84118;
  color: #fff;
}
.btn.reject:disabled {
  background: #95afc0;
  cursor: not-allowed;
}

.btn.deliver {
  background: #0097e6;
  color: #fff;
}
.btn.deliver:disabled {
  background: #95afc0;
  cursor: not-allowed;
}
</style>
