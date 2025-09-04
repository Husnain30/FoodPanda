<template>
  <q-header elevated class="text-white navbar-header">
    <q-toolbar class="navbar-toolbar">
      <!-- Logo -->
      <div class="flex items-center q-mr-xl">
        <q-avatar square size="48px" class="navbar-logo">
          <q-icon name="restaurant" size="32px" />
        </q-avatar>
        <span class="brand-name">Foodpanda Clone</span>
      </div>

      <!-- Tabs -->
      <q-tabs
        v-model="tab"
        align="left"
        active-color="white"
        indicator-color="white"
        class="navbar-tabs"
      >
        <q-route-tab to="/restaurants" name="restaurants" label="Browse Restaurants" />
        <q-route-tab to="/cart" name="cart" label="Cart" />
        <q-route-tab to="/checkout" name="checkout" label="Checkout" />
        <q-route-tab to="/orders" name="placeOrder" label="Order History" />
        <q-route-tab to="/orders/1" name="trackOrder" label="Order Tracking" />
        <q-route-tab to="/reviews" name="review" label="Review" />
      </q-tabs>

      <q-space />

      <!-- Logout Button -->
      <q-btn class="logout-btn" label="Logout" unelevated @click="handleLogout" />
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const tab = ref("/restaurants");
const store = useStore();
const router = useRouter();

function handleLogout() {
  store.dispatch("customer/logout");
  router.push("/auth/login");
}
</script>

<style scoped>
/* Navbar background */
.navbar-header {
background: #1e272e;
  height: 72px; /* 👈 smaller & cleaner navbar */
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

/* Tabs (deep selector to override Quasar) */
.navbar-tabs :deep(.q-tab) {
  font-weight: 600;
  font-size: 30px; /* 👈 now applied */
  padding: 10px 18px;
  transition: all 0.3s ease;
  border-radius: 8px;
}

/* Logout Button */
.logout-btn {
  background: #e53935;
  color: #fff;
  font-weight: 600;
  border-radius: 20px; /* 👈 rounded pill */
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






