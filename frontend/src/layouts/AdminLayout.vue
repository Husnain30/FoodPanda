<template>
  <q-layout view="hHh Lpr fFf" class="admin-layout">

    <!-- ===== Top Header ===== -->
    <q-header elevated class="bg-primary text-white shadow-4 animate__animated animate__fadeInDown">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
          class="q-mr-sm"
        />
        <q-toolbar-title class="text-h5 text-bold">🚀 Admin Panel</q-toolbar-title>

        <q-space />

        <q-btn
          flat
          dense
          icon="logout"
          label="Logout"
          class="bg-red-5 text-white q-px-md rounded-borders"
          @click="logout"
        />
      </q-toolbar>
    </q-header>

    <!-- ===== Sidebar (Navigation Drawer) ===== -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-2 text-dark drawer-animate"
    >
      <q-list padding class="animate__animated animate__fadeInLeft">
        <q-item-label header class="text-grey-8 text-bold">📂 Navigation</q-item-label>

        <q-item clickable v-ripple to="/admin/dashboard" class="nav-item">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>Dashboard</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/admin/users" class="nav-item">
          <q-item-section avatar>
            <q-icon name="people" />
          </q-item-section>
          <q-item-section>Users</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/admin/restaurants" class="nav-item">
          <q-item-section avatar>
            <q-icon name="store" />
          </q-item-section>
          <q-item-section>Restaurants</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/admin/riders" class="nav-item">
          <q-item-section avatar>
            <q-icon name="two_wheeler" />
          </q-item-section>
          <q-item-section>Riders</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/admin/orders" class="nav-item">
          <q-item-section avatar>
            <q-icon name="receipt_long" />
          </q-item-section>
          <q-item-section>Orders</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/admin/payments" class="nav-item">
          <q-item-section avatar>
            <q-icon name="payment" />
          </q-item-section>
          <q-item-section>Payments</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- ===== Page Content ===== -->
    <q-page-container class="q-pa-md page-animate">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"

export default {
  name: "AdminLayout",
  setup() {
    const leftDrawerOpen = ref(true)
    const store = useStore()
    const router = useRouter()

    const logout = () => {
      store.dispatch("auth/logout")
      router.push("/auth/login")
    }

    return {
      leftDrawerOpen,
      logout,
    }
  },
}
</script>

<style scoped>
/* Layout styling */
.admin-layout {
  min-height: 100vh;
  background: linear-gradient(135deg, #f9f9f9, #f0f0f5);
}

/* Sidebar smooth animation */
.drawer-animate {
  transition: all 0.4s ease;
}

/* Sidebar hover effects */
.nav-item {
  border-radius: 10px;
  margin: 5px 0;
  transition: 0.3s;
}
.nav-item:hover {
  background: linear-gradient(90deg, #42a5f5, #478ed1);
  color: white;
  transform: translateX(5px);
}

/* Page content smooth fade */
.page-animate {
  animation: fadeInUp 0.7s ease-in-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
