<template>
  <q-layout view="hHh Lpr fFf" class="admin-layout">

    <!-- ===== Top Header ===== -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
          class="q-mr-sm"
        />
        <q-toolbar-title>Admin Panel</q-toolbar-title>

        <q-space />

        <q-btn
          flat
          dense
          icon="logout"
          label="Logout"
          @click="logout"
        />
      </q-toolbar>
    </q-header>

    <!-- ===== Sidebar (Navigation Drawer) ===== -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-1"
    >
      <q-list padding>
        <q-item-label header class="text-grey-8">Navigation</q-item-label>

        <q-item clickable v-ripple to="/admin/dashboard">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>Dashboard</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/admin/users">
          <q-item-section avatar>
            <q-icon name="people" />
          </q-item-section>
          <q-item-section>Users</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/admin/merchants">
          <q-item-section avatar>
            <q-icon name="store" />
          </q-item-section>
          <q-item-section>Merchants</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/admin/listings">
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
          <q-item-section>Listings</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/admin/bookings">
          <q-item-section avatar>
            <q-icon name="event" />
          </q-item-section>
          <q-item-section>Bookings</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/admin/payments">
          <q-item-section avatar>
            <q-icon name="payment" />
          </q-item-section>
          <q-item-section>Payments</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/admin/analytics">
          <q-item-section avatar>
            <q-icon name="bar_chart" />
          </q-item-section>
          <q-item-section>Analytics</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- ===== Page Content ===== -->
    <q-page-container>
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
.admin-layout {
  min-height: 100vh;
}
</style>
