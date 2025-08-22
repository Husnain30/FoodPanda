<template>
  <q-card class="q-pa-md shadow-card">
    <h3>📍 Delivery Address</h3>
    <q-input filled v-model="address" label="Enter your address" />
    <q-btn flat color="primary" label="Use Current Location" class="q-mt-sm" />
  </q-card>
</template>

<script>
export default { data() { return { address: "" }; } };
</script>

<style scoped>
.shadow-card { border-radius: 16px; box-shadow: 0 3px 12px rgba(0,0,0,0.1); }
</style>