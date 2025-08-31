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

  <!-- Stats cards में -->
<div class="stat-value">PKR {{ getDashboardStats.revenue.toLocaleString() }}</div>
<div class="stat-value">{{ getDashboardStats.orders }}</div>
<div class="stat-value">{{ getDashboardStats.customers.toLocaleString() }}</div>
<div class="stat-value">{{ getDashboardStats.rating }}</div>

<!-- Performance metrics में -->
<span class="metric-value">PKR {{ getDashboardStats.averageOrderValue }}</span>
<span class="metric-value">{{ getDashboardStats.completionRate }}%</span>
<span class="metric-value">{{ getDashboardStats.returnRate }}%</span>
<span class="metric-value">{{ getDashboardStats.peakHours }}</span>
    <!-- Main Content Grid -->
      <!-- Left Column - Charts -->
      <div class="content-left">
        <!-- Earnings Chart -->
     <div v-if="getStatsLoading" class="loading-state">Loading dashboard...</div>
<div v-else-if="getStatsError" class="error-state">{{ getStatsError }}</div>

        <!-- Performance Metrics -->
       
      <!-- Right Column - Tables & Quick Actions -->
      <div class="content-right">
        <!-- Recent Orders -->
        <div class="orders-container">
          <div class="section-header">
            <h2>Recent Orders</h2>
          <router-link to="/restaurant/orders" class="view-all-link">View All</router-link>

          </div>
          <OrdersTable :limit="5" />
        </div>


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
    </div>
    

</template>

<script>
import OrdersTable from '../components/OrdersTable.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: "RestaurantDashboard",
  components: {
   OrdersTable
  
  },
  data() {
    return {
      currentPeriod: "7D", // Default filter for chart
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
async mounted() {
  // Get restaurant ID from route params or user session
  const restaurantId = this.$route.params.id || this.$store.getters['auth/getCurrentUser']?.restaurant_id
  
  if (restaurantId) {
    try {
      await this.fetchRestaurantStats(restaurantId)
      await this.fetchRestaurantOrders(restaurantId)
    } catch (error) {
      console.error('Error loading dashboard:', error)
    }
  }
  
  // Auto-refresh remains same
  this.refreshInterval = setInterval(() => {
    this.refreshDashboardData()
  }, 30000)
},

  beforeUnmount() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  },
  computed: {
  ...mapGetters('restaurant', [
    'getDashboardStats',
    'getStatsLoading',
    'getStatsError'
  ]),
},
  methods: {
  ...mapActions('restaurant', [
    'fetchRestaurantStats',
    'fetchRestaurantOrders'
  ]),
  
  async refreshDashboardData() {
    const restaurantId = this.$route.params.id || this.$store.getters['auth/getCurrentUser']?.restaurant_id
    if (restaurantId) {
      await this.fetchRestaurantStats(restaurantId)
      await this.fetchRestaurantOrders(restaurantId)
    }
  },

    changePeriod(period) {
      this.currentPeriod = period;
      // Update chart data based on selected period
      console.log("📊 Changed period to:", period);
    },
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