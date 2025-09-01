<template>
  <q-card class="restaurant-card cursor-pointer" @click="goToMenu">
    <q-img
      :src="restaurant.image || 'https://source.unsplash.com/400x200/?restaurant,food'"
      height="200px"
      class="restaurant-img"
    />
    <q-card-section>
      <div class="text-h6">{{ restaurant.name }}</div>
      <div class="text-caption text-grey">
        {{ restaurant.location || "Unknown location" }}
      </div>
    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <q-btn flat color="primary" label="View Menu" @click.stop="goToMenu" />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "RestaurantCard",
  props: {
    restaurant: { type: Object, required: true },
  },
  methods: {
    goToMenu() {
      // ✅ Correct endpoint -> matches route: /restaurants/:id/menu
      this.$router.push(`/restaurants/${this.restaurant.id}/menu`);
    },
  },
};
</script>

<style scoped>
.restaurant-card {
  transition: transform 0.2s ease-in-out;
}
.restaurant-card:hover {
  transform: scale(1.03);
}
.restaurant-img {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
</style>



