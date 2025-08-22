<template>
  <q-header elevated class="text-white" style="background: linear-gradient(135deg, #6a11cb, #2575fc);">
    <q-toolbar>
      <!-- Logo -->
      <q-avatar square size="42px" class="q-mr-md">
        <q-icon name="restaurant" size="32px" />
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
        <q-route-tab to="/customer/restaurants" name="restaurants" label="Browse Restaurants" />
        <q-route-tab to="/customer/cart" name="cart" label="Cart" />
        <q-route-tab to="/customer/checkout" name="checkout" label="Checkout" />
        <q-route-tab to="/customer/restaurants/:id" name="menu" label="Menu" />
        <q-route-tab to="/customer/orders" name="orders" label="Order History" />
        <q-route-tab to="/customer/track/1" name="track" label="Order Tracking" />
        <q-route-tab to="/customer/review/1" name="review" label="Review" />
      </q-tabs>

      <q-space />

      <!-- Logout Button -->
      <q-btn dense class="logout-btn" label="Logout" @click="handleLogout" />
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const tab = ref("/customer/restaurants");
const store = useStore();
const router = useRouter();

function handleLogout() {
  store.dispatch("customer/logout"); // dispatch your logout action
  router.push("/auth/login"); // redirect to login
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


