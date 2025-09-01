<template>
  <q-page class="admin-dashboard">
    <!-- Dashboard Header -->
    <div class="dashboard-header">
      <div class="header-content">
        <div class="welcome-section">
          <h1 class="page-title text-black">Admin Dashboard</h1>
          <p class="page-subtitle text-black">
            Welcome back! Here's what's happening in your platform today.
          </p>
        </div>
        
        <div class="header-actions">
          <q-btn
            outline
            color="primary"
            icon="refresh"
            label="Refresh Data"
            class="action-btn"
            :loading="isAnyLoading"
            @click="refreshData"
          />
          <q-btn
            outline
            color="primary"
            icon="file_download"
            label="Export Report"
            class="action-btn"
          />
          <q-btn
            color="primary"
            icon="add"
            label="Quick Action"
            class="action-btn primary-btn"
          />
        </div>
      </div>

      <!-- User Info Card -->
      <div class="user-info-card" v-if="user">
        <div class="user-avatar">
          <q-avatar size="60px">
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
          <div class="status-indicator online"></div>
        </div>
        <div class="user-details">
          <div class="user-name">{{ user.name || user.email }}</div>
          <div class="user-role">{{ user.role || 'Administrator' }}</div>
          <div class="user-meta">Last login: Today at 9:30 AM</div>
        </div>
        <div class="user-stats">
          <div class="stat-item">
            <div class="stat-value">{{ todayActions }}</div>
            <div class="stat-label">Actions Today</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">98%</div>
            <div class="stat-label">System Health</div>
          </div>
        </div>
      </div>
      
      <div class="loading-card" v-else>
        <q-spinner-hourglass size="40px" color="primary" />
        <div class="loading-text">Loading user information...</div>
      </div>
    </div>

    <!-- Key Metrics -->
    <div class="metrics-section">
      <div class="section-title">
        <h2>📊 Key Metrics</h2>
        <p>Real-time platform statistics</p>
      </div>
      
      <div class="metrics-grid">
        <div class="metric-card revenue">
          <div class="metric-icon">
            <q-icon name="account_balance_wallet" size="2.5rem" />
          </div>
          <div class="metric-content">
            <div class="metric-value">
              <q-skeleton v-if="isLoading('analytics')" type="text" width="120px" />
              <span v-else>{{ revenueFormatted }}</span>
            </div>
            <div class="metric-label">Total Revenue</div>
            <div class="metric-period">This month</div>
          </div>
          <div class="metric-change positive">
            <q-icon name="trending_up" />
            <span>+18.5%</span>
          </div>
        </div>

        <div class="metric-card orders">
          <div class="metric-icon">
            <q-icon name="shopping_cart" size="2.5rem" />
          </div>
          <div class="metric-content">
            <div class="metric-value">
              <q-skeleton v-if="isLoading('orders')" type="text" width="80px" />
              <span v-else>{{ totalOrders.toLocaleString() }}</span>
            </div>
            <div class="metric-label">Total Orders</div>
            <div class="metric-period">This month</div>
          </div>
          <div class="metric-change positive">
            <q-icon name="trending_up" />
            <span>+12.3%</span>
          </div>
        </div>

        <div class="metric-card users">
          <div class="metric-icon">
            <q-icon name="people" size="2.5rem" />
          </div>
          <div class="metric-content">
            <div class="metric-value">
              <q-skeleton v-if="isLoading('users')" type="text" width="80px" />
              <span v-else>{{ activeUsers.toLocaleString() }}</span>
            </div>
            <div class="metric-label">Active Users</div>
            <div class="metric-period">This month</div>
          </div>
          <div class="metric-change positive">
            <q-icon name="trending_up" />
            <span>+25.1%</span>
          </div>
        </div>

        <div class="metric-card rating">
          <div class="metric-icon">
            <q-icon name="star" size="2.5rem" />
          </div>
          <div class="metric-content">
            <div class="metric-value">
              <q-skeleton v-if="isLoading('restaurants')" type="text" width="60px" />
              <span v-else>{{ avgRating || '4.8' }}</span>
            </div>
            <div class="metric-label">Avg Rating</div>
            <div class="metric-period">Platform wide</div>
          </div>
          <div class="metric-change neutral">
            <q-icon name="trending_flat" />
            <span>Stable</span>
          </div>
        </div>
      </div>

      <!-- Error Messages -->
      <div v-if="hasErrors" class="error-section q-mt-md">
        <q-banner 
          v-for="(error, type) in errors" 
          :key="type" 
          class="bg-red-1 text-red-8 q-mb-sm"
          icon="error"
        >
          <template v-slot:avatar>
            <q-icon name="error" color="red" />
          </template>
          Failed to load {{ type }}: {{ error }}
          <template v-slot:action>
            <q-btn 
              flat 
              color="red" 
              label="Retry" 
              @click="retryFetch(type)"
            />
          </template>
        </q-banner>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="main-content-grid">
      <!-- Quick Actions Panel -->
      <div class="quick-actions-panel">
        <div class="panel-header">
          <h3>🚀 Quick Actions</h3>
          <p>Frequently used management tools</p>
        </div>
        
        <div class="actions-grid">
          <div
            v-for="link in quickLinksData"
            :key="link.label"
            class="action-card"
            @click="goTo(link.to)"
          >
            <div class="action-icon" :style="{ backgroundColor: link.color + '20', color: link.color }">
              <q-icon :name="link.icon" size="1.8rem" />
            </div>
            <div class="action-content">
              <div class="action-title">{{ link.label }}</div>
              <div class="action-description">{{ link.description }}</div>
            </div>
            <div class="action-stats">
              <div class="stat-number">{{ link.count }}</div>
              <q-icon name="arrow_forward" class="action-arrow" />
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="activity-panel">
        <div class="panel-header">
          <h3>📋 Recent Activity</h3>
          <p>Latest platform events</p>
        </div>
        
        <div class="activity-list">
          <template v-if="isLoading('analytics')">
            <div 
              v-for="n in 5" 
              :key="n"
              class="activity-item skeleton"
            >
              <q-skeleton type="QAvatar" size="40px" />
              <div class="activity-content">
                <q-skeleton type="text" width="60%" />
                <q-skeleton type="text" width="80%" />
                <q-skeleton type="text" width="30%" />
              </div>
              <q-skeleton type="text" width="80px" />
            </div>
          </template>
          
          <template v-else>
            <div
              v-for="activity in displayActivities"
              :key="activity.id"
              class="activity-item"
            >
              <div class="activity-icon" :class="activity.type">
                <q-icon :name="activity.icon" />
              </div>
              <div class="activity-content">
                <div class="activity-title">{{ activity.title }}</div>
                <div class="activity-description">{{ activity.description }}</div>
                <div class="activity-time">{{ formatTime(activity.time || activity.created_at) }}</div>
              </div>
              <div class="activity-status" :class="activity.status">
                {{ activity.statusText || activity.status }}
              </div>
            </div>
            
            <div v-if="displayActivities.length === 0" class="no-activities">
              <q-icon name="info" size="2rem" color="grey-5" />
              <div>No recent activities</div>
            </div>
          </template>
        </div>
        
        <div class="panel-footer">
          <q-btn flat color="primary" label="View All Activities" />
        </div>
      </div>
    </div>

    <!-- Analytics Overview -->
    <div class="analytics-section">
      <div class="section-title">
        <h2>📈 Analytics Overview</h2>
        <p>Platform performance insights</p>
      </div>
      
      <div class="analytics-grid">
        <div class="chart-container">
          <div class="chart-header">
            <h4>Revenue Trends</h4>
            <div class="chart-controls">
              <q-btn-toggle
                v-model="revenuePeriod"
                toggle-color="primary"
                :options="[
                  {label: '7D', value: '7d'},
                  {label: '30D', value: '30d'},
                  {label: '90D', value: '90d'}
                ]"
                class="period-toggle"
              />
            </div>
          </div>
          <div class="chart-placeholder">
            <template v-if="isLoading('analytics')">
              <q-skeleton type="rect" height="200px" />
            </template>
            <template v-else>
              <div class="placeholder-content">
                <q-icon name="bar_chart" size="4rem" color="grey-5" />
                <div class="placeholder-text">Revenue chart will be displayed here</div>
                <div class="placeholder-description">
                  Integration with charting library required (Chart.js, ApexCharts, etc.)
                </div>
              </div>
            </template>
          </div>
        </div>

        <div class="stats-container">
          <div class="stats-header">
            <h4>Performance Stats</h4>
          </div>
          <div class="stats-list">
            <div class="stat-row">
              <div class="stat-info">
                <div class="stat-title">Order Success Rate</div>
                <div class="stat-subtitle">Completed orders</div>
              </div>
              <div class="stat-progress">
                <template v-if="isLoading('orders')">
                  <q-skeleton type="text" width="60px" />
                  <q-skeleton type="rect" height="8px" class="q-mt-sm" />
                </template>
                <template v-else>
                  <div class="progress-value">{{ orderSuccessRate }}%</div>
                  <q-linear-progress 
                    :value="orderSuccessRate / 100" 
                    color="green" 
                    class="progress-bar"
                  />
                </template>
              </div>
            </div>
            
            <div class="stat-row">
              <div class="stat-info">
                <div class="stat-title">Customer Satisfaction</div>
                <div class="stat-subtitle">Average rating</div>
              </div>
              <div class="stat-progress">
                <template v-if="isLoading('restaurants')">
                  <q-skeleton type="text" width="60px" />
                  <q-skeleton type="rect" height="8px" class="q-mt-sm" />
                </template>
                <template v-else>
                  <div class="progress-value">{{ avgRating || '4.8' }}/5.0</div>
                  <q-linear-progress 
                    :value="(avgRating || 4.8) / 5" 
                    color="blue" 
                    class="progress-bar"
                  />
                </template>
              </div>
            </div>
            
            <div class="stat-row">
              <div class="stat-info">
                <div class="stat-title">Platform Uptime</div>
                <div class="stat-subtitle">System availability</div>
              </div>
              <div class="stat-progress">
                <div class="progress-value">99.9%</div>
                <q-linear-progress 
                  :value="0.999" 
                  color="purple" 
                  class="progress-bar"
                />
              </div>
            </div>
            
            <div class="stat-row">
              <div class="stat-info">
                <div class="stat-title">Active Riders</div>
                <div class="stat-subtitle">Currently online</div>
              </div>
              <div class="stat-progress">
                <template v-if="isLoading('riders')">
                  <q-skeleton type="text" width="60px" />
                  <q-skeleton type="rect" height="8px" class="q-mt-sm" />
                </template>
                <template v-else>
                  <div class="progress-value">{{ Math.floor(totalRiders * 0.75) }}</div>
                  <q-linear-progress 
                    :value="0.75" 
                    color="orange" 
                    class="progress-bar"
                  />
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- System Status -->
    <div class="system-status-section">
      <div class="section-title">
        <h2>⚡ System Status</h2>
        <p>Platform health monitoring</p>
      </div>
      
      <div class="status-grid">
        <div class="status-card healthy">
          <div class="status-indicator"></div>
          <div class="status-content">
            <div class="status-title">Database</div>
            <div class="status-value">Operational</div>
            <div class="status-details">Response time: 12ms</div>
          </div>
        </div>
        
        <div class="status-card healthy">
          <div class="status-indicator"></div>
          <div class="status-content">
            <div class="status-title">API Server</div>
            <div class="status-value">Operational</div>
            <div class="status-details">Load: 45% CPU</div>
          </div>
        </div>
        
        <div class="status-card" :class="paymentGatewayStatus">
          <div class="status-indicator"></div>
          <div class="status-content">
            <div class="status-title">Payment Gateway</div>
            <div class="status-value">{{ paymentStatus }}</div>
            <div class="status-details">{{ paymentDetails }}</div>
          </div>
        </div>
        
        <div class="status-card healthy">
          <div class="status-indicator"></div>
          <div class="status-content">
            <div class="status-title">CDN</div>
            <div class="status-value">Operational</div>
            <div class="status-details">99.9% uptime</div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"
import { useQuasar } from "quasar"

export default {
  name: "AdminDashboard",
  setup() {
    const store = useStore()
    const router = useRouter()
    const $q = useQuasar()
    
    const revenuePeriod = ref('30d')
    const refreshInterval = ref(null)
    const todayActions = ref(15)
    
    // Computed properties from store
    const user = computed(() => store.getters["auth/getUser"])
    const isAnyLoading = computed(() => store.getters["admin/isAnyLoading"])
    const isLoading = computed(() => (type) => store.getters["admin/isLoading"](type))
    
    // Stats
    const stats = computed(() => store.getters["admin/stats"])
    const totalUsers = computed(() => store.getters["admin/totalUsers"])
    const totalRestaurants = computed(() => store.getters["admin/totalRestaurants"])
    const totalRiders = computed(() => store.getters["admin/totalRiders"])
    const totalOrders = computed(() => store.getters["admin/totalOrders"])
    const revenue = computed(() => store.getters["admin/revenue"])
    const activeUsers = computed(() => store.getters["admin/activeUsers"])
    const avgRating = computed(() => store.getters["admin/avgRating"])
    const revenueFormatted = computed(() => store.getters["admin/revenueFormatted"])
    
    // Quick links with dynamic data
    const quickLinksData = computed(() => store.getters["admin/quickLinks"])
    
    // Recent activities
    const recentActivities = computed(() => store.getters["admin/recentActivities"])
    const displayActivities = computed(() => {
      // If we have data from API, use it, otherwise use default activities
      if (recentActivities.value && recentActivities.value.length > 0) {
        return recentActivities.value.slice(0, 5)
      }
      // Default activities as fallback
      return [
        {
          id: 1,
          type: 'success',
          icon: 'person_add',
          title: 'New Restaurant Partner',
          description: 'Spice Garden Restaurant joined the platform',
          time: '2 minutes ago',
          status: 'completed',
          statusText: 'Approved'
        },
        {
          id: 2,
          type: 'warning',
          icon: 'report',
          title: 'Payment Issue Reported',
          description: 'Customer reported payment failure for Order #1247',
          time: '15 minutes ago',
          status: 'pending',
          statusText: 'Investigating'
        },
        {
          id: 3,
          type: 'info',
          icon: 'security',
          title: 'System Backup Completed',
          description: 'Daily database backup finished successfully',
          time: '1 hour ago',
          status: 'completed',
          statusText: 'Success'
        },
        {
          id: 4,
          type: 'error',
          icon: 'block',
          title: 'Restaurant Suspended',
          description: 'Quality violations reported for Fast Food Corner',
          time: '2 hours ago',
          status: 'action-required',
          statusText: 'Action Required'
        },
        {
          id: 5,
          type: 'success',
          icon: 'trending_up',
          title: 'Revenue Milestone',
          description: 'Monthly revenue target of PKR 2M achieved',
          time: '3 hours ago',
          status: 'completed',
          statusText: 'Achieved'
        }
      ]
    })
    
    // Errors
    const errors = computed(() => store.getters["admin/errors"])
    const hasErrors = computed(() => Object.keys(errors.value).length > 0)
    
    // Computed stats
    const orderSuccessRate = computed(() => {
      // Calculate success rate from orders data
      const orders = store.getters["admin/orders"]
      if (!orders || orders.length === 0) return 96.2
      
      const completedOrders = orders.filter(order => 
        order.status === 'completed' || order.status === 'delivered'
      ).length
      
      return Math.round((completedOrders / orders.length) * 1000) / 10
    })
    
    // System status
    const paymentGatewayStatus = computed(() => {
      // This could be dynamic based on real system health checks
      return Math.random() > 0.3 ? 'healthy' : 'warning'
    })
    
    const paymentStatus = computed(() => {
      return paymentGatewayStatus.value === 'healthy' ? 'Operational' : 'Minor Issues'
    })
    
    const paymentDetails = computed(() => {
      return paymentGatewayStatus.value === 'healthy' 
        ? 'Processing normally' 
        : 'Slower response times'
    })

    // Methods
    const goTo = (path) => {
      router.push(path)
    }

   const refreshData = async () => {
  try {
    await store.dispatch("admin/refreshDashboard")
    $q.notify({
      type: 'positive',
      message: 'Dashboard data refreshed successfully',
      position: 'top-right'
    })
  } catch {
    $q.notify({
      type: 'negative',
      message: 'Failed to refresh dashboard data',
      position: 'top-right'
    })
  }
}

    const retryFetch = async (type) => {
  try {
    switch (type) {
      case 'users':
        await store.dispatch("admin/fetchUsers")
        break
      case 'restaurants':
        await store.dispatch("admin/fetchRestaurants")
        break
      case 'riders':
        await store.dispatch("admin/fetchRiders")
        break
      case 'orders':
        await store.dispatch("admin/fetchOrders")
        break
      case 'analytics':
        await store.dispatch("admin/fetchAnalytics")
        break
    }
    $q.notify({
      type: 'positive',
      message: `${type} data loaded successfully`,
      position: 'top-right'
    })
  } catch (error) {
    console.error(`Error loading ${type} data:`, error) // 👈 ab error use ho gaya
    $q.notify({
      type: 'negative',
      message: `Failed to load ${type} data: ${error.message || error}`,
      position: 'top-right'
    })
  }
}


   const formatTime = (timeString) => {
  if (!timeString) return 'Just now'
  
  // If it's already formatted (like "2 minutes ago"), return as is
  if (typeof timeString === 'string' && timeString.includes('ago')) {
    return timeString
  }
  
  try {
    const date = new Date(timeString)
    const now = new Date()
    const diffInSeconds = Math.floor((now - date) / 1000)

    if (diffInSeconds < 60) return 'Just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    return `${Math.floor(diffInSeconds / 86400)} days ago`
  } catch (error) {
    console.error("Time formatting failed:", error) // 👈 ab error use ho gaya
    return 'Recently'
  }
}

    const setupAutoRefresh = () => {
      // Auto-refresh data every 5 minutes
      refreshInterval.value = setInterval(() => {
        store.dispatch("admin/fetchDashboardData")
      }, 5 * 60 * 1000)
    }

    const loadInitialData = async () => {
      try {
        await store.dispatch("admin/fetchDashboardData")
      } catch (error) {
        console.error("Failed to load initial dashboard data:", error)
        $q.notify({
          type: 'warning',
          message: 'Some dashboard data could not be loaded. Please check your connection.',
          position: 'top-right',
          timeout: 5000
        })
      }
    }

    // Lifecycle hooks
    onMounted(() => {
      loadInitialData()
      setupAutoRefresh()
    })

    onBeforeUnmount(() => {
      if (refreshInterval.value) {
        clearInterval(refreshInterval.value)
      }
    })

    return {
      // Reactive data
      user,
      revenuePeriod,
      todayActions,
      
      // Loading states
      isAnyLoading,
      isLoading,
      
      // Stats
      stats,
      totalUsers,
      totalRestaurants,
      totalRiders,
      totalOrders,
      revenue,
      activeUsers,
      avgRating,
      revenueFormatted,
      orderSuccessRate,
      
      // Data
      quickLinksData,
      displayActivities,
      
      // Errors
      errors,
      hasErrors,
      
      // System status
      paymentGatewayStatus,
      paymentStatus,
      paymentDetails,
      
      // Methods
      goTo,
      refreshData,
      retryFetch,
      formatTime
    }
  },
}
</script>

<style scoped>
/* ===== Variables ===== */
:root {
  --primary-color: #6366f1;
  --primary-dark: #4f46e5;
  --secondary-color: #f8fafc;
  --accent-color: #06b6d4;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --error-color: #ef4444;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --text-light: #94a3b8;
  --background: #f8fafc;
  --card-bg: #ffffff;
  --border-color: #e2e8f0;
  --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --border-radius: 12px;
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ===== Dashboard Base ===== */
.admin-dashboard {
  background: var(--background);
  min-height: 100vh;
  padding: 0;
}

/* ===== Dashboard Header ===== */
.dashboard-header {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-lg);
  margin-bottom: 2rem;
  overflow: hidden;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 2rem 2rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.welcome-section {
  flex: 1;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-subtitle {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin: 0;
  font-weight: 500;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.action-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  transition: var(--transition);
}

.primary-btn {
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.action-btn:hover {
  transform: translateY(-2px);
}

/* ===== User Info Card ===== */
.user-info-card {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

.user-avatar {
  position: relative;
}

.status-indicator {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 3px solid white;
}

.status-indicator.online {
  background: var(--success-color);
}

.user-details {
  flex: 1;
}

.user-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.user-role {
  font-size: 1rem;
  color: var(--primary-color);
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.user-meta {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.user-stats {
  display: flex;
  gap: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  display: block;
}

.stat-label {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
}

.loading-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

.loading-text {
  font-size: 1.1rem;
  color: var(--text-secondary);
}

/* ===== Section Titles ===== */
.section-title {
  margin-bottom: 1.5rem;
}

.section-title h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
}

.section-title p {
  font-size: 1rem;
  color: var(--text-secondary);
  margin: 0;
}

/* ===== Metrics Section ===== */
.metrics-section {
  margin-bottom: 2.5rem;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.metric-card {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--shadow);
  transition: var(--transition);
  position: relative;
  overflow: hidden;
  border-left: 4px solid var(--primary-color);
}

.metric-card::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
  border-radius: 0 0 0 100px;
}

.metric-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.metric-card.revenue { border-left-color: #10b981; }
.metric-card.orders { border-left-color: #6366f1; }
.metric-card.users { border-left-color: #f59e0b; }
.metric-card.rating { border-left-color: #8b5cf6; }

.metric-card {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
}

.metric-icon {
  color: var(--primary-color);
  opacity: 0.8;
}

.metric-content {
  flex: 1;
}

.metric-value {
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  line-height: 1.1;
}

.metric-label {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.metric-period {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.metric-change {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  align-self: flex-start;
}

.metric-change.positive {
  background: rgba(16, 185, 129, 0.1);
  color: var(--success-color);
}

.metric-change.negative {
  background: rgba(239, 68, 68, 0.1);
  color: var(--error-color);
}

.metric-change.neutral {
  background: rgba(100, 116, 139, 0.1);
  color: var(--text-secondary);
}

/* ===== Main Content Grid ===== */
.main-content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 2.5rem;
}

/* ===== Quick Actions Panel ===== */
.quick-actions-panel {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  overflow: hidden;
}

.panel-header {
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid var(--border-color);
}

.panel-header h3 {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
}

.panel-header p {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin: 0;
}

.actions-grid {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.action-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--background);
  border-radius: 10px;
  cursor: pointer;
  transition: var(--transition);
  border: 2px solid transparent;
}

.action-card:hover {
  background: var(--card-bg);
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.action-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-content {
  flex: 1;
}

.action-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.action-description {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.action-stats {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stat-number {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--primary-color);
}

.action-arrow {
  color: var(--text-light);
  transition: var(--transition);
}

.action-card:hover .action-arrow {
  color: var(--primary-color);
  transform: translateX(2px);
}

/* ===== Activity Panel ===== */
.activity-panel {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  overflow: hidden;
}

.activity-list {
  padding: 1.5rem;
  max-height: 400px;
  overflow-y: auto;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border-color);
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
}

.activity-icon.success { background: var(--success-color); }
.activity-icon.warning { background: var(--warning-color); }
.activity-icon.info { background: var(--accent-color); }
.activity-icon.error { background: var(--error-color); }

.activity-content {
  flex: 1;
}

.activity-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.activity-description {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.activity-time {
  font-size: 0.8rem;
  color: var(--text-light);
}

.activity-status {
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  align-self: flex-start;
}

.activity-status.completed {
  background: rgba(16, 185, 129, 0.1);
  color: var(--success-color);
}

.activity-status.pending {
  background: rgba(245, 158, 11, 0.1);
  color: var(--warning-color);
}

.activity-status.action-required {
  background: rgba(239, 68, 68, 0.1);
  color: var(--error-color);
}

.panel-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--border-color);
  background: var(--background);
  text-align: center;
}

/* ===== Analytics Section ===== */
.analytics-section {
  margin-bottom: 2.5rem;
}

.analytics-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.chart-container {
  background: var(--card-bg);
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

.chart-header h4 {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.period-toggle {
  border-radius: 8px;
}

.chart-placeholder {
  padding: 3rem;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-content {
  text-align: center;
}

.placeholder-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin: 1rem 0 0.5rem;
}

.placeholder-description {
  font-size: 0.9rem;
  color: var(--text-light);
  line-height: 1.4;
}

.stats-container {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  overflow: hidden;
}

.stats-header {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--border-color);
}

.stats-header h4 {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.stats-list {
  padding: 1.5rem 2rem 2rem;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.stat-row:last-child {
  margin-bottom: 0;
}

.stat-info {
  flex: 1;
}

.stat-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.stat-subtitle {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.stat-progress {
  flex: 1;
  margin-left: 2rem;
  text-align: right;
}

.progress-value {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  display: block;
}

.progress-bar {
  height: 6px;
  border-radius: 3px;
}

/* ===== System Status Section ===== */
.system-status-section {
  margin-bottom: 2rem;
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.status-card {
  background: var(--card-bg);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--shadow);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: var(--transition);
}

.status-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.status-card.healthy .status-indicator {
  background: var(--success-color);
}

.status-card.warning .status-indicator {
  background: var(--warning-color);
}

.status-card.error .status-indicator {
  background: var(--error-color);
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.status-content {
  flex: 1;
}

.status-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.status-value {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.status-card.healthy .status-value {
  color: var(--success-color);
}

.status-card.warning .status-value {
  color: var(--warning-color);
}

.status-card.error .status-value {
  color: var(--error-color);
}

.status-details {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

/* ===== Responsive Design ===== */
@media (max-width: 1200px) {
  .main-content-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .analytics-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: stretch;
    gap: 1.5rem;
  }
  
  .header-actions {
    justify-content: stretch;
  }
  
  .action-btn {
    flex: 1;
    text-align: center;
  }
  
  .user-info-card {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }
  
  .user-stats {
    justify-content: center;
  }
  
  .metrics-grid {
    grid-template-columns: 1fr;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .metric-card {
    flex-direction: column;
    text-align: center;
  }
  
  .metric-change {
    align-self: center;
  }
}

@media (max-width: 480px) {
  .dashboard-header {
    margin: 0 -1rem 2rem;
    border-radius: 0;
  }
  
  .header-content {
    padding: 1.5rem;
  }
  
  .user-info-card {
    padding: 1.5rem;
  }
  
  .page-title {
    font-size: 1.8rem;
  }
  
  .actions-grid {
    padding: 1rem;
  }
  
  .action-card {
    padding: 1rem;
  }
  
  .chart-placeholder {
    padding: 2rem 1rem;
  }
}
</style>