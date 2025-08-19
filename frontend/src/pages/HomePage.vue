<template>
  <q-page class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="title-line">Craving something</span>
          <span class="title-line accent-text">delicious?</span>
        </h1>
        <p class="hero-subtitle">Get food delivered from your favorite restaurants in minutes</p>
        
        <div class="search-container">
          <q-input
            filled
            v-model="search"
            placeholder="What are you craving today?"
            class="search-input"
            @keyup.enter="performSearch"
          >
            <template v-slot:append>
              <q-icon name="search" class="cursor-pointer" @click="performSearch" />
            </template>
          </q-input>
          <q-btn 
            color="primary" 
            label="Find Food" 
            class="search-btn" 
            @click="performSearch"
          />
        </div>
        
        <div class="popular-searches">
          <span>Popular: </span>
          <q-btn 
            v-for="(item, index) in popularSearches" 
            :key="index"
            flat 
            dense 
            :label="item" 
            class="popular-tag"
            @click="search = item; performSearch()"
          />
        </div>
      </div>
      
      <div class="hero-image">
        <img src="https://cdn.quasar.dev/img/food-delivery.svg" alt="Food Delivery" class="floating-image">
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="how-it-works">
      <div class="container">
        <h2 class="section-title">How It Works</h2>
        <div class="steps-container">
          <div v-for="(step, index) in howItWorks" :key="index" class="step-card">
            <div class="step-number">{{ index + 1 }}</div>
            <q-icon :name="step.icon" class="step-icon" />
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Restaurants -->
    <section class="featured-restaurants">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Featured Restaurants</h2>
          <q-btn flat label="View All" color="primary" to="/restaurants" />
        </div>
        
        <div class="restaurants-grid">
          <div v-for="restaurant in featuredRestaurants" :key="restaurant.id" class="restaurant-card">
            <div class="restaurant-image">
              <img :src="restaurant.image" :alt="restaurant.name" />
              <div class="rating-badge">
                <q-icon name="star" />
                <span>{{ restaurant.rating }}</span>
              </div>
              <div class="delivery-time">{{ restaurant.deliveryTime }}</div>
            </div>
            <div class="restaurant-details">
              <h3>{{ restaurant.name }}</h3>
              <p class="cuisine">{{ restaurant.cuisine }}</p>
              <div class="restaurant-meta">
                <span class="delivery-fee">{{ restaurant.deliveryFee }}</span>
                <span class="min-order">{{ restaurant.minOrder }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Categories -->
    <section class="categories-section">
      <div class="container">
        <h2 class="section-title">Popular Categories</h2>
        <div class="categories-grid">
          <div v-for="(category, index) in categories" :key="index" class="category-card">
            <div class="category-icon" :style="{ backgroundColor: category.color }">
              <q-icon :name="category.icon" />
            </div>
            <h3>{{ category.name }}</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- App Download CTA -->
    <section class="app-download">
      <div class="container">
        <div class="app-content">
          <div class="app-text">
            <h2>Get the app</h2>
            <p>Order food from your favorite restaurants with just a few taps</p>
            <div class="download-buttons">
              <q-btn unelevated color="dark" icon="mdi-apple" label="App Store" />
              <q-btn unelevated color="dark" icon="mdi-google-play" label="Google Play" />
            </div>
          </div>
          <div class="app-image">
            <img src="https://cdn.quasar.dev/img/app-prview.png" alt="Mobile App" />
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const search = ref('');

const popularSearches = ['Pizza', 'Burger', 'Sushi', 'Chinese', 'Indian', 'Thai'];

const howItWorks = [
  {
    icon: 'location_on',
    title: 'Choose location',
    description: 'Enter your address or use your current location'
  },
  {
    icon: 'restaurant',
    title: 'Select food',
    description: 'Browse hundreds of restaurants and menus'
  },
  {
    icon: 'payments',
    title: 'Pay online',
    description: 'Secure payment with credit card or cash on delivery'
  },
  {
    icon: 'delivery_dining',
    title: 'Enjoy food',
    description: 'Food is prepared and delivered to your doorstep'
  }
];

const featuredRestaurants = [
  {
    id: 1,
    name: 'Pizza Paradise',
    cuisine: 'Italian, Pizza',
    rating: 4.7,
    deliveryTime: '25-35 min',
    deliveryFee: '$2.99 delivery',
    minOrder: '$15 min',
    image: 'https://cdn.quasar.dev/img/restaurant-pizza.jpg'
  },
  {
    id: 2,
    name: 'Burger Kingdom',
    cuisine: 'American, Fast Food',
    rating: 4.5,
    deliveryTime: '20-30 min',
    deliveryFee: '$1.99 delivery',
    minOrder: '$10 min',
    image: 'https://cdn.quasar.dev/img/restaurant-burger.jpg'
  },
  {
    id: 3,
    name: 'Sushi Sensei',
    cuisine: 'Japanese, Sushi',
    rating: 4.8,
    deliveryTime: '30-40 min',
    deliveryFee: '$3.99 delivery',
    minOrder: '$20 min',
    image: 'https://cdn.quasar.dev/img/restaurant-sushi.jpg'
  },
  {
    id: 4,
    name: 'Curry House',
    cuisine: 'Indian, Curry',
    rating: 4.6,
    deliveryTime: '35-45 min',
    deliveryFee: '$2.49 delivery',
    minOrder: '$12 min',
    image: 'https://cdn.quasar.dev/img/restaurant-curry.jpg'
  }
];

const categories = [
  { name: 'Pizza', icon: 'mdi-pizza', color: '#FF6B6B' },
  { name: 'Burgers', icon: 'mdi-hamburger', color: '#F9A826' },
  { name: 'Sushi', icon: 'mdi-sushi', color: '#06D6A0' },
  { name: 'Chinese', icon: 'mdi-noodles', color: '#118AB2' },
  { name: 'Mexican', icon: 'mdi-taco', color: '#9A6EE0' },
  { name: 'Desserts', icon: 'mdi-cupcake', color: '#EF476F' }
];

const performSearch = () => {
  if (search.value.trim()) {
    $q.notify({
      message: `Searching for: ${search.value}`,
      color: 'positive',
      icon: 'search'
    });
    // In a real app, you would navigate to search results
  }
};
</script>

<style scoped>
.home-page {
  padding: 0;
}

/* Hero Section */
.hero-section {
  display: flex;
  align-items: center;
  min-height: 80vh;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%);
}

.hero-content {
  flex: 1;
  max-width: 600px;
  z-index: 1;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.title-line {
  display: block;
}

.accent-text {
  color: #ff0080;
  background: linear-gradient(45deg, #ff0080, #7928ca);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #5a5a5a;
  margin-bottom: 2rem;
}

.search-container {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.search-input {
  flex: 1;
}

.search-btn {
  padding: 0 2rem;
}

.popular-searches {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.popular-tag {
  color: #666;
  font-size: 0.9rem;
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.floating-image {
  max-width: 100%;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

/* How It Works */
.how-it-works {
  padding: 5rem 2rem;
  background-color: #fff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(45deg, #ff0080, #7928ca);
  border-radius: 2px;
}

.steps-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.step-card {
  text-align: center;
  padding: 2rem;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
}

.step-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
}

.step-number {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, #ff0080, #7928ca);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
}

.step-icon {
  font-size: 3rem;
  color: #ff0080;
  margin-bottom: 1rem;
}

.step-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.step-card p {
  color: #666;
  line-height: 1.6;
}

/* Featured Restaurants */
.featured-restaurants {
  padding: 5rem 2rem;
  background-color: #f8f9fa;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.restaurants-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.restaurant-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.restaurant-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
}

.restaurant-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.restaurant-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.restaurant-card:hover .restaurant-image img {
  transform: scale(1.05);
}

.rating-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.9rem;
}

.delivery-time {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.restaurant-details {
  padding: 1.5rem;
}

.restaurant-details h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
}

.cuisine {
  color: #666;
  margin: 0 0 1rem 0;
}

.restaurant-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #888;
}

/* Categories */
.categories-section {
  padding: 5rem 2rem;
  background-color: #fff;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 2rem;
}

.category-card {
  text-align: center;
  padding: 1.5rem 1rem;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
}

.category-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 2rem;
  color: white;
}

.category-card h3 {
  font-size: 1.1rem;
  margin: 0;
  color: #333;
}

/* App Download */
.app-download {
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #ff0080 0%, #7928ca 100%);
  color: white;
}

.app-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1000px;
  margin: 0 auto;
}

.app-text h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.app-text p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.download-buttons {
  display: flex;
  gap: 1rem;
}

.app-image {
  max-width: 300px;
}

.app-image img {
  width: 100%;
  animation: pulse 2s ease-in-out infinite alternate;
}

@keyframes pulse {
  0% { transform: scale(1); }
  100% { transform: scale(1.05); }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .hero-title {
    font-size: 2.8rem;
  }
}

@media (max-width: 768px) {
  .hero-section {
    flex-direction: column;
    text-align: center;
    padding: 2rem 1rem;
  }
  
  .hero-title {
    font-size: 2.2rem;
  }
  
  .search-container {
    flex-direction: column;
  }
  
  .app-content {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
  
  .download-buttons {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.8rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .steps-container {
    grid-template-columns: 1fr;
  }
  
  .restaurants-grid {
    grid-template-columns: 1fr;
  }
  
  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>