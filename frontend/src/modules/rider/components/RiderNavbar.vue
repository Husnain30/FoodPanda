<template>
  <q-header elevated class="text-white navbar-header">
    <q-toolbar class="navbar-toolbar">
      <!-- Logo -->
      <div class="flex items-center q-mr-xl">
        <q-avatar square size="48px" class="navbar-logo">
          <q-icon name="delivery_dining" size="32px" />
        </q-avatar>
        <span class="brand-name">Rider Panel</span>
      </div>

      <!-- Tabs -->
      <q-tabs
        v-model="tab"
        align="left"
        active-color="white"
        indicator-color="white"
        class="navbar-tabs"
      >
        <q-route-tab to="/riders" name="dashboard" label="Dashboard" />
        <q-route-tab to="/riders/orders" name="orders" label="Orders" />
        <q-route-tab to="/riders/navigation" name="navigation" label="Navigation" />
        <q-route-tab to="/riders/earnings" name="earnings" label="Earnings" />
      </q-tabs>

      <q-space />

      <!-- Rider Status Toggle -->
      <rider-status-toggle class="q-mr-md" />

      <!-- Logout Button -->
      <q-btn class="logout-btn" label="Logout" unelevated @click="handleLogout" />
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import RiderStatusToggle from "./RiderStatusToggle.vue";

const tab = ref("/riders");
const store = useStore();
const router = useRouter();

function handleLogout() {
  store.dispatch("riders/logout");
  router.push("/auth/login");
}
</script>

<style scoped>
/* Navbar background */
.navbar-header {
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  height: 72px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

/* Toolbar adjustments */
.navbar-toolbar {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

/* Logo & Brand */
.navbar-logo {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.brand-name {
  font-size: 18px;
  font-weight: 700;
  margin-left: 10px;
  letter-spacing: 0.5px;
  color: #fff;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
}

/* Tabs */
.navbar-tabs :deep(.q-tab) {
  font-weight: 600;
  font-size: 15px;
  padding: 10px 18px;
  transition: all 0.3s ease;
  border-radius: 8px;
}


/* Logout Button */
.logout-btn {
  background: #e53935;
  color: #fff;
  font-weight: 600;
  border-radius: 20px;
  padding: 8px 20px;
  font-size: 15px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}
.logout-btn:hover {
  background: #c62828;
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(0,0,0,0.3);
}
</style>

