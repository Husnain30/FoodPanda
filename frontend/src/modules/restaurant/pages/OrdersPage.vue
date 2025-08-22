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

    <!-- Orders Table -->
    <OrdersTable 
      :orders="filteredOrders" 
      @update-status="updateOrderStatus" 
    />
  </div>
</template>

<script>
import OrdersTable from "../components/OrdersTable.vue";

export default {
  name: "OrdersPage",
  components: { OrdersTable },
  data() {
    return {
      searchQuery: "",
      statusFilter: "",
      orders: [
        {
          id: 101,
          customer: "Ali Khan",
          items: ["Burger", "Fries", "Coke"],
          amount: 850,
          status: "Pending",
          time: "12:45 PM",
        },
        {
          id: 102,
          customer: "Sara Ahmed",
          items: ["Pizza", "Garlic Bread"],
          amount: 1200,
          status: "Accepted",
          time: "1:15 PM",
        },
        {
          id: 103,
          customer: "Bilal Hussain",
          items: ["Biryani", "Raita"],
          amount: 600,
          status: "Delivered",
          time: "2:05 PM",
        },
        {
          id: 104,
          customer: "Fatima Noor",
          items: ["Pasta", "Lemonade"],
          amount: 950,
          status: "Rejected",
          time: "3:20 PM",
        },
      ],
    };
  },
  computed: {
    filteredOrders() {
      return this.orders.filter((order) => {
        const matchesSearch =
          order.customer.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesStatus = this.statusFilter
          ? order.status === this.statusFilter
          : true;
        return matchesSearch && matchesStatus;
      });
    },
  },
  methods: {
    updateOrderStatus(orderId, newStatus) {
      const order = this.orders.find((o) => o.id === orderId);
      if (order) order.status = newStatus;
    },
  },
};
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
