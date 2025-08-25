<template>
  <div class="status-toggle flex items-center q-pa-xs">
    <!-- Online/Offline Badge -->
    <q-badge
      :class="online ? 'online-badge' : 'offline-badge'"
      class="q-mr-sm text-white"
      rounded
      align="middle"
    >
      {{ online ? 'Online' : 'Offline' }}
    </q-badge>

    <!-- Toggle Switch -->
    <q-toggle
      v-model="online"
      color="green"
      keep-color
      checked-icon="wifi"
      unchecked-icon="wifi_off"
      dense
      class="toggle-switch"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
const online = ref(true);
</script>

<style scoped>
.status-toggle {
  background: rgba(255, 255, 255, 0.15);
  padding: 6px 12px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}
.status-toggle:hover {
  background: rgba(255, 255, 255, 0.25);
}

/* Badge Styling */
.online-badge {
  background: linear-gradient(135deg, #4caf50, #81c784);
  font-weight: 600;
  padding: 4px 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}
.offline-badge {
  background: linear-gradient(135deg, #f44336, #e57373);
  font-weight: 600;
  padding: 4px 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}

/* Toggle Switch */
.toggle-switch {
  --q-toggle-bg-color: #ffffff20;
  --q-toggle-thumb-color: #fff;
  --q-toggle-check-color: #4caf50;
  transition: all 0.3s;
}
.toggle-switch:hover {
  --q-toggle-bg-color: #ffffff40;
}
</style>