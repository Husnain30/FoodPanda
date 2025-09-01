<template>
  <q-page padding>
    <h1 class="page-title">Checkout</h1>

    <!-- Address Selector -->
    <AddressSelector />

    <!-- Payment Section -->
    <q-card class="q-pa-lg q-mt-md shadow-card">
      <h3 class="section-title">Payment Method</h3>
      <div class="payment-options">
        <q-radio v-model="payment" val="card" label="Credit Card" />
        <q-radio v-model="payment" val="cash" label="Cash on Delivery" />
      </div>

      <!-- Confirm Button -->
      <q-btn 
       
        class="confirm-btn q-mt-md" 
        label="Confirm Order" 
      />
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
.page-title {
  font-size: 35px;
  margin-bottom: 1px;
  font-weight: bold;
}

/* Card styling */
.shadow-card {
  border-radius: 18px;
  box-shadow: 0 4px 16px rgba(106, 17, 203, 0.2),
              0 6px 20px rgba(37, 117, 252, 0.2);
  transition: all 0.3s ease;
}
.shadow-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 18px rgba(106, 17, 203, 0.3),
              0 8px 24px rgba(37, 117, 252, 0.3);
}

.section-title {
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

/* Payment Options */
.payment-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 0;
  font-size: 15px;
}

/* Confirm Button */
.confirm-btn {
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 25px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(37, 117, 252, 0.3);
}
.confirm-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 14px rgba(106, 17, 203, 0.35);
}
</style>

