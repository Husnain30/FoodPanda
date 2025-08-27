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

    <!-- Restaurant Gallery Section -->
    <div class="gallery-section">
      <div class="section-header">
        <h2>Restaurant Gallery</h2>
        <button class="btn-secondary gallery-btn">
          <i class="icon">📸</i>
          Manage Photos
        </button>
      </div>
      <div class="gallery-grid">
        <div class="gallery-card">
          <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop&crop=center" alt="Restaurant Interior" class="gallery-image">
          <div class="gallery-overlay">
            <div class="gallery-info">
              <span class="gallery-title">Royal Palace Restaurant</span>
              <span class="gallery-location">📍 Gulberg, Lahore</span>
              <span class="gallery-detail">Premium dining with traditional ambiance</span>
              <div class="gallery-stats">
                <span class="stat-item">⭐ 4.8</span>
                <span class="stat-item">👥 150 seats</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="gallery-card">
          <img src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&h=300&fit=crop&crop=center" alt="Food Presentation" class="gallery-image">
          <div class="gallery-overlay">
            <div class="gallery-info">
              <span class="gallery-title">Spice Garden Karachi</span>
              <span class="gallery-location">📍 DHA Phase 6, Karachi</span>
              <span class="gallery-detail">Authentic Pakistani & Continental cuisine</span>
              <div class="gallery-stats">
                <span class="stat-item">⭐ 4.9</span>
                <span class="stat-item">🍽️ 85 dishes</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="gallery-card">
          <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop&crop=center" alt="Kitchen View" class="gallery-image">
          <div class="gallery-overlay">
            <div class="gallery-info">
              <span class="gallery-title">Metro Kitchen Hub</span>
              <span class="gallery-location">📍 F-7 Markaz, Islamabad</span>
              <span class="gallery-detail">Open kitchen concept with live cooking</span>
              <div class="gallery-stats">
                <span class="stat-item">⭐ 4.7</span>
                <span class="stat-item">👨‍🍳 8 chefs</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="gallery-card">
          <img src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop&crop=center" alt="Outdoor Seating" class="gallery-image">
          <div class="gallery-overlay">
            <div class="gallery-info">
              <span class="gallery-title">Garden View Cafe</span>
              <span class="gallery-location">📍 Model Town, Faisalabad</span>
              <span class="gallery-detail">Beautiful outdoor dining experience</span>
              <div class="gallery-stats">
                <span class="stat-item">⭐ 4.6</span>
                <span class="stat-item">🌿 Garden view</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="gallery-card">
          <img src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop&crop=center" alt="Bar Area" class="gallery-image">
          <div class="gallery-overlay">
            <div class="gallery-info">
              <span class="gallery-title">Urban Lounge</span>
              <span class="gallery-location">📍 Mall Road, Murree</span>
              <span class="gallery-detail">Premium bar & lounge with mountain view</span>
              <div class="gallery-stats">
                <span class="stat-item">⭐ 4.8</span>
                <span class="stat-item">🍸 50+ drinks</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="gallery-card">
          <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center" alt="Pizza Making" class="gallery-image">
          <div class="gallery-overlay">
            <div class="gallery-info">
              <span class="gallery-title">Pizza Corner</span>
              <span class="gallery-location">📍 Anarkali Bazaar, Lahore</span>
              <span class="gallery-detail">Fresh hand-tossed pizzas daily</span>
              <div class="gallery-stats">
                <span class="stat-item">⭐ 4.5</span>
                <span class="stat-item">🍕 25 varieties</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="gallery-card">
          <img src="https://images.unsplash.com/photo-1592861956120-e524fc739696?w=400&h=300&fit=crop&crop=center" alt="Chef Cooking" class="gallery-image">
          <div class="gallery-overlay">
            <div class="gallery-info">
              <span class="gallery-title">Chef's Table Peshawar</span>
              <span class="gallery-location">📍 University Town, Peshawar</span>
              <span class="gallery-detail">Live cooking demonstrations & classes</span>
              <div class="gallery-stats">
                <span class="stat-item">⭐ 4.9</span>
                <span class="stat-item">👨‍🍳 Master chef</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="gallery-card">
          <img src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&crop=center" alt="Desserts" class="gallery-image">
          <div class="gallery-overlay">
            <div class="gallery-info">
              <span class="gallery-title">Sweet Dreams Bakery</span>
              <span class="gallery-location">📍 Fortress Stadium, Lahore</span>
              <span class="gallery-detail">Handcrafted desserts & pastries</span>
              <div class="gallery-stats">
                <span class="stat-item">⭐ 4.7</span>
                <span class="stat-item">🧁 40+ desserts</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="gallery-card">
          <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop&crop=center" alt="Wine Selection" class="gallery-image">
          <div class="gallery-overlay">
            <div class="gallery-info">
              <span class="gallery-title">Vintage Cellar</span>
              <span class="gallery-location">📍 Clifton Block 8, Karachi</span>
              <span class="gallery-detail">Curated collection of premium beverages</span>
              <div class="gallery-stats">
                <span class="stat-item">⭐ 4.8</span>
                <span class="stat-item">🍷 200+ selection</span>
              </div>
            </div>
          </div>
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
    

</template>

<script>

export default {
  name: "RestaurantDashboard",
  components: {
   
  
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
  mounted() {
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
    refreshDashboardData() {
      // Here you can call APIs to update stats, orders, and chart data
      console.log("🔄 Refreshing dashboard data...");
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