<template>
  <q-page padding>
    <h1 class="page-title">🍽 Browse Restaurants</h1>
    <div class="restaurant-grid">
      <RestaurantCard
        v-for="n in 6"
        :key="n"
        :name="'Restaurant ' + n"
        :cuisine="'Italian, Fast Food'"
        :rating="(4 + Math.random()).toFixed(1)"
      />
    </div>
  </q-page>
</template>

<script>
import RestaurantCard from "../components/RestaurantCard.vue";
export default {
  components: { RestaurantCard },
};
</script>

<style scoped>
.page-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}
.restaurant-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}
</style>