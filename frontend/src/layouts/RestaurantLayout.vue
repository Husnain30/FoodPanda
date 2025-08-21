<!-- src/layouts/RestaurantLayout.vue -->
<template>
  <div class="restaurant-layout">
    <header class="restaurant-header">
      <h2>🍽️ Restaurant Panel</h2>
      <nav>
        <router-link to="/restaurant/dashboard">Dashboard</router-link> |
        <router-link to="/restaurant/menu">Menu</router-link> |
        <router-link to="/restaurant/orders">Orders</router-link> |
        <router-link to="/restaurant/earnings">Earnings</router-link> |
        <router-link to="/restaurant/promotions">Promotions</router-link>
      </nav>
    </header>

    <main class="restaurant-content">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "RestaurantLayout"
}
</script>

<style scoped>
.restaurant-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.restaurant-header {
  background: #444;
  color: white;
  padding: 1rem;
}

.restaurant-header nav a {
  color: white;
  margin-right: 10px;
  text-decoration: none;
}

.restaurant-content {
  flex: 1;
  padding: 1rem;
}
</style>
