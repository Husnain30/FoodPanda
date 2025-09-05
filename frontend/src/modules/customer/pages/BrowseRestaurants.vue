<template>
  <q-page class="browse-page q-pa-md">
    <!-- Hero Section -->
    <section class="hero q-mb-lg">
      <div class="hero-content text-center">
        <h1 class="text-h4 q-mb-sm">🍴 Find Your Favorite Food</h1>
        <p class="text-subtitle2">Discover the best restaurants, dishes, and cuisines</p>
      </div>
    </section>

    <!-- Cuisines Section -->
    <section class="q-mb-xl">
      <h2 class="text-h6 q-mb-md">🌍 Popular Cuisines</h2>
      <div class="row q-col-gutter-md">
        <div
          v-for="cuisine in cuisines"
          :key="cuisine.id"
          class="col-6 col-sm-4 col-md-3"
        >
          <q-card class="cuisine-card shadow-3">
            <q-img :src="cuisine.image" :alt="cuisine.name" height="120px" />
            <q-card-section>
              <div class="text-subtitle1 text-center">{{ cuisine.name }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </section>

    <!-- Popular Dishes -->
    <section class="q-mb-xl">
      <h2 class="text-h6 q-mb-md">🍲 Popular Dishes</h2>
      <div class="row q-col-gutter-md">
        <div
          v-for="dish in featuredDishes"
          :key="dish.id"
          class="col-6 col-sm-4 col-md-3"
        >
          <q-card class="dish-card shadow-3">
            <q-img :src="dish.image" :alt="dish.name" height="140px" />
            <q-card-section>
              <div class="text-subtitle1">{{ dish.name }}</div>
              <div class="text-caption text-grey">{{ dish.restaurant }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </section>

    <!-- Top Burgers -->
    <section class="q-mb-xl">
      <h2 class="text-h6 q-mb-md">🍔 Top Burgers</h2>
      <div class="row q-col-gutter-md">
        <div
          v-for="burger in topBurgers"
          :key="burger.id"
          class="col-6 col-sm-4 col-md-3"
        >
          <q-card class="dish-card shadow-3">
            <q-img :src="burger.image" :alt="burger.name" height="140px" />
            <q-card-section>
              <div class="text-subtitle1">{{ burger.name }}</div>
              <div class="text-caption text-grey">{{ burger.restaurant }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </section>

    <!-- Top Pizzas -->
    <section class="q-mb-xl">
      <h2 class="text-h6 q-mb-md">🍕 Top Pizzas</h2>
      <div class="row q-col-gutter-md">
        <div
          v-for="pizza in topPizzas"
          :key="pizza.id"
          class="col-6 col-sm-4 col-md-3"
        >
          <q-card class="dish-card shadow-3">
            <q-img :src="pizza.image" :alt="pizza.name" height="140px" />
            <q-card-section>
              <div class="text-subtitle1">{{ pizza.name }}</div>
              <div class="text-caption text-grey">{{ pizza.restaurant }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </section>

    <!-- Restaurant Listing -->
    <section>
      <h2 class="text-h6 q-mb-md">🏨 Restaurants Near You</h2>
      <div class="row q-col-gutter-md">
        <div
          v-for="restaurant in restaurants"
          :key="restaurant.id"
          class="col-12 col-sm-6 col-md-4"
        >
          <RestaurantCard :restaurant="restaurant" />
        </div>
      </div>
    </section>

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
  data() {
    return {
      cuisines: [
        { id: 1, name: "Italian", image: "images/italian.jpg" },
        { id: 2, name: "Chinese", image: "images/chinease.jpg" },
        { id: 3, name: "Pakistani", image: "images/indian.jpg" },
        { id: 4, name: "Mexican", image: "images/mexican.jpg" },
      ],
      featuredDishes: [
        { id: 1, name: "Margherita Pizza", restaurant: "Italiano's", image: "images/italian.jpg" },
        { id: 2, name: "Classic Burger", restaurant: "Burger Hub", image: "images/italian.jpg" },
        { id: 3, name: "Sushi Platter", restaurant: "Tokyo Bites", image: "images/italian.jpg" },
        { id: 4, name: "Biryani", restaurant: "Desi Spice", image: "images/italian.jpg" },
      ],
      topBurgers: [
        { id: 1, name: "Cheese Burger", restaurant: "Burger King", image: "images/italian.jpg" },
        { id: 2, name: "Double Patty Burger", restaurant: "Smash House", image: "images/italian.jpg" },
        { id: 3, name: "Chicken Burger", restaurant: "Foodies", image: "images/italian.jpg" },
      ],
      topPizzas: [
        { id: 1, name: "Pepperoni Pizza", restaurant: "Pizza Hut", image: "images/italian.jpg" },
        { id: 2, name: "BBQ Chicken Pizza", restaurant: "Dominos", image: "images/italian.jpg" },
        { id: 3, name: "Veggie Pizza", restaurant: "Oven Fresh", image: "images/italian.jpg" },
      ],
    };
  },
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
/* Hero Section */
.hero {
  background: url("images/foodpic.jpg")
    center/cover no-repeat;
  color: white;
 
  border-radius: 16px;
}
.hero-content {
  background: rgba(0, 0, 0, 0.55);
  padding: 30px;
  border-radius: 12px;
}

/* Cuisine Cards */
.cuisine-card {
  transition: transform 0.3s, box-shadow 0.3s;
  border-radius: 12px;
  cursor: pointer;
}
.cuisine-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.2);
}

/* Dish/Burger/Pizza Cards */
.dish-card {
  transition: transform 0.3s, box-shadow 0.3s;
  border-radius: 12px;
}
.dish-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.2);
}

h2 {
  font-weight: bold;
}
</style>






