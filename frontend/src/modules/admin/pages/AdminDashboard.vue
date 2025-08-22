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

    <!-- Quick Links -->
    <div class="row q-col-gutter-md q-mt-lg">
      <div
        class="col-12 col-md-6 col-lg-4"
        v-for="link in quickLinks"
        :key="link.label"
      >
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
        <div class="text-subtitle2 text-grey">
          Charts and reports will appear here.
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { computed } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"

export default {
  name: "AdminDashboard",
  setup() {
    const store = useStore()
    const router = useRouter()

    const user = computed(() => store.getters["auth/getUser"])

    const goTo = (path) => {
      router.push(path)
    }

    const quickLinks = [
      { label: "Manage Users", to: "/admin/users", icon: "people" },
      { label: "Manage Restaurants", to: "/admin/restaurants", icon: "store" },
      { label: "Manage Riders", to: "/admin/riders", icon: "directions_bike" },
      { label: "View Orders", to: "/admin/orders", icon: "shopping_cart" },
      { label: "Payments", to: "/admin/payments", icon: "payment" },
    ]

    return {
      user,
      goTo,
      quickLinks,
    }
  },
}
</script>
