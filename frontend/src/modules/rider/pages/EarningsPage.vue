<template>
  <q-page class="q-pa-md earnings-page">

    <!-- Page Header -->
    <div class="page-header q-mb-lg">
      <div class="text-h5">Earnings</div>
      <div class="earnings-caption ">
        Track your income and completed deliveries
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-md-4">
        <q-card class="summary-card shadow-3">
          <q-card-section>
            <div class="card-title">Total Earnings</div>
            <div class="card-value">$2,450</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-4">
        <q-card class="summary-card shadow-3">
          <q-card-section>
            <div class="card-title">Today's Earnings</div>
            <div class="card-value">$180</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-4">
        <q-card class="summary-card shadow-3">
          <q-card-section>
            <div class="card-title">Completed Orders</div>
            <div class="card-value">24</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Detailed Earnings Table -->
    <q-card class="shadow-3 q-pa-md">
      <div class="text-subtitle2 q-mb-md">Recent Deliveries</div>
      <div v-for="earning in earnings" :key="earning.id" class="earning-row row items-center hover-row q-py-sm">
        <div class="col-3">{{ earning.date }}</div>
        <div class="col-5">{{ earning.order }}</div>
        <div class="col-2">${{ earning.amount }}</div>
        <div class="col-2">{{ earning.status }}</div>
      </div>
    </q-card>

  </q-page>
</template>

<script setup>
const earnings = [
  { id: 1, date: "2025-08-21", order: "Order #001 - Pizza Hut", amount: 25, status: "Completed" },
  { id: 2, date: "2025-08-21", order: "Order #002 - KFC", amount: 18, status: "Completed" },
  { id: 3, date: "2025-08-21", order: "Order #003 - McDonald's", amount: 30, status: "Completed" },
  { id: 4, date: "2025-08-20", order: "Order #004 - Subway", amount: 22, status: "Completed" },
];
</script>

<style scoped>
.earnings-page {
  background: #f5f7fa;
  min-height: 100vh;
}

/* Page Header */
.page-header .text-h5 {
  font-weight: 700;
}

.earnings-caption {
  font-size: 20px;
  font-weight: 500;
  color: #555;
  margin-top: 10px;
}

/* Summary Cards */
.summary-card {
  border-radius: 16px;
  background: #ffffff;
  padding: 20px;
  text-align: center;
  transition: 0.3s;
}
.summary-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.card-title {
  font-size: 14px;
  font-weight: 600;
  color: #1976d2;
}

.card-value {
  font-size: 24px;
  font-weight: 700;
  margin-top: 8px;
  color: #424242;
}

/* Earnings Table Rows */
.earning-row {
  border-bottom: 1px solid #e0e0e0;
  border-radius: 8px;
  transition: 0.3s;
}
.earning-row:last-child {
  border-bottom: none;
}
.hover-row:hover {
  background: #e3f2fd;
  box-shadow: 0 2px 8px rgba(33, 150, 243, 0.1);
}
</style>