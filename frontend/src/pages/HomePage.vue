<template>
  <q-page class="home-page">
    <!-- Hero Section with Particles -->
    <section class="hero-section text-white text-center relative-position">
      <div class="hero-particles"></div>
      <div class="hero-content q-pa-xl animate-fade">
        <div class="hero-badge animate-bounce q-mb-md">
          <q-chip color="orange" text-color="white" icon="local_offer">
            🔥 Free delivery on orders over $25
          </q-chip>
        </div>
        
        <h1 class="text-h1 text-bold q-mb-md animate-slide hero-title">
          Craving something <span class="text-gradient">delicious</span>?
        </h1>
        <p class="text-h5 q-mb-xl animate-fade-delay hero-subtitle">
          Get food delivered right to your door from your favorite restaurants
        </p>

        <!-- Enhanced Search -->
        <div class="search-container q-mb-xl">
          <div class="search-wrapper">
            <q-input
              v-model="search"
              placeholder="Enter your delivery address..."
              rounded
              outlined
              bg-color="white"
              class="search-input"
            >
              <template v-slot:prepend>
                <q-icon name="place" color="primary" />
              </template>
              <template v-slot:append>
                <q-btn 
                  round 
                  color="primary" 
                  icon="search" 
                  @click="findFood" 
                  class="search-btn"
                />
              </template>
            </q-input>
          </div>
        </div>

        <!-- Enhanced Stats with Icons -->
        <div class="hero-stats row justify-center items-center q-gutter-xl">
          <div class="stat-item animate-zoom" v-for="(stat, index) in heroStats" :key="index">
            <q-icon :name="stat.icon" size="xl" class="stat-icon q-mb-sm" />
            <div class="text-h3 text-bold counter" :data-target="stat.number">{{ stat.displayNumber }}</div>
            <div class="text-subtitle1">{{ stat.label }}</div>
          </div>
        </div>
      </div>
      
      <!-- Floating Elements -->
      <div class="floating-elements">
        <div class="floating-food pizza"></div>
        <div class="floating-food burger"></div>
        <div class="floating-food sushi"></div>
      </div>
    </section>

    <!-- Popular Categories -->
    <section class="categories-section q-pa-xl">
      <div class="container">
        <div class="section-header text-center q-mb-xl">
          <h2 class="text-h3 text-bold">Popular Categories</h2>
          <p class="text-h6 text-grey-7">What are you in the mood for?</p>
        </div>

        <div class="categories-grid">
          <div 
            v-for="category in categories" 
            :key="category.id"
            class="category-card animate-fade-up"
            @click="selectCategory(category)"
          >
            <div class="category-icon">
              {{ category.emoji }}
            </div>
            <h3 class="text-h6 text-bold q-mt-sm">{{ category.name }}</h3>
            <p class="text-caption text-grey-7">{{ category.count }} restaurants</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Restaurants -->
    <section class="featured-section q-pa-xl">
      <div class="container">
        <div class="section-header text-center q-mb-xl">
          <h2 class="text-h3 text-bold">Featured Restaurants</h2>
          <p class="text-h6 text-grey-7">Handpicked favorites just for you</p>
        </div>

        <div class="restaurant-grid q-mt-lg">
          <q-card
            v-for="restaurant in featuredRestaurants"
            :key="restaurant.id"
            class="restaurant-card animate-fade-up"
            @click="viewRestaurant(restaurant)"
          >
            <div class="card-image-wrapper">
              <q-img 
                :src="restaurant.image" 
                :alt="restaurant.name" 
                height="220px"
                class="restaurant-image"
              />
              <div class="image-overlay">
                <q-btn 
                  round 
                  color="white" 
                  text-color="primary" 
                  icon="favorite_border"
                  class="favorite-btn"
                />
                <q-chip 
                  v-if="restaurant.isNew" 
                  color="orange" 
                  text-color="white"
                  class="new-badge"
                >
                  NEW
                </q-chip>
                <q-chip 
                  v-if="restaurant.discount" 
                  color="red" 
                  text-color="white"
                  class="discount-badge"
                >
                  {{ restaurant.discount }}% OFF
                </q-chip>
              </div>
            </div>

            <q-card-section class="card-content">
              <div class="restaurant-header">
                <h3 class="text-h6 text-bold">{{ restaurant.name }}</h3>
                <q-badge 
                  :color="restaurant.status === 'open' ? 'green' : 'red'" 
                  :label="restaurant.status"
                  class="status-badge"
                />
              </div>
              
              <p class="text-body2 text-grey-7 q-mb-sm">{{ restaurant.cuisine }}</p>
              
              <div class="restaurant-meta row items-center justify-between q-mb-sm">
                <div class="rating-section">
                  <q-rating v-model="restaurant.rating" size="sm" readonly color="orange" />
                  <span class="text-caption q-ml-sm">({{ restaurant.reviews }})</span>
                </div>
                <div class="delivery-info text-caption text-grey-6">
                  <q-icon name="access_time" size="xs" class="q-mr-xs" />
                  {{ restaurant.deliveryTime }} min • {{ restaurant.distance }} km
                </div>
              </div>

              <div class="price-range text-caption text-grey-6 q-mb-md">
                <span v-for="n in restaurant.priceRange" :key="n" class="price-dot">$</span>
                <span class="q-ml-sm">• Min order ${{ restaurant.minOrder }}</span>
              </div>
            </q-card-section>

            <q-card-actions class="card-actions">
              <q-btn 
                color="primary" 
                label="Order Now" 
                class="full-width order-btn"
                no-caps
              />
            </q-card-actions>
          </q-card>
        </div>

        <!-- Load More Button -->
        <div class="text-center q-mt-xl">
          <q-btn 
            outline 
            color="primary" 
            label="View All Restaurants" 
            size="lg"
            class="load-more-btn"
          />
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="how-it-works-section q-pa-xl">
      <div class="container">
        <div class="section-header text-center q-mb-xl">
          <h2 class="text-h3 text-bold">How It Works</h2>
          <p class="text-h6 text-grey-7">Get your favorite food in 3 simple steps</p>
        </div>

        <div class="steps-container">
          <div class="steps-line"></div>
          <div 
            v-for="(step, index) in howItWorksSteps" 
            :key="index"
            class="step-item animate-fade-up"
            :style="{ animationDelay: `${index * 0.2}s` }"
          >
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-icon-wrapper">
              <q-icon :name="step.icon" size="3rem" color="primary" class="step-icon" />
            </div>
            <h3 class="text-h5 text-bold q-mt-md">{{ step.title }}</h3>
            <p class="text-body1 text-grey-7">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Special Offers -->
    <section class="offers-section q-pa-xl bg-gradient-2">
      <div class="container">
        <div class="section-header text-center q-mb-xl">
          <h2 class="text-h3 text-bold text-white">Special Offers</h2>
          <p class="text-h6 text-white">Don't miss out on these amazing deals!</p>
        </div>

        <div class="offers-grid">
          <div 
            v-for="offer in specialOffers" 
            :key="offer.id"
            class="offer-card animate-pulse-slow"
          >
            <div class="offer-content">
              <div class="offer-emoji">{{ offer.emoji }}</div>
              <h3 class="text-h5 text-bold text-white q-mb-sm">{{ offer.title }}</h3>
              <p class="text-body1 text-white q-mb-md">{{ offer.description }}</p>
              <q-btn 
                color="white" 
                text-color="primary" 
                :label="offer.buttonText"
                class="offer-btn"
                no-caps
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="testimonials-section q-pa-xl">
      <div class="container">
        <div class="section-header text-center q-mb-xl">
          <h2 class="text-h3 text-bold">What Our Customers Say</h2>
          <p class="text-h6 text-grey-7">Join thousands of happy customers</p>
        </div>

        <div class="testimonials-grid">
          <div 
            v-for="testimonial in testimonials" 
            :key="testimonial.id"
            class="testimonial-card animate-fade-up"
          >
            <div class="testimonial-header">
              <q-avatar size="60px" class="testimonial-avatar">
                <img :src="testimonial.avatar" :alt="testimonial.name" />
              </q-avatar>
              <div class="testimonial-info">
                <h4 class="text-h6 text-bold">{{ testimonial.name }}</h4>
                <p class="text-caption text-grey-6">{{ testimonial.location }}</p>
              </div>
              <q-rating v-model="testimonial.rating" size="sm" readonly color="orange" />
            </div>
            <q-icon name="format_quote" size="lg" color="primary" class="quote-icon" />
            <p class="text-body1 testimonial-text">{{ testimonial.comment }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Download App -->
    <section class="download-section q-pa-xl text-center bg-dark">
      <div class="container animate-fade">
        <div class="download-content">
          <div class="download-text">
            <h2 class="text-h3 text-bold text-white q-mb-md">Download Our App</h2>
            <p class="text-h6 text-white q-mb-xl">Get the best experience with our mobile app</p>
            
            <div class="app-features q-mb-xl">
              <div class="feature-item">
                <q-icon name="flash_on" color="orange" size="sm" />
                <span class="text-white q-ml-sm">Faster ordering</span>
              </div>
              <div class="feature-item">
                <q-icon name="notifications" color="orange" size="sm" />
                <span class="text-white q-ml-sm">Real-time tracking</span>
              </div>
              <div class="feature-item">
                <q-icon name="local_offer" color="orange" size="sm" />
                <span class="text-white q-ml-sm">Exclusive offers</span>
              </div>
            </div>

            <div class="download-buttons">
              <q-btn 
                color="white" 
                text-color="dark"
                icon="android" 
                label="Google Play" 
                size="lg"
                class="download-btn q-mr-md"
                no-caps
              />
              <q-btn 
                color="white" 
                text-color="dark"
                icon="apple" 
                label="App Store" 
                size="lg"
                class="download-btn"
                no-caps
              />
            </div>
          </div>
          
          <div class="download-image">
            <div class="phone-mockup">
              <div class="phone-screen">
                <div class="app-preview"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "HomePage",
  setup() {
    const search = ref("");

    const heroStats = ref([
      { icon: 'restaurant', number: 500, displayNumber: '500+', label: 'Restaurants' },
      { icon: 'group', number: 10000, displayNumber: '10K+', label: 'Happy Customers' },
      { icon: 'schedule', number: 24, displayNumber: '24/7', label: 'Delivery Service' }
    ]);

    const categories = ref([
      { id: 1, name: 'Pizza', emoji: '🍕', count: 45 },
      { id: 2, name: 'Burgers', emoji: '🍔', count: 32 },
      { id: 3, name: 'Sushi', emoji: '🍣', count: 28 },
      { id: 4, name: 'Chinese', emoji: '🥡', count: 56 },
      { id: 5, name: 'Indian', emoji: '🍛', count: 41 },
      { id: 6, name: 'Mexican', emoji: '🌮', count: 38 },
      { id: 7, name: 'Desserts', emoji: '🧁', count: 25 },
      { id: 8, name: 'Coffee', emoji: '☕', count: 33 }
    ]);

    const featuredRestaurants = ref([
      {
        id: 1, name: "Burger Palace", cuisine: "American • Burgers", rating: 4.5, reviews: 234,
        deliveryTime: 25, distance: 1.2, priceRange: 2, minOrder: 15, status: 'open',
        isNew: false, discount: 20,
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=500&q=60"
      },
      {
        id: 2, name: "Pizza Heaven", cuisine: "Italian • Pizza", rating: 4.7, reviews: 189,
        deliveryTime: 30, distance: 2.1, priceRange: 3, minOrder: 20, status: 'open',
        isNew: true, discount: null,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=60"
      },
      {
        id: 3, name: "Sushi Master", cuisine: "Japanese • Sushi", rating: 4.8, reviews: 312,
        deliveryTime: 35, distance: 3.5, priceRange: 3, minOrder: 25, status: 'open',
        isNew: false, discount: 15,
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=500&q=60"
      },
      {
        id: 4, name: "Curry House", cuisine: "Indian • Curry", rating: 4.6, reviews: 156,
        deliveryTime: 40, distance: 1.8, priceRange: 2, minOrder: 18, status: 'closed',
        isNew: false, discount: null,
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=500&q=60"
      },
      {
        id: 5, name: "Taco Fiesta", cuisine: "Mexican • Tacos", rating: 4.4, reviews: 198,
        deliveryTime: 28, distance: 2.3, priceRange: 2, minOrder: 12, status: 'open',
        isNew: true, discount: 25,
        image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=500&q=60"
      },
      {
        id: 6, name: "Pasta Roma", cuisine: "Italian • Pasta", rating: 4.9, reviews: 267,
        deliveryTime: 32, distance: 1.5, priceRange: 3, minOrder: 22, status: 'open',
        isNew: false, discount: null,
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?auto=format&fit=crop&w=500&q=60"
      },
      {
        id: 7, name: "BBQ King", cuisine: "American • BBQ", rating: 4.3, reviews: 143,
        deliveryTime: 45, distance: 4.2, priceRange: 3, minOrder: 30, status: 'open',
        isNew: false, discount: 10,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=60"
      },
      {
        id: 8, name: "Healthy Bowl", cuisine: "Healthy • Salads", rating: 4.7, reviews: 201,
        deliveryTime: 20, distance: 1.1, priceRange: 2, minOrder: 14, status: 'open',
        isNew: true, discount: null,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60"
      },
      {
        id: 9, name: "Dragon Wok", cuisine: "Chinese • Stir Fry", rating: 4.5, reviews: 289,
        deliveryTime: 35, distance: 2.8, priceRange: 2, minOrder: 16, status: 'open',
        isNew: false, discount: 30,
        image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=500&q=60"
      },
      {
        id: 10, name: "Sweet Treats", cuisine: "Desserts • Ice Cream", rating: 4.8, reviews: 176,
        deliveryTime: 15, distance: 0.8, priceRange: 1, minOrder: 10, status: 'open',
        isNew: false, discount: null,
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=60"
      },
      {
        id: 11, name: "Morning Brew", cuisine: "Coffee • Breakfast", rating: 4.6, reviews: 234,
        deliveryTime: 18, distance: 1.3, priceRange: 2, minOrder: 8, status: 'open',
        isNew: true, discount: 20,
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=500&q=60"
      },
      {
        id: 12, name: "Ocean Fresh", cuisine: "Seafood • Fish", rating: 4.9, reviews: 321,
        deliveryTime: 50, distance: 5.1, priceRange: 4, minOrder: 35, status: 'open',
        isNew: false, discount: null,
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=500&q=60"
      }
    ]);

    const howItWorksSteps = ref([
      {
        icon: 'place',
        title: 'Choose Location',
        description: 'Enter your address or use your current location to find nearby restaurants'
      },
      {
        icon: 'restaurant_menu',
        title: 'Select Food',
        description: 'Browse hundreds of restaurants and thousands of menu items to find your favorites'
      },
      {
        icon: 'delivery_dining',
        title: 'Fast Delivery',
        description: 'Get your food delivered right to your door by our trusted delivery partners'
      }
    ]);

    const specialOffers = ref([
      {
        id: 1,
        emoji: '🎉',
        title: 'First Order FREE',
        description: 'Get free delivery on your first order over $20',
        buttonText: 'Claim Now'
      },
      {
        id: 2,
        emoji: '⚡',
        title: 'Flash Sale',
        description: '50% off on selected restaurants. Limited time only!',
        buttonText: 'Shop Now'
      },
      {
        id: 3,
        emoji: '👥',
        title: 'Refer & Earn',
        description: 'Invite friends and get $5 credit for each referral',
        buttonText: 'Invite Now'
      }
    ]);

    const testimonials = ref([
      {
        id: 1,
        name: 'Sarah Johnson',
        location: 'New York',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=1',
        comment: 'Amazing service! Food arrived hot and fresh. The app is so easy to use and the delivery was super quick.'
      },
      {
        id: 2,
        name: 'Mike Chen',
        location: 'San Francisco',
        rating: 5,
        avatar: 'https://i.pravatar.cc/150?img=2',
        comment: 'Best food delivery app! Great variety of restaurants and the tracking feature is fantastic.'
      },
      {
        id: 3,
        name: 'Emily Davis',
        location: 'Los Angeles',
        rating: 4,
        avatar: 'https://i.pravatar.cc/150?img=3',
        comment: 'Love the exclusive deals and the customer service is top-notch. Highly recommend!'
      }
    ]);

    const findFood = () => {
      if (search.value) {
        console.log("Searching for:", search.value);
      }
    };

    const selectCategory = (category) => {
      console.log("Selected category:", category.name);
    };

    const viewRestaurant = (restaurant) => {
      console.log("Viewing restaurant:", restaurant.name);
    };

    onMounted(() => {
      // Add intersection observer for animations
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      }, observerOptions);

      // Observe all animated elements
      document.querySelectorAll('.animate-fade-up, .animate-fade, .animate-zoom').forEach((el) => {
        observer.observe(el);
      });
    });

    return {
      search,
      heroStats,
      categories,
      featuredRestaurants,
      howItWorksSteps,
      specialOffers,
      testimonials,
      findFood,
      selectCategory,
      viewRestaurant
    };
  },
};
</script>

<style scoped>
.home-page {
  padding: 0;
  overflow-x: hidden;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 120px 0 80px;
  position: relative;
  overflow: hidden;
}

.hero-particles::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></svg>') repeat;
  animation: float 20s infinite linear;
}

.hero-badge {
  animation: bounce 2s infinite;
}

.text-gradient {
  background: linear-gradient(45deg, #ffd700, #ff6b35);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-title {
  font-size: clamp(2rem, 8vw, 4rem);
  line-height: 1.2;
}

.hero-subtitle {
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.9;
}

/* Search */
.search-container {
  max-width: 600px;
  margin: 0 auto;
}

.search-wrapper {
  position: relative;
  filter: drop-shadow(0 10px 30px rgba(0,0,0,0.2));
}

.search-input {
  font-size: 1.1rem;
}

.search-btn {
  transition: all 0.3s ease;
}

.search-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 5px 15px rgba(25, 118, 210, 0.4);
}

/* Hero Stats */
.hero-stats {
  margin-top: 60px;
}

.stat-item {
  padding: 20px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.stat-item:hover {
  transform: scale(1.1) translateY(-5px);
}

.stat-icon {
  background: rgba(255,255,255,0.2);
  border-radius: 50%;
  padding: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.3);
}

/* Floating Elements */
.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
}

.floating-food {
  position: absolute;
  font-size: 3rem;
  opacity: 0.1;
  animation: float-rotate 15s infinite ease-in-out;
}

.floating-food.pizza {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.floating-food.burger {
  top: 60%;
  right: 15%;
  animation-delay: 5s;
}

.floating-food.sushi {
  bottom: 30%;
  left: 20%;
  animation-delay: 10s;
}

.pizza::before { content: '🍕'; }
.burger::before { content: '🍔'; }
.sushi::before { content: '🍣'; }

/* Section Headers */
.section-header {
  margin-bottom: 60px;
}

.section-header h2 {
  position: relative;
  display: inline-block;
}

.section-header h2::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 2px;
}

/* Categories */
.categories-section {
  background: white;
  padding: 80px 0;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 30px;
  max-width: 800px;
  margin: 0 auto;
}

.category-card {
  background: white;
  border-radius: 20px;
  padding: 30px 20px;
  text-align: center;
  box-shadow: 0 4px 25px rgba(0,0,0,0.08);
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.category-card:hover {
  transform: translateY(-10px) scale(1.05);
  box-shadow: 0 15px 40px rgba(0,0,0,0.15);
  border-color: #667eea;
}

.category-icon {
  font-size: 3rem;
  margin-bottom: 15px;
  animation: bounce-gentle 2s infinite;
}

/* Restaurant Cards */
.featured-section {
  background: #f8fafc;
  padding: 80px 0;
}

.restaurant-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
  margin-top: 60px;
}

.restaurant-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 25px rgba(0,0,0,0.08);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  border: 2px solid transparent;
}

.restaurant-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 50px rgba(0,0,0,0.15);
  border-color: #667eea;
}

.card-image-wrapper {
  position: relative;
  overflow: hidden;
}

.restaurant-image {
  transition: transform 0.5s ease;
}

.restaurant-card:hover .restaurant-image {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.restaurant-card:hover .image-overlay {
  opacity: 1;
}

.favorite-btn {
  transition: all 0.3s ease;
}

.favorite-btn:hover {
  transform: scale(1.1);
  background: rgba(255,255,255,0.9) !important;
}

.new-badge, .discount-badge {
  font-weight: bold;
  font-size: 0.8rem;
}

.card-content {
  padding: 20px;
}

.restaurant-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.status-badge {
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.7rem;
}

.rating-section {
  display: flex;
  align-items: center;
}

.delivery-info {
  display: flex;
  align-items: center;
}

.price-range {
  display: flex;
  align-items: center;
}

.price-dot {
  color: #00c853;
  font-weight: bold;
  margin-right: 2px;
}

.card-actions {
  padding: 0 20px 20px;
}

.order-btn {
  border-radius: 12px;
  font-weight: bold;
  padding: 12px;
  transition: all 0.3s ease;
}

.order-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(25, 118, 210, 0.4);
}

.load-more-btn {
  border-radius: 25px;
  padding: 12px 30px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.load-more-btn:hover {
  background: #667eea !important;
  color: white !important;
  transform: translateY(-2px);
}

/* How It Works */
.how-it-works-section {
  background: white;
  padding: 80px 0;
}

.steps-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px;
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
}

.steps-line {
  position: absolute;
  top: 40px;
  left: 16.66%;
  right: 16.66%;
  height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  z-index: 1;
}

.step-item {
  text-align: center;
  position: relative;
  z-index: 2;
  padding: 0 20px;
}

.step-number {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 auto 20px;
  position: relative;
}

.step-icon-wrapper {
  background: rgba(102, 126, 234, 0.1);
  border-radius: 50%;
  padding: 20px;
  display: inline-flex;
  margin-bottom: 20px;
}

.step-icon {
  animation: pulse 2s infinite;
}

/* Special Offers */
.offers-section {
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  padding: 80px 0;
  position: relative;
  overflow: hidden;
}

.bg-gradient-2::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></svg>') repeat;
  animation: float 15s infinite linear;
}

.offers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1000px;
  margin: 0 auto;
}

.offer-card {
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px 30px;
  text-align: center;
  border: 1px solid rgba(255,255,255,0.2);
  transition: all 0.3s ease;
  cursor: pointer;
}

.offer-card:hover {
  transform: translateY(-5px) scale(1.02);
  background: rgba(255,255,255,0.25);
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.offer-emoji {
  font-size: 4rem;
  margin-bottom: 20px;
  animation: bounce 3s infinite;
}

.offer-btn {
  border-radius: 25px;
  padding: 12px 30px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.offer-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

/* Testimonials */
.testimonials-section {
  background: #f8fafc;
  padding: 80px 0;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.testimonial-card {
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 4px 25px rgba(0,0,0,0.08);
  position: relative;
  transition: all 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0,0,0,0.15);
}

.testimonial-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.testimonial-avatar {
  border: 3px solid #667eea;
  padding: 2px;
}

.testimonial-info {
  flex: 1;
}

.quote-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  opacity: 0.1;
  transform: rotate(180deg);
}

.testimonial-text {
  line-height: 1.6;
  color: #2d3748;
  font-style: italic;
  position: relative;
  z-index: 2;
}

/* Download Section */
.download-section {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  padding: 100px 0;
  position: relative;
  overflow: hidden;
}

.bg-dark::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="1" fill="white" opacity="0.05"/></svg>') repeat;
  animation: float 20s infinite linear;
}

.download-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.download-text {
  text-align: left;
}

.app-features {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.feature-item {
  display: flex;
  align-items: center;
  font-size: 1.1rem;
}

.download-buttons {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.download-btn {
  border-radius: 12px;
  padding: 15px 25px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.download-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
}

.download-image {
  display: flex;
  justify-content: center;
}

.phone-mockup {
  width: 280px;
  height: 560px;
  background: #1a202c;
  border-radius: 40px;
  padding: 15px;
  position: relative;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  border: 4px solid #4a5568;
}

.phone-screen {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 30px;
  overflow: hidden;
  position: relative;
}

.app-preview::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></svg>') repeat;
  animation: float 15s infinite linear;
}

/* Animations */
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
}

@keyframes float-rotate {
  0% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-50px) rotate(5deg); }
  50% { transform: translateY(-100px) rotate(0deg); }
  75% { transform: translateY(-50px) rotate(-5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-20px); }
  60% { transform: translateY(-10px); }
}

@keyframes bounce-gentle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

@keyframes pulse-slow {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes slide {
  0% { transform: translateX(-100px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}

@keyframes fade {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes zoom {
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes fade-up {
  0% { transform: translateY(50px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

/* Animation Classes */
.animate-fade {
  animation: fade 1s ease-out;
}

.animate-fade-delay {
  animation: fade 1s ease-out 0.5s both;
}

.animate-slide {
  animation: slide 1s ease-out;
}

.animate-zoom {
  animation: zoom 0.8s ease-out;
}

.animate-fade-up {
  animation: fade-up 0.8s ease-out;
}

.animate-pulse-slow {
  animation: pulse-slow 3s infinite;
}

.animate-bounce {
  animation: bounce 2s infinite;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .download-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 40px;
  }
  
  .download-text {
    text-align: center;
  }
  
  .app-features {
    align-items: center;
  }
  
  .steps-container {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .steps-line {
    display: none;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 80px 0 60px;
  }
  
  .hero-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  .restaurant-grid {
    grid-template-columns: 1fr;
  }
  
  .testimonials-grid {
    grid-template-columns: 1fr;
  }
  
  .download-buttons {
    justify-content: center;
  }
  
  .phone-mockup {
    width: 200px;
    height: 400px;
  }
}

@media (max-width: 480px) {
  .hero-stats {
    grid-template-columns: 1fr;
  }
  
  .categories-grid {
    grid-template-columns: 1fr;
  }
  
  .download-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .download-btn {
    width: 100%;
    max-width: 250px;
  }
  
  .search-input {
    font-size: 1rem;
  }
}

/* Utility Classes */
.relative-position {
  position: relative;
}

.text-center {
  text-align: center;
}

.text-white {
  color: white;
}

.text-bold {
  font-weight: bold;
}

.q-pa-xl {
  padding: 48px;
}

.q-mb-md {
  margin-bottom: 16px;
}

.q-mb-xl {
  margin-bottom: 48px;
}

.q-mt-md {
  margin-top: 16px;
}

.q-mt-lg {
  margin-top: 24px;
}

.q-mt-xl {
  margin-top: 48px;
}

.q-ml-sm {
  margin-left: 8px;
}

.q-mr-md {
  margin-right: 16px;
}

.q-mr-xs {
  margin-right: 4px;
}

.row {
  display: flex;
  flex-wrap: wrap;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.q-gutter-xl {
  margin: -24px;
}

.q-gutter-xl > * {
  margin: 24px;
}

.full-width {
  width: 100%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Ensure animations work properly */
.animate-fade-up,
.animate-fade,
.animate-zoom {
  opacity: 0;
  animation-fill-mode: both;
}

.animate-in {
  opacity: 1;
}

/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #5a6fd8, #6a4190);
}
</style>