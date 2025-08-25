<template>
  <q-page class="dashboard-page q-pa-md">
    <order-status-update />
  </q-page>
</template>

<script setup>
import OrderStatusUpdate from '../components/OrderStatusUpdate.vue'
</script>

<style scoped>
.dashboard-page {
  background: #f8f9fa;
}
</style>