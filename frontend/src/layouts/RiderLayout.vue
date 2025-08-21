<template>
  <div>
    <!-- Rider Layout Header -->
    <header>
      <h2>Rider Panel</h2>
      <nav>
        <router-link to="/rider">Dashboard</router-link> |
        <router-link to="/rider/deliveries">Deliveries</router-link> |
        <router-link to="/rider/navigation">Navigation</router-link> |
        <router-link to="/rider/earnings">Earnings</router-link>
      </nav>
    </header>

    <!-- Rider specific pages render here -->
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "RiderLayout"
}
</script>
