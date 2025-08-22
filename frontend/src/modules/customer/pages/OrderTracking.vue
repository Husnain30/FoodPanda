<template>
  <q-page padding>
    <h1 class="page-title">🚚 Track Your Order</h1>
    <q-timeline color="primary">
      <q-timeline-entry title="Order Placed" subtitle="10:00 AM" />
      <q-timeline-entry title="Preparing Food" subtitle="10:15 AM" />
      <q-timeline-entry title="Out for Delivery" subtitle="10:45 AM" />
      <q-timeline-entry title="Delivered" subtitle="11:15 AM" />
    </q-timeline>
  </q-page>
</template>

<style scoped>
.page-title { font-size: 28px; margin-bottom: 20px; font-weight: bold; }
</style>