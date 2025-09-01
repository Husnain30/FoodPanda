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
            <div class="card-value">${{ riderEarnings.total || 0 }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-4">
        <q-card class="summary-card shadow-3">
          <q-card-section>
            <div class="card-title">Today's Earnings</div>
            <div class="card-value">${{ riderEarnings.today || 0 }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-4">
        <q-card class="summary-card shadow-3">
          <q-card-section>
            <div class="card-title">Completed Orders</div>
            <div class="card-value">{{ riderEarnings.completedOrders || 0 }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Detailed Earnings Table -->
    <q-card class="shadow-3 q-pa-md">
      <div class="text-subtitle2 q-mb-md">Recent Deliveries</div>

      <div
        v-for="earning in riderEarnings.recent || []"
        :key="earning.id"
        class="earning-row row items-center hover-row q-py-sm"
      >
        <div class="col-3">{{ earning.date }}</div>
        <div class="col-5">{{ earning.order }}</div>
        <div class="col-2">${{ earning.amount }}</div>
        <div class="col-2">{{ earning.status }}</div>
      </div>

      <div v-if="riderLoading" class="text-center q-mt-md">
        <q-spinner color="primary" size="2em" />
      </div>

      <div v-if="riderError" class="text-negative text-center q-mt-md">
        {{ riderError }}
      </div>
    </q-card>

  </q-page>
</template>

<script setup>
import { onMounted } from "vue";
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();

// map state
const riderEarnings = computed(() => store.getters["rider/riderEarnings"]);
const riderLoading = computed(() => store.getters["rider/riderLoading"]);
const riderError = computed(() => store.getters["rider/riderError"]);

// fetch on page load
onMounted(() => {
  store.dispatch("rider/fetchEarnings");
});
</script>
