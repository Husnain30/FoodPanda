<template>
  <div>
    <!-- Example Customer Layout -->
    <header>
      <h2>Customer Panel</h2>
      <!-- Navbar / Links -->
      <nav>
        <router-link to="/restaurants">Browse</router-link> |
        <router-link to="/cart">Cart</router-link> |
        <router-link to="/orders">Orders</router-link>
      </nav>
    </header>

    <main>
      <router-view /> <!-- customer pages render here -->
    </main>
  </div>
</template>

<script>
export default {
  name: "CustomerLayout"
}
</script>
