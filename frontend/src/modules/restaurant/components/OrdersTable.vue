<!-- src/modules/restaurant/components/OrdersTable.vue -->
<template>
  <div class="orders-table">
    <table>
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
          <td>{{ order.customer }}</td>
          <td>
            <ul>
              <li v-for="(item, index) in order.items" :key="index">{{ item }}</li>
            </ul>
          </td>
          <td>Rs. {{ order.amount }}</td>
          <td>{{ order.time }}</td>
          <td>
            <span :class="['status-badge', order.status.toLowerCase()]">
              {{ order.status }}
            </span>
          </td>
          <td>
            <button 
              class="btn accept" 
              @click="$emit('update-status', order.id, 'Accepted')"
              :disabled="order.status !== 'Pending'"
            >
              ✅ Accept
            </button>
            <button 
              class="btn reject" 
              @click="$emit('update-status', order.id, 'Rejected')"
              :disabled="order.status !== 'Pending'"
            >
              ❌ Reject
            </button>
            <button 
              class="btn deliver" 
              @click="$emit('update-status', order.id, 'Delivered')"
              :disabled="order.status !== 'Accepted'"
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
};
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
