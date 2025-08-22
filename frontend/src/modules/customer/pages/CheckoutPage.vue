<template>
  <q-page padding>
    <h1 class="page-title">💳 Checkout</h1>
    <AddressSelector />

    <q-card class="q-pa-lg q-mt-md shadow-card">
      <h3>Payment Method</h3>
      <q-radio v-model="payment" val="card" label="Credit Card" />
      <q-radio v-model="payment" val="cash" label="Cash on Delivery" />

      <q-btn color="primary" class="q-mt-md" label="Confirm Order" />
    </q-card>
  </q-page>
</template>

<script>
import AddressSelector from "../components/AddressSelector.vue";
export default {
  components: { AddressSelector },
  data() {
    return { payment: "card" };
  },
};
</script>

<style scoped>
.page-title { font-size: 28px; margin-bottom: 20px; font-weight: bold; }
.shadow-card { border-radius: 16px; box-shadow: 0 4px 14px rgba(0,0,0,0.12); }
</style>