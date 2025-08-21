<!-- src/layouts/AdminLayout.vue -->
<template>
  <div class="admin-layout">
    <!-- Example: Admin Sidebar / Header -->
    <header class="admin-header">
      <h2>Admin Panel</h2>
      <nav>
        <router-link to="/admin/dashboard">Dashboard</router-link> |
        <router-link to="/admin/users">Users</router-link> |
        <router-link to="/admin/restaurants">Restaurants</router-link> |
        <router-link to="/admin/riders">Riders</router-link> |
        <router-link to="/admin/orders">Orders</router-link> |
        <router-link to="/admin/payments">Payments</router-link>
      </nav>
    </header>

    <!-- Yahan child route render hoga -->
    <main class="admin-content">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "AdminLayout",
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.admin-header {
  background: #333;
  color: white;
  padding: 1rem;
}

.admin-header nav a {
  color: white;
  margin-right: 10px;
  text-decoration: none;
}

.admin-content {
  flex: 1;
  padding: 1rem;
}
</style>
