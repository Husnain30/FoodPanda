<template>
  <div class="q-pa-md order-status-card">
    <!-- Title -->
    <div class="text-h6 q-mb-sm order-title"> Order Status</div>
    <div class="text-caption text-grey-7 q-mb-md">
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
      label="Next"
      class="next-btn q-mt-md"
      @click="nextStep"
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
  border-radius: 18px;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}
.order-status-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
}

.order-title {
  font-size: 20px;
  font-weight: 700;
 color: black;
}

/* Stepper styling */
.custom-stepper .q-stepper__tab {
  background: #f8f9fa;
  border-radius: 14px;
  margin-bottom: 14px;
  transition: 0.3s;
  padding: 12px;
}
.custom-stepper .q-stepper__tab:hover {
  background: #f1f5ff;
}
.custom-stepper .q-stepper__tab--active {
  background: #e8f0fe;
  box-shadow: 0 3px 10px rgba(33, 150, 243, 0.3);
  transform: scale(1.02);
}

.custom-stepper .q-stepper__title {
  font-weight: 600;
  color: #1a237e;
}

.custom-stepper .q-stepper__icon {
  color: white;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  border-radius: 50%;
  padding: 6px;
  box-shadow: 0 2px 6px rgba(37, 117, 252, 0.4);
}

/* Next button */
.next-btn {
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: white;
  font-weight: 600;
  border-radius: 12px;
  padding: 10px 20px;
  box-shadow: 0 6px 14px rgba(37, 117, 252, 0.35);
  transition: all 0.3s ease;
}
.next-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 18px rgba(106, 17, 203, 0.4);
}
</style>
