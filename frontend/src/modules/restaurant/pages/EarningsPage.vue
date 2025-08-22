<template>
  <q-page class="bg-grey-1 q-pa-md">

    <!-- Page Header -->
    <div class="page-header q-mb-lg">
      <h1 class="text-h4 text-primary">Earnings Analytics</h1>
      <p class="text-subtitle2 text-grey">View revenue performance and trends for your restaurant.</p>
    </div>

    <div class="row q-col-gutter-md">

      <!-- Earnings Chart -->
      <div class="col-12 col-md-8">
        <EarningsChart :earningsData="earningsData" @view-details="viewDetails"/>
      </div>

      <!-- Summary Cards -->
      <div class="col-12 col-md-4">
        <q-card class="q-mb-md shadow-2 rounded-borders bg-white">
          <q-card-section>
            <div class="text-subtitle2 text-grey">Today's Earnings</div>
            <div class="text-h5 text-primary">{{ todaysEarnings.toLocaleString() }} PKR</div>
          </q-card-section>
        </q-card>

        <q-card class="q-mb-md shadow-2 rounded-borders bg-white">
          <q-card-section>
            <div class="text-subtitle2 text-grey">This Month</div>
            <div class="text-h5 text-positive">{{ monthlyEarnings.toLocaleString() }} PKR</div>
          </q-card-section>
        </q-card>

        <q-card class="shadow-2 rounded-borders bg-white">
          <q-card-section>
            <div class="text-subtitle2 text-grey">This Year</div>
            <div class="text-h5 text-accent">{{ yearlyEarnings.toLocaleString() }} PKR</div>
          </q-card-section>
        </q-card>
      </div>

    </div>

    <!-- Detailed Earnings Table -->
    <q-card class="q-mt-lg shadow-2 rounded-borders">
      <q-card-section>
        <div class="text-h6">Monthly Earnings Breakdown</div>
      </q-card-section>

      <q-table
        :rows="earningsData"
        :columns="columns"
        row-key="month"
        flat
        bordered
        dense
        class="q-pa-none"
      >
        <template v-slot:body-cell-amount="props">
          <q-td :props="props">
            {{ props.row.amount.toLocaleString() }} PKR
          </q-td>
        </template>
      </q-table>
    </q-card>

  </q-page>
</template>

<script setup>
import { computed } from 'vue';
import EarningsChart from '../components/EarningsChart.vue';

// Mock data
const earningsData = [
  { month: 'Jan', amount: 12000 },
  { month: 'Feb', amount: 15000 },
  { month: 'Mar', amount: 18000 },
  { month: 'Apr', amount: 9000 },
  { month: 'May', amount: 23000 },
  { month: 'Jun', amount: 20000 },
  { month: 'Jul', amount: 25000 },
  { month: 'Aug', amount: 22000 },
  { month: 'Sep', amount: 19000 },
  { month: 'Oct', amount: 30000 },
  { month: 'Nov', amount: 27000 },
  { month: 'Dec', amount: 35000 },
];

const todaysEarnings = computed(() => 3500);
const monthlyEarnings = computed(() =>
  earningsData.reduce((sum, e) => sum + e.amount, 0)
);
const yearlyEarnings = computed(() => monthlyEarnings.value);

const columns = [
  { name: 'month', label: 'Month', field: 'month', align: 'left' },
  { name: 'amount', label: 'Earnings (PKR)', field: 'amount', align: 'right' },
];

const viewDetails = () => {
  console.log('Redirect to detailed earnings report...');
};
</script>

<style scoped>
.rounded-borders {
  border-radius: 12px;
}
</style>
