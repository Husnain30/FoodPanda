<template>
  <div class="q-pa-md order-status-card">
    <!-- Title -->
    <div class="text-h6 q-mb-sm">Order Status</div>
    <div class="text-caption text-grey-6 q-mb-md">
      Track the progress of your delivery in real-time
    </div>

    <!-- Vertical Stepper -->
    <q-stepper
      v-model="step"
      vertical
      animated
      class="custom-stepper"
    >
      <q-step
        name="1"
        title="Accepted"
        icon="check_circle"
        :done="step > 1"
      />
      <q-step
        name="2"
        title="Picked Up"
        icon="restaurant"
        :done="step > 2"
      />
      <q-step
        name="3"
        title="Delivered"
        icon="done_all"
      />
    </q-stepper>

    <!-- Next Button -->
    <q-btn
      color="primary"
      label="Next"
      class="next-btn q-mt-md"
      @click="nextStep"
      glossy
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
const step = ref(1);

function nextStep() {
  if (step.value < 3) step.value++;
}
</script>

<style scoped>
.order-status-card {
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.custom-stepper .q-stepper__tab {
  background: #f4f6f8;
  border-radius: 12px;
  margin-bottom: 14px;
  transition: 0.3s;
  padding: 10px;
}

.custom-stepper .q-stepper__tab--active {
  background: #e0f2fe; /* light blue */
  box-shadow: 0 2px 8px rgba(33, 150, 243, 0.3);
}

.custom-stepper .q-stepper__title {
  font-weight: 600;
  color: #1976d2;
}

.custom-stepper .q-stepper__icon {
  color: #1976d2;
  background: #e3f2fd;
  border-radius: 50%;
}


</style>