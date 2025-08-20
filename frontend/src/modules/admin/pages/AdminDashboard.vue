<template>
  <q-page class="q-pa-md">
    <h1>Admin Dashboard</h1>

    <q-card class="q-ma-md">
      <q-card-section>
        <div class="text-h6">Statistics</div>
        <p>Total Users: {{ stats.totalUsers }}</p>
        <p>Total Restaurants: {{ stats.totalRestaurants }}</p>
        <p>Total Orders: {{ stats.totalOrders }}</p>
      </q-card-section>
    </q-card>

    <q-card class="q-ma-md" v-if="users.length">
      <q-card-section>
        <div class="text-h6">Users</div>
        <ul>
          <li v-for="u in users" :key="u.id">{{ u.name }} - {{ u.email }}</li>
        </ul>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AdminDashboard",
  computed: {
    ...mapGetters("admin", ["stats", "users"]),
  },
  methods: {
    ...mapActions("admin", ["fetchStats", "fetchUsers"]),
  },
  mounted() {
    this.fetchStats();
    this.fetchUsers();
  },
};
</script>
