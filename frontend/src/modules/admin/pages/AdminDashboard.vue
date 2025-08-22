<template>
  <q-page padding>
    <!-- Header -->
    <div class="row q-mb-md">
      <div class="col">
        <h4 class="text-h4">Admin Dashboard</h4>
      </div>
    </div>

    <!-- Welcome -->
    <q-card class="q-pa-md q-mb-md">
      <q-card-section>
        <div v-if="user">
          <div class="text-h6">Welcome, {{ user.name || user.email }}</div>
          <div>Role: {{ user.role }}</div>
        </div>
        <div v-else>
          <q-spinner size="sm" /> Loading user info...
        </div>
      </q-card-section>
    </q-card>

    <!-- Statistics -->
    <div class="row q-col-gutter-md q-mt-md">
      <div class="col-12 col-md-4">
        <StatsCard title="Total Users" :value="stats?.totalUsers" />
      </div>
      <div class="col-12 col-md-4">
        <StatsCard title="Total Restaurants" :value="stats?.totalRestaurants" />
      </div>
      <div class="col-12 col-md-4">
        <StatsCard title="Total Orders" :value="stats?.totalOrders" />
      </div>
    </div>

    <!-- Quick Links -->
    <div class="row q-col-gutter-md q-mt-lg">
      <div class="col-12 col-md-6 col-lg-4" v-for="link in quickLinks" :key="link.label">
        <q-card class="q-pa-md cursor-pointer" @click="goTo(link.to)">
          <q-card-section>
            <div class="text-h6">{{ link.label }}</div>
            <q-icon :name="link.icon" size="md" color="primary" />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Analytics Placeholder -->
    <q-card class="q-pa-md q-mt-lg">
      <q-card-section>
        <div class="text-h6">Analytics Overview</div>
        <div class="text-subtitle2 text-grey">Charts and reports will appear here.</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { computed, onMounted } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"
import StatsCard from "../components/StatsCard.vue"

export default {
  name: "AdminDashboard",
  components: { StatsCard },
  setup() {
    const store = useStore()
    const router = useRouter()

    const user = computed(() => store.getters["auth/getUser"])
    const stats = computed(() => store.getters["admin/stats"])

    onMounted(() => {
      store.dispatch("admin/fetchStats")
    })

    const goTo = (path) => {
      router.push(path)
    }

    const quickLinks = [
      { label: "Manage Users", to: "/admin/users", icon: "people" },
      { label: "Manage Merchants", to: "/admin/merchants", icon: "store" },
      { label: "Manage Listings", to: "/admin/listings", icon: "list" },
      { label: "View Bookings", to: "/admin/bookings", icon: "event" },
      { label: "Payments", to: "/admin/payments", icon: "payment" },
      { label: "Analytics", to: "/admin/analytics", icon: "bar_chart" },
    ]

    return {
      user,
      stats,
      goTo,
      quickLinks,
    }
  },
}
</script>
