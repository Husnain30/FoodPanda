<template>
  <q-page class="home-page">
    <!-- Hero Section -->
    <section class="hero-section text-white text-center">
      <div class="hero-content q-pa-xl animate-fade">
        <h1 class="text-h2 text-bold q-mb-md animate-slide">
          Craving something delicious?
        </h1>
        <p class="text-h6 q-mb-xl animate-fade-delay">
          Get food delivered right to your door from your favorite restaurants
        </p>

        <!-- Search -->
        <div class="search-container q-mb-xl">
          <q-input
            v-model="search"
            placeholder="Enter your delivery address"
            rounded
            outlined
            bg-color="white"
            class="search-input"
          >
            <template v-slot:append>
              <q-btn round color="primary" icon="search" @click="findFood" />
            </template>
          </q-input>
        </div>

        <!-- Stats -->
        <div class="hero-stats row justify-center items-center q-gutter-xl">
          <div class="stat-item animate-zoom">
            <div class="text-h3 text-bold">500+</div>
            <div class="text-subtitle1">Restaurants</div>
          </div>
          <div class="stat-item animate-zoom">
            <div class="text-h3 text-bold">10K+</div>
            <div class="text-subtitle1">Happy Customers</div>
          </div>
          <div class="stat-item animate-zoom">
            <div class="text-h3 text-bold">24/7</div>
            <div class="text-subtitle1">Delivery Service</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Restaurants -->
    <section class="featured-section q-pa-xl">
      <div class="container">
        <h2 class="text-h4 text-bold text-center q-mb-lg">Featured Restaurants</h2>

        <div class="restaurant-grid q-mt-lg">
          <q-card
            v-for="restaurant in featuredRestaurants"
            :key="restaurant.id"
            class="restaurant-card animate-fade-up"
          >
            <q-img :src="restaurant.image" :alt="restaurant.name" height="200px" />

            <q-card-section>
              <div class="text-h6">{{ restaurant.name }}</div>
              <div class="text-caption text-grey">{{ restaurant.cuisine }}</div>
              <q-rating v-model="restaurant.rating" size="sm" readonly />
              <div class="text-caption">
                • {{ restaurant.deliveryTime }} min • {{ restaurant.distance }} km
              </div>
            </q-card-section>

            <q-card-actions>
              <q-btn color="primary" label="Order Now" class="full-width" />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="how-it-works-section q-pa-xl bg-grey-2">
      <div class="container">
        <h2 class="text-h4 text-bold text-center q-mb-xl">How It Works</h2>

        <div class="steps row justify-between">
          <div class="step col-12 col-md-3 text-center animate-fade-up">
            <q-icon name="place" size="xl" color="primary" class="step-icon" />
            <h3 class="text-h6 q-mt-md">1. Choose location</h3>
            <p class="text-body1">Enter your address or use your current location</p>
          </div>

          <div class="step col-12 col-md-3 text-center animate-fade-up">
            <q-icon name="restaurant_menu" size="xl" color="primary" class="step-icon" />
            <h3 class="text-h6 q-mt-md">2. Select food</h3>
            <p class="text-body1">Browse hundreds of restaurants and menus</p>
          </div>

          <div class="step col-12 col-md-3 text-center animate-fade-up">
            <q-icon name="delivery_dining" size="xl" color="primary" class="step-icon" />
            <h3 class="text-h6 q-mt-md">3. Delivery</h3>
            <p class="text-body1">Get your food delivered right to your door</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Download App -->
    <section class="download-section q-pa-xl text-center">
      <div class="container animate-fade">
        <h2 class="text-h4 text-bold q-mb-md">Download Our App</h2>
        <p class="text-h6 q-mb-xl">Get the best experience with our mobile app</p>

        <div class="download-buttons q-gutter-md">
          <q-btn color="black" icon="android" label="Google Play" size="lg" />
          <q-btn color="black" icon="apple" label="App Store" size="lg" />
        </div>
      </div>
    </section>
  </q-page>
</template>

<script>
import { ref } from "vue";

export default {
  name: "HomePage",
  setup() {
    const search = ref("");

    const featuredRestaurants = ref([
      {
        id: 1,
        name: "Burger Palace",
        cuisine: "American • Burgers",
        rating: 4.5,
        deliveryTime: 25,
        distance: 1.2,
        image:
          "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=500&q=60",
      },
      {
        id: 2,
        name: "Pizza Heaven",
        cuisine: "Italian • Pizza",
        rating: 4.7,
        deliveryTime: 30,
        distance: 2.1,
        image:
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=60",
      },
      {
        id: 3,
        name: "Sushi Master",
        cuisine: "Japanese • Sushi",
        rating: 4.8,
        deliveryTime: 35,
        distance: 3.5,
        image:
          "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=500&q=60",
      },
      {
        id: 4,
        name: "Curry House",
        cuisine: "Indian • Curry",
        rating: 4.6,
        deliveryTime: 40,
        distance: 1.8,
        image:
          "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=500&q=60",
      },
    ]);

    const findFood = () => {
      if (search.value) {
        console.log("Searching for:", search.value);
      }
    };

    return {
      search,
      featuredRestaurants,
      findFood,
    };
  },
};
</script>

<style scoped>
.home-page {
  padding: 0;
}

/* Modern Gradient */
.hero-section {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  padding-top: 100px;
  padding-bottom: 100px;
  overflow: hidden;
}
.search-container {
  max-width: 600px;
  margin: 0 auto;
}

.search-input {
  font-size: 1.1rem;
}

.hero-stats {
  margin-top: 60px;
}

.stat-item {
  padding: 20px;
  transition: transform 0.3s ease;
}
.stat-item:hover {
  transform: scale(1.1);
}

.featured-section {
  background: white;
}

.restaurant-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.restaurant-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}
.restaurant-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.how-it-works-section {
  padding: 80px 0;
}

.step-icon {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 50%;
}

.download-section {
  background: linear-gradient(135deg, #2a5298 0%, #1e3c72 100%);
  color: white;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes zoomIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-fade {
  animation: fadeIn 1s ease forwards;
}
.animate-fade-delay {
  animation: fadeIn 1.2s ease forwards;
}
.animate-slide {
  animation: slideIn 1s ease forwards;
}
.animate-zoom {
  animation: zoomIn 1.2s ease forwards;
}
.animate-fade-up {
  animation: fadeIn 1.3s ease forwards;
}

@media (max-width: 768px) {
  .hero-content {
    padding: 40px 20px;
  }

  .steps {
    flex-direction: column;
    gap: 40px;
  }
}
</style>
