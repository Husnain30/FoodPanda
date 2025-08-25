<template>
  <q-header elevated class=" text-white" style="background: linear-gradient(135deg, #6a11cb, #2575fc);">
    <q-toolbar>
      <!-- Logo -->
      <q-avatar square size="42px" class="q-mr-md">
        <q-icon name="delivery_dining" size="32px" />
      </q-avatar>

      <!-- Tabs -->
      <q-tabs
        v-model="tab"
        dense
        align="left"
        active-color="white"
        indicator-color="white"
        class="navbar-tabs"
      >
        <q-route-tab to="/rider" name="dashboard" label="Dashboard" />
        <q-route-tab to="/rider/order-assignment" name="orders" label="Orders" />
        <q-route-tab to="/rider/navigation" name="navigation" label="Navigation" />
        <q-route-tab to="/rider/earnings" name="earnings" label="Earnings" />
      </q-tabs>

      <q-space />

      <!-- Rider Status Toggle -->
      <rider-status-toggle class="q-mr-md" />

      <!-- Logout Button -->
      <q-btn dense class="logout-btn" label="Logout" @click="handleLogout" />
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
import RiderStatusToggle from './RiderStatusToggle.vue'

const tab = ref('/rider')

function handleLogout() {
  store.dispatch("rider/logout");
  router.push("/auth/login"); // redirect after logout
}
</script>

<style scoped>
.navbar-tabs .q-tabs__tab {
  font-weight: 600;
  font-size: 15px;
  transition: 0.3s;
}
.navbar-tabs .q-tabs__tab:hover {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
}
.navbar-tabs .q-tabs__tab--active {
  background: rgba(255, 255, 255, 0.25);
  border-radius: 8px;
}
.logout-btn {
  background-color: #e53935;
  color: #fff;
  font-weight: 600;
  border-radius: 12px;
  padding: 6px 16px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}
.logout-btn:hover {
  background-color: #d32f2f;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.2);
}
</style>
