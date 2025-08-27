<template>
  <q-page padding>
    <h1 class="page-title">📜 Order History</h1>
    <q-card v-for="n in 3" :key="n" class="q-mb-md shadow-card q-pa-md">
      <div class="order-info">
        <span><strong>Order #{{ 1000+n }}</strong></span>
        <span>Status: <q-badge color="positive">Delivered</q-badge></span>
      </div>
      <div class="order-details">Total: ${{ (25*n).toFixed(2) }}</div>
    </q-card>
  </q-page>
</template>

<style scoped>
.page-title { font-size: 28px; margin-bottom: 20px; }
.shadow-card { border-radius: 14px; box-shadow: 0 3px 10px rgba(0,0,0,0.1); }
.order-info { display: flex; justify-content: space-between; margin-bottom: 6px; }
.order-details { font-size: 14px; color: #666; }
</style>