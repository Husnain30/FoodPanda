<template>
  <q-page class="q-pa-md order-assignment-page">

    <!-- Page Header -->
    <div class="page-header q-mb-md">
      <div class="text-h5">Available Orders</div>
      
    </div>

    <!-- Single Card containing all orders -->
    <q-card class="orders-card shadow-3 q-pa-md">
      
      <div class="order-table-header row q-mb-sm">
        <div class="col-2 text-subtitle2">Order ID</div>
        <div class="col-4 text-subtitle2">Customer</div>
        <div class="col-4 text-subtitle2">Pickup Location</div>
        <div class="col-2 text-subtitle2 text-center">Action</div>
      </div>

      <q-separator />

      <!-- Order Rows -->
      <div
        v-for="order in orders"
        :key="order.id"
        class="order-row row items-center q-py-sm hover-row"
      >
        <div class="col-2">{{ order.id }}</div>
        <div class="col-4">{{ order.customer }}</div>
        <div class="col-4">{{ order.location }}</div>
        <div class="col-2 text-center">
          <q-btn color="primary" glossy label="Accept" size="sm" @click="acceptOrder(order)" />
        </div>
      </div>
    </q-card>

  </q-page>
</template>

<script setup>
const orders = [
  { id: "001", customer: "Ali Khan", location: "Pizza Hut" },
  { id: "002", customer: "Sara Ahmed", location: "KFC" },
  { id: "003", customer: "John Doe", location: "McDonald's" },
];

function acceptOrder(order) {
  console.log("Accepted:", order);
}
</script>

<style scoped>
.order-assignment-page {
  background: #f5f7fa;
  min-height: 100vh;
}

/* Page Header */
.page-header .text-h5 {
  font-weight: 700;
}
.page-header .text-caption {
  color: #666;
}

/* Orders Card */
.orders-card {
  border-radius: 16px;
  background: #ffffff;
  padding: 20px;
}

/* Header Row */
.order-table-header {
  font-weight: 600;
  color: #1976d2;
  padding-bottom: 6px;
}

/* Order Rows */
.order-row {
  border-bottom: 1px solid #f0f0f0;
  transition: 0.3s;
  border-radius: 8px;
}
.order-row:last-child {
  border-bottom: none;
}

/* Hover effect */
.hover-row:hover {
  background: #e3f2fd;
  box-shadow: 0 2px 8px rgba(33, 150, 243, 0.1);
  border-radius: 8px;
}

/* Buttons */
.q-btn {
  font-weight: 600;
}
</style>