<template>
  <q-card class="shadow-2 rounded-borders bg-white">
    <q-card-section>
      <div class="chart-header">
        <h2 class="text-h6">Revenue Trends</h2>
        <div class="chart-actions">
          <q-btn flat round dense icon="refresh" @click="$emit('view-details')" title="View Details"/>
        </div>
      </div>
      <div class="chart-wrapper">
        <canvas ref="chartCanvas"></canvas>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps({
  earningsData: {
    type: Array,
    required: true,
    default: () => []
  }
});

const chartCanvas = ref(null);
let chartInstance = null;

const renderChart = () => {
  if (chartInstance) {
    chartInstance.destroy();
  }

  const labels = props.earningsData.map(e => e.month);
  const data = props.earningsData.map(e => e.amount);

  chartInstance = new Chart(chartCanvas.value, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Earnings (PKR)',
          data,
          borderColor: '#6c5ce7',
          backgroundColor: 'rgba(108,92,231,0.1)',
          fill: true,
          tension: 0.4,
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { mode: 'index', intersect: false }
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: '#f1f3f4' }, beginAtZero: true }
      }
    }
  });
};

onMounted(() => renderChart());

watch(() => props.earningsData, () => renderChart(), { deep: true });
</script>

<style scoped>
.chart-wrapper {
  height: 300px;
  width: 100%;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.chart-actions q-btn {
  color: #6c5ce7;
}
</style>
