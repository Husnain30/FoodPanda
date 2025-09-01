<!-- src/restaurant/pages/RestaurantDashboard.vue -->
<template>
  <div class="dashboard">
    <!-- Header Section -->
    <div class="dashboard-header">
      <div class="header-content">
        <h1 class="page-title">Restaurant Dashboard</h1>
        <p class="page-subtitle">Welcome back! Here's what's happening at your restaurant today.</p>
      </div>
      <div class="header-actions">
        <button class="btn-secondary">
          <i class="icon">📊</i>
          Export Report
        </button>
        <button class="btn-primary">
          <i class="icon">➕</i>
          Quick Actions
        </button>
      </div>
    </div>

    <!-- Key Metrics Stats -->
    <div class="stats-section">
      <div class="stats-grid">
        <div class="stat-card revenue">
          <div class="stat-header">
            <div class="stat-icon">💰</div>
            <div class="stat-meta">
              <span class="stat-label">Total Revenue</span>
              <span class="stat-period">Today</span>
            </div>
          </div>
          <div class="stat-value">PKR 24,580</div>
          <div class="stat-change positive">
            <span class="change-indicator">↗</span>
            <span>+15.3% from yesterday</span>
          </div>
        </div>

        <div class="stat-card orders">
          <div class="stat-header">
            <div class="stat-icon">🛍️</div>
            <div class="stat-meta">
              <span class="stat-label">Orders Today</span>
              <span class="stat-period">Live</span>
            </div>
          </div>
          <div class="stat-value">127</div>
          <div class="stat-change positive">
            <span class="change-indicator">↗</span>
            <span>+8.2% from yesterday</span>
          </div>
        </div>

        <div class="stat-card customers">
          <div class="stat-header">
            <div class="stat-icon">👥</div>
            <div class="stat-meta">
              <span class="stat-label">Active Customers</span>
              <span class="stat-period">This month</span>
            </div>
          </div>
          <div class="stat-value">2,849</div>
          <div class="stat-change positive">
            <span class="change-indicator">↗</span>
            <span>+23.1% growth</span>
          </div>
        </div>

        <div class="stat-card rating">
          <div class="stat-header">
            <div class="stat-icon">⭐</div>
            <div class="stat-meta">
              <span class="stat-label">Avg Rating</span>
              <span class="stat-period">This week</span>
            </div>
          </div>
          <div class="stat-value">4.8</div>
          <div class="stat-change neutral">
            <span class="change-indicator">→</span>
            <span>Stable performance</span>
          </div>
        </div>
      </div>
    </div>

  <!-- Show loading state -->
<div v-if="loading" class="loading-state">
  Loading restaurants...
</div>


  <!-- Restaurant Gallery Section -->
<div class="gallery-section">
  <div class="section-header">
    <h2>Others Restaurant Service</h2>
    <button class="btn-secondary gallery-btn" @click="fetchRestaurants">
      <i class="icon">🔄</i>
      Refresh
    </button>
  </div>

  <!-- Loading State -->
  <div v-if="restaurantsLoading" class="gallery-loading">
    <div class="loading-spinner"></div>
    <p>Loading restaurants...</p>
  </div>

  <!-- Error State -->
  <div v-else-if="restaurantsError" class="gallery-error">
    <p>❌ {{ restaurantsError }}</p>
    <button @click="fetchRestaurants" class="btn-secondary">
      Try Again
    </button>
  </div>

  <!-- Gallery Grid with Dynamic Data -->
  <div v-else class="gallery-grid">
    <div 
      v-for="restaurant in restaurants" 
      :key="restaurant.id" 
      class="gallery-card"
    >
      <img 
        :src="getRestaurantImage(restaurant)" 
        :alt="restaurant.name || 'Restaurant Image'" 
        class="gallery-image"
        @error="$event.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop&crop=center'"
      >
      <div class="gallery-overlay">
        <div class="gallery-info">
          <span class="gallery-title">{{ restaurant.name || 'Restaurant Name' }}</span>
          <span class="gallery-location">{{ formatLocation(restaurant) }}</span>
          <span class="gallery-detail">{{ getRestaurantDescription(restaurant) }}</span>
          <div class="gallery-stats">
            <span 
              v-for="stat in getRestaurantStats(restaurant)" 
              :key="stat" 
              class="stat-item"
            >
              {{ stat }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!restaurants.length" class="gallery-empty">
      <p>No restaurants found</p>
      <button @click="fetchRestaurants" class="btn-primary">
        Load Restaurants
      </button>
    </div>
  </div>
</div>



    <!-- Main Content Grid -->
      <!-- Left Column - Charts -->
      <div class="content-left">
        <!-- Earnings Chart -->
     

        <!-- Performance Metrics -->
        <div class="metrics-container">
          <h2>Performance Metrics</h2>
          <div class="metrics-grid">
            <div class="metric-item">
              <span class="metric-label">Average Order Value</span>
              <span class="metric-value">PKR 850</span>
              <span class="metric-change positive">+5.2%</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">Order Completion Rate</span>
              <span class="metric-value">97.8%</span>
              <span class="metric-change positive">+1.1%</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">Customer Return Rate</span>
              <span class="metric-value">68.5%</span>
              <span class="metric-change positive">+3.7%</span>
            </div>
            <div class="metric-item">
              <span class="metric-label">Peak Hours</span>
              <span class="metric-value">12-2 PM</span>
              <span class="metric-change neutral">Consistent</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column - Tables & Quick Actions -->
      <div class="content-right">
        <!-- Recent Orders -->
     


        <!-- Quick Actions Panel -->
        <div class="quick-actions">
          <h3>Quick Actions</h3>
          <div class="actions-grid">
     <router-link :to="{ name: 'MenuManager' }" class="action-card">
  <div class="action-icon">🍽️</div>
  <span>Manage Menu</span>
</router-link>
          <router-link to="/restaurant/promotions" class="action-card">
  <div class="action-icon">🎉</div>
  <span>Promotions</span>
</router-link>
            <router-link to="/restaurant/orders" class="action-card">
  <div class="action-icon">📋</div>
  <span>All Orders</span>
</router-link>
           <router-link to="/restaurant/earnings" class="action-card">
  <div class="action-icon">💹</div>
  <span>Analytics</span>
</router-link>
          </div>
        </div>

        <!-- Active Promotions -->
        <div class="promotions-container">
          <div class="section-header">
            <h3>Active Promotions</h3>
            <span class="promotion-count">3 active</span>
          </div>
          <div class="promotion-list">
            <div class="promotion-item">
              <div class="promotion-info">
                <span class="promotion-name">20% Off Lunch Combo</span>
                <span class="promotion-expiry">Expires in 3 days</span>
              </div>
              <span class="promotion-status active">Active</span>
            </div>
            <div class="promotion-item">
              <div class="promotion-info">
                <span class="promotion-name">Free Delivery Weekend</span>
                <span class="promotion-expiry">Expires tomorrow</span>
              </div>
              <span class="promotion-status ending">Ending Soon</span>
            </div>
            <div class="promotion-item">
              <div class="promotion-info">
                <span class="promotion-name">Buy 2 Get 1 Free Pizza</span>
                <span class="promotion-expiry">Expires in 5 days</span>
              </div>
              <span class="promotion-status active">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    

</template>
// Only script section changes for RestaurantDashboard.vue

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "RestaurantDashboard",
  components: {
  
  },
  data() {
    return {
      currentPeriod: "7D",
      refreshInterval: null,
      stats: {
        revenue: 24580,
        orders: 127,
        customers: 2849,
        rating: 4.8,
      },
      promotions: [
        {
          name: "20% Off Lunch Combo",
          expiry: "Expires in 3 days",
          status: "active",
        },
        {
          name: "Free Delivery Weekend",
          expiry: "Expires tomorrow",
          status: "ending",
        },
        {
          name: "Buy 2 Get 1 Free Pizza",
          expiry: "Expires in 5 days",
          status: "active",
        },
      ],
    };
  },
  
  computed: {
    ...mapGetters('restaurant', [
      'getDashboardStats',
      'getStatsLoading',
      'getStatsError',
      'getAllRestaurants',
      'getRestaurantsLoading',
      'getRestaurantsError',
      // Add new getters for details and stats
      'getRestaurantDetails',
      'getRestaurantStats',
      'getDetailsLoading',
      'getDetailsError'
    ]),
    
    // Use store data for template (enhanced with details and stats)
    restaurants() {
      return this.getAllRestaurants.map(restaurant => {
        const details = this.getRestaurantDetails[restaurant.id] || {}
        const stats = this.getRestaurantStats[restaurant.id] || {}
        
        return {
          ...restaurant,
          ...details, // Merge restaurant details
          apiStats: stats // Keep stats separate to avoid conflicts
        }
      })
    },
    
    restaurantsLoading() {
      return this.getRestaurantsLoading;
    },
    restaurantsError() {
      return this.getRestaurantsError;
    }
  },

  async mounted() {
    // Fetch restaurants data on component mount
    await this.fetchRestaurants();
    
    // Auto-refresh data every 30s
    this.refreshInterval = setInterval(() => {
      this.refreshDashboardData();
    }, 30000);
  },
  
  beforeUnmount() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  },
  
  methods: {
    ...mapActions('restaurant', [
      'fetchRestaurantStats',
      'fetchAllRestaurants',
      'fetchRestaurantDetails',
      'fetchRestaurantWithStats' // Add new action
    ]),

    // Updated fetchRestaurants method
    async fetchRestaurants() {
      try {
        console.log('🏪 Fetching restaurants via Vuex action...');
        await this.fetchAllRestaurants();
        
        // After getting restaurants list, fetch details and stats for each
        const restaurants = this.getAllRestaurants;
        console.log('✅ Restaurants loaded from store:', restaurants.length);
        
        // Fetch details and stats for each restaurant
        if (restaurants.length > 0) {
          await this.fetchRestaurantDetailsAndStats(restaurants);
        }
        
      } catch (error) {
        console.error('❌ Error in fetchRestaurants:', error);
        this.$q?.notify?.({
          type: 'negative',
          message: 'Failed to load restaurants',
          caption: error.message
        });
      }
    },

    // NEW METHOD: Fetch details and stats for all restaurants
    async fetchRestaurantDetailsAndStats(restaurants) {
      try {
        console.log('🔄 Fetching details and stats for all restaurants...');
        
        // Fetch details and stats for each restaurant in parallel
        const promises = restaurants.map(restaurant => 
          this.fetchRestaurantWithStats(restaurant.id).catch(error => {
            console.warn(`Failed to fetch data for restaurant ${restaurant.id}:`, error);
            return null; // Continue with other restaurants even if one fails
          })
        );
        
        await Promise.all(promises);
        console.log('✅ All restaurant details and stats loaded');
        
      } catch (error) {
        console.error('❌ Error fetching restaurant details:', error);
      }
    },

    refreshDashboardData() {
      console.log("🔄 Refreshing dashboard data...");
      this.fetchRestaurants();
    },
    
    changePeriod(period) {
      this.currentPeriod = period;
      console.log("📊 Changed period to:", period);
    },

    // ENHANCED: Helper method with API stats integration
    getRestaurantImage(restaurant) {
      // Use API details image if available, otherwise fallback
      if (restaurant.image_url || restaurant.image) {
        return restaurant.image_url || restaurant.image;
      }
      
      const fallbackImages = [
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop&crop=center'
      ];
      
      return fallbackImages[restaurant.id % fallbackImages.length];
    },

    formatRating(rating) {
      return rating ? parseFloat(rating).toFixed(1) : '4.5';
    },

    // ENHANCED: Location with API details
    formatLocation(restaurant) {
      return restaurant.address || restaurant.location || `📍 ${restaurant.city || 'Pakistan'}`;
    },

    // ENHANCED: Description with API details
    getRestaurantDescription(restaurant) {
      return restaurant.description || restaurant.cuisine_type || 'Delicious food and great ambiance';
    },

    // ENHANCED: Stats with API data integration
    getRestaurantStats(restaurant) {
      const stats = [];
      const apiStats = restaurant.apiStats || {};
      
      // Use API stats if available, otherwise fallback to restaurant data
      const rating = apiStats.average_rating || restaurant.rating;
      const ordersCount = apiStats.orders_count || restaurant.orders_count;
      const revenue = apiStats.revenue || restaurant.revenue;
      const customersCount = apiStats.customers_count || restaurant.customers_count;
      
      // Rating (priority to API stats)
      if (rating) {
        stats.push(`⭐ ${this.formatRating(rating)}`);
      }
      
      // Orders count from API stats
      if (ordersCount) {
        stats.push(`📦 ${ordersCount} orders`);
      } else if (restaurant.seating_capacity) {
        stats.push(`👥 ${restaurant.seating_capacity} seats`);
      } else {
        stats.push(`🍽️ Premium dining`);
      }
      
      // Revenue from API stats
      if (revenue) {
        stats.push(`💰 Rs ${revenue.toLocaleString()}`);
      }
      
      // Customers count from API stats
      if (customersCount) {
        stats.push(`👥 ${customersCount} customers`);
      }
      
      return stats;
    }
  },
};
</script>
<style scoped>
/* Variables */
:root {
  --primary-color: #6c5ce7;
  --secondary-color: #a29bfe;
  --success-color: #00b894;
  --warning-color: #fdcb6e;
  --error-color: #e17055;
  --text-primary: #2d3436;
  --text-secondary: #636e72;
  --text-light: #b2bec3;
  --background: #f8f9fa;
  --card-background: #ffffff;
  --border-color: #e9ecef;
  --shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  --shadow-hover: 0 8px 25px rgba(0, 0, 0, 0.1);
  --border-radius: 12px;
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Main Dashboard Layout */
.dashboard {
  min-height: 100vh;
  background: var(--background);
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Dashboard Header */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.header-content {
  flex: 1;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.02em;
}

.page-subtitle {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.btn-primary, .btn-secondary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: var(--transition);
  text-decoration: none;
}

.btn-primary {
  background: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background: #5f3dc4;
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
}

.btn-secondary {
  background: var(--card-background);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  background: #f1f3f4;
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

/* Stats Section */
.stats-section {
  margin-bottom: 2.5rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: var(--card-background);
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--primary-color);
}

.stat-card.revenue::before { background: #00b894; }
.stat-card.orders::before { background: #6c5ce7; }
.stat-card.customers::before { background: #fd79a8; }
.stat-card.rating::before { background: #fdcb6e; }

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}

.stat-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-icon {
  font-size: 2.5rem;
  line-height: 1;
}

.stat-meta {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-label {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.stat-period {
  font-size: 0.85rem;
  color: var(--text-light);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  line-height: 1.1;
}

.stat-change {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
}

.stat-change.positive {
  color: var(--success-color);
}

.stat-change.negative {
  color: var(--error-color);
}

.stat-change.neutral {
  color: var(--text-secondary);
}

.change-indicator {
  font-size: 1.1rem;
  font-weight: bold;
}

/* Gallery Section */
.gallery-section {
  margin-bottom: 2.5rem;
}

.gallery-section .section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 0;
  border: none;
}

.gallery-section .section-header h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.gallery-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background: var(--card-background);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: var(--transition);
  text-decoration: none;
}

.gallery-btn:hover {
  background: var(--background);
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.gallery-card {
  position: relative;
  aspect-ratio: 4/3;
  border-radius: var(--border-radius);
  overflow: hidden;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: var(--shadow);
}

.gallery-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: var(--shadow-hover);
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.gallery-card:hover .gallery-image {
  transform: scale(1.05);
}

.gallery-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 70%, transparent 100%);
  padding: 1.5rem 1rem;
  transform: translateY(100%);
  transition: var(--transition);
}

.gallery-card:hover .gallery-overlay {
  transform: translateY(0);
}

.gallery-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.gallery-title {
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  text-shadow: 0 1px 3px rgba(0,0,0,0.5);
  line-height: 1.2;
}

.gallery-location {
  color: #ffeaa7;
  font-weight: 500;
  font-size: 0.85rem;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}

.gallery-detail {
  color: #ddd;
  font-size: 0.8rem;
  line-height: 1.3;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}

.gallery-stats {
  display: flex;
  gap: 1rem;
  margin-top: 0.25rem;
}

.stat-item {
  color: #74b9ff;
  font-size: 0.75rem;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  background: rgba(116, 185, 255, 0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  backdrop-filter: blur(5px);
}

/* Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.content-left, .content-right {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Chart Container */
.chart-container {
  background: var(--card-background);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  overflow: hidden;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--border-color);
}

.chart-header h2 {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-primary);
}

.chart-filters {
  display: flex;
  gap: 0.5rem;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  background: transparent;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
  cursor: pointer;
  transition: var(--transition);
}

.filter-btn:hover {
  background: var(--background);
}

.filter-btn.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.chart-wrapper {
  padding: 1.5rem 2rem 2rem;
  height: 350px;
}

/* Metrics Container */
.metrics-container {
  background: var(--card-background);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 2rem;
}

.metrics-container h2 {
  margin: 0 0 1.5rem 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-primary);
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.metric-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.metric-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.metric-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.metric-change {
  font-size: 0.85rem;
  font-weight: 600;
}

.metric-change.positive {
  color: var(--success-color);
}

.metric-change.negative {
  color: var(--error-color);
}

.metric-change.neutral {
  color: var(--text-secondary);
}

/* Orders Container */
.orders-container {
  background: var(--card-background);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  overflow: hidden;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--border-color);
}

.section-header h2, .section-header h3 {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-primary);
}

.view-all-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: var(--transition);
}

.view-all-link:hover {
  color: #5f3dc4;
  text-decoration: underline;
}

/* Quick Actions */
.quick-actions {
  background: var(--card-background);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 2rem;
}

.quick-actions h3 {
  margin: 0 0 1.5rem 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-primary);
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.action-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem 1rem;
  background: var(--background);
  border-radius: var(--border-radius);
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 600;
  font-size: 0.9rem;
  transition: var(--transition);
  border: 2px solid transparent;
}

.action-card:hover {
  background: white;
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.action-icon {
  font-size: 2rem;
  line-height: 1;
}

/* Promotions Container */
.promotions-container {
  background: var(--card-background);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  overflow: hidden;
}

.promotion-count {
  font-size: 0.85rem;
  color: var(--text-light);
  background: var(--background);
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-weight: 500;
}

.promotion-list {
  padding: 1.5rem 2rem 2rem;
}

.promotion-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border-color);
}

.promotion-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.promotion-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.promotion-name {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.95rem;
}

.promotion-expiry {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.promotion-status {
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.promotion-status.active {
  background: rgba(0, 184, 148, 0.1);
  color: var(--success-color);
}

.promotion-status.ending {
  background: rgba(253, 203, 110, 0.1);
  color: var(--warning-color);
}

/* Responsive Design */
@media (max-width: 1200px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .gallery-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .dashboard {
    padding: 1rem;
  }
  
  .dashboard-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .header-actions {
    justify-content: stretch;
  }
  
  .btn-primary, .btn-secondary {
    flex: 1;
    justify-content: center;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .stat-value {
    font-size: 2rem;
  }
  
  .metrics-grid {
    grid-template-columns: 1fr;
  }
  
  .actions-grid {
    grid-template-columns: 1fr;
  }
  
  .chart-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
}

@media (max-width: 480px) {
  .stat-card {
    padding: 1.5rem;
  }
  
  .chart-wrapper {
    height: 250px;
    padding: 1rem;
  }
  
  .section-header {
    padding: 1rem 1.5rem;
  }
  
  .promotion-list {
    padding: 1rem 1.5rem 1.5rem;
  }
}
</style>