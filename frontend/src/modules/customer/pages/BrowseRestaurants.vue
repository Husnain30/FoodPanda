<template>
  <q-page class="browse-page q-pa-md">
    <!-- Hero Section -->
    <section class="hero q-mb-lg">
      <div class="hero-content text-center">
        <h1 class="text-h4 q-mb-sm">Find Your Favorite Food</h1>
        <p class="text-subtitle2">Browse restaurants and order easily</p>
      </div>
    </section>

    <!-- Restaurant Listing -->
    <div class="row q-col-gutter-md">
      <div
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        class="col-12 col-sm-6 col-md-4"
      >
        <RestaurantCard :restaurant="restaurant" />
      </div>
    </div>

    <!-- Loader -->
    <div v-if="loading" class="text-center q-mt-lg">
      <q-spinner color="primary" size="40px" />
      <p>Loading restaurants...</p>
    </div>

    <!-- Error -->
    <div v-if="error" class="text-negative text-center q-mt-lg">
      {{ error }}
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import RestaurantCard from "../components/RestaurantCard.vue";

export default {
  name: "BrowseRestaurants",
  components: { RestaurantCard },
  computed: {
    ...mapState("customer", ["restaurants", "loading", "error"]),
  },
  created() {
    this.fetchRestaurants();
  },
  methods: {
    ...mapActions("customer", ["fetchRestaurants"]),
  },
};
</script>

<style scoped>
.hero {
  background: url("https://source.unsplash.com/1600x400/?food,restaurant")
    center/cover no-repeat;
  color: white;
  padding: 40px 20px;
  border-radius: 12px;
}
.hero-content {
  background: rgba(0, 0, 0, 0.4);
  padding: 20px;
  border-radius: 8px;
}
</style>




