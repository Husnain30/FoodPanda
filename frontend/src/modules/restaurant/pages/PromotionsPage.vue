<!-- src/restaurant/pages/PromotionsPage.vue -->
<template>
  <div class="promotions-page">
    <!-- Page Header -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">Promotions & Offers</h1>
        <p class="page-subtitle">Manage your restaurant promotions and special offers</p>
      </div>
      <div class="header-actions">
        <button class="btn-secondary" @click="showFilters = !showFilters">
          <i class="icon">🔍</i>
          {{ showFilters ? 'Hide Filters' : 'Show Filters' }}
        </button>
        <button class="btn-primary" @click="showCreateModal = true">
          <i class="icon">➕</i>
          Create New Promotion
        </button>
      </div>
    </div>

    <!-- Filters Section -->
    <div class="filters-section" v-show="showFilters">
      <div class="filters-grid">
        <div class="filter-group">
          <label>Status</label>
          <select v-model="filters.status" class="filter-select">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="scheduled">Scheduled</option>
            <option value="expired">Expired</option>
            <option value="paused">Paused</option>
          </select>
        </div>
        <div class="filter-group">
          <label>Type</label>
          <select v-model="filters.type" class="filter-select">
            <option value="">All Types</option>
            <option value="percentage">Percentage Discount</option>
            <option value="fixed">Fixed Amount</option>
            <option value="bogo">Buy One Get One</option>
            <option value="free_delivery">Free Delivery</option>
          </select>
        </div>
        <div class="filter-group">
          <label>Date Range</label>
          <input type="date" v-model="filters.startDate" class="filter-input" placeholder="Start Date">
        </div>
        <div class="filter-group">
          <label>&nbsp;</label>
          <input type="date" v-model="filters.endDate" class="filter-input" placeholder="End Date">
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="stats-section">
      <div class="stats-grid">
        <div class="stat-card active">
          <div class="stat-icon">🟢</div>
          <div class="stat-content">
            <span class="stat-number">8</span>
            <span class="stat-label">Active Promotions</span>
          </div>
        </div>
        <div class="stat-card scheduled">
          <div class="stat-icon">⏱️</div>
          <div class="stat-content">
            <span class="stat-number">3</span>
            <span class="stat-label">Scheduled</span>
          </div>
        </div>
        <div class="stat-card revenue">
          <div class="stat-icon">💰</div>
          <div class="stat-content">
            <span class="stat-number">PKR 125K</span>
            <span class="stat-label">Total Savings Given</span>
          </div>
        </div>
        <div class="stat-card customers">
          <div class="stat-icon">👥</div>
          <div class="stat-content">
            <span class="stat-number">1,847</span>
            <span class="stat-label">Customers Reached</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Promotions List -->
    <div class="promotions-section">
      <div class="section-header">
        <h2>All Promotions</h2>
        <div class="view-toggles">
          <button 
            class="toggle-btn" 
            :class="{ active: viewMode === 'grid' }" 
            @click="viewMode = 'grid'"
          >
            <i class="icon">▦</i> Grid
          </button>
          <button 
            class="toggle-btn" 
            :class="{ active: viewMode === 'list' }" 
            @click="viewMode = 'list'"
          >
            <i class="icon">☰</i> List
          </button>
        </div>
      </div>

      <!-- Grid View -->
      <div v-if="viewMode === 'grid'" class="promotions-grid">
        <div 
          v-for="promotion in filteredPromotions" 
          :key="promotion.id" 
          class="promotion-card"
          :class="promotion.status"
        >
          <div class="promotion-header">
            <div class="promotion-status-badge" :class="promotion.status">
              {{ getStatusText(promotion.status) }}
            </div>
            <div class="promotion-actions">
              <button class="action-btn" @click="editPromotion(promotion)">
                <i class="icon">✏️</i>
              </button>
              <button class="action-btn" @click="duplicatePromotion(promotion)">
                <i class="icon">📋</i>
              </button>
              <button class="action-btn danger" @click="deletePromotion(promotion)">
                <i class="icon">🗑️</i>
              </button>
            </div>
          </div>

          <div class="promotion-content">
            <div class="promotion-icon">{{ promotion.icon }}</div>
            <h3 class="promotion-title">{{ promotion.title }}</h3>
            <p class="promotion-description">{{ promotion.description }}</p>
            
            <div class="promotion-details">
              <div class="detail-item">
                <span class="detail-label">Discount:</span>
                <span class="detail-value">{{ promotion.discount }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Valid Until:</span>
                <span class="detail-value">{{ formatDate(promotion.endDate) }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Used:</span>
                <span class="detail-value">{{ promotion.usageCount }}/{{ promotion.usageLimit || '∞' }}</span>
              </div>
            </div>

            <div class="promotion-stats">
              <div class="stat-item">
                <span class="stat-number">{{ promotion.views }}</span>
                <span class="stat-text">Views</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">{{ promotion.clicks }}</span>
                <span class="stat-text">Clicks</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">{{ Math.round((promotion.clicks / promotion.views) * 100) }}%</span>
                <span class="stat-text">CTR</span>
              </div>
            </div>
          </div>

          <div class="promotion-footer">
            <button 
              class="toggle-status-btn" 
              :class="promotion.status"
              @click="togglePromotionStatus(promotion)"
            >
              {{ promotion.status === 'active' ? 'Pause' : 'Activate' }}
            </button>
            <span class="creation-date">Created {{ formatDate(promotion.createdAt) }}</span>
          </div>
        </div>
      </div>

      <!-- List View -->
      <div v-else class="promotions-list">
        <div class="list-header">
          <div class="col-title">Title</div>
          <div class="col-discount">Discount</div>
          <div class="col-period">Period</div>
          <div class="col-usage">Usage</div>
          <div class="col-status">Status</div>
          <div class="col-actions">Actions</div>
        </div>

        <div 
          v-for="promotion in filteredPromotions" 
          :key="promotion.id" 
          class="list-item"
          :class="promotion.status"
        >
          <div class="col-title">
            <div class="promotion-icon-small">{{ promotion.icon }}</div>
            <div class="title-content">
              <span class="title-text">{{ promotion.title }}</span>
              <span class="title-description">{{ promotion.description }}</span>
            </div>
          </div>
          <div class="col-discount">{{ promotion.discount }}</div>
          <div class="col-period">
            <div class="period-dates">
              {{ formatDate(promotion.startDate) }} - {{ formatDate(promotion.endDate) }}
            </div>
          </div>
          <div class="col-usage">
            <div class="usage-bar">
              <div 
                class="usage-fill" 
                :style="{ width: (promotion.usageCount / (promotion.usageLimit || 100)) * 100 + '%' }"
              ></div>
            </div>
            <span class="usage-text">{{ promotion.usageCount }}/{{ promotion.usageLimit || '∞' }}</span>
          </div>
          <div class="col-status">
            <span class="status-badge" :class="promotion.status">
              {{ getStatusText(promotion.status) }}
            </span>
          </div>
          <div class="col-actions">
            <button class="action-btn" @click="editPromotion(promotion)">✏️</button>
            <button class="action-btn" @click="duplicatePromotion(promotion)">📋</button>
            <button class="action-btn danger" @click="deletePromotion(promotion)">🗑️</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ editingPromotion ? 'Edit Promotion' : 'Create New Promotion' }}</h3>
          <button class="close-btn" @click="closeModal">✕</button>
        </div>
        
        <form @submit.prevent="savePromotion" class="promotion-form">
          <div class="form-grid">
            <div class="form-group full-width">
              <label>Promotion Title *</label>
              <input 
                type="text" 
                v-model="currentPromotion.title" 
                class="form-input" 
                placeholder="e.g., Summer Special 20% Off"
                required
              >
            </div>

            <div class="form-group full-width">
              <label>Description</label>
              <textarea 
                v-model="currentPromotion.description" 
                class="form-textarea" 
                placeholder="Brief description of the promotion"
                rows="3"
              ></textarea>
            </div>

            <div class="form-group">
              <label>Promotion Type *</label>
              <select v-model="currentPromotion.type" class="form-select" required>
                <option value="">Select Type</option>
                <option value="percentage">Percentage Discount</option>
                <option value="fixed">Fixed Amount Discount</option>
                <option value="bogo">Buy One Get One</option>
                <option value="free_delivery">Free Delivery</option>
              </select>
            </div>

            <div class="form-group">
              <label>Discount Value *</label>
              <input 
                type="text" 
                v-model="currentPromotion.discount" 
                class="form-input" 
                placeholder="e.g., 20% or PKR 500"
                required
              >
            </div>

            <div class="form-group">
              <label>Start Date *</label>
              <input 
                type="datetime-local" 
                v-model="currentPromotion.startDate" 
                class="form-input" 
                required
              >
            </div>

            <div class="form-group">
              <label>End Date *</label>
              <input 
                type="datetime-local" 
                v-model="currentPromotion.endDate" 
                class="form-input" 
                required
              >
            </div>

            <div class="form-group">
              <label>Usage Limit</label>
              <input 
                type="number" 
                v-model="currentPromotion.usageLimit" 
                class="form-input" 
                placeholder="Leave blank for unlimited"
              >
            </div>

            <div class="form-group">
              <label>Minimum Order Amount</label>
              <input 
                type="number" 
                v-model="currentPromotion.minOrderAmount" 
                class="form-input" 
                placeholder="PKR"
              >
            </div>

            <div class="form-group full-width">
              <label>Icon (Emoji)</label>
              <input 
                type="text" 
                v-model="currentPromotion.icon" 
                class="form-input" 
                placeholder="🎉"
                maxlength="2"
              >
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="btn-secondary" @click="closeModal">Cancel</button>
            <button type="submit" class="btn-primary">
              {{ editingPromotion ? 'Update Promotion' : 'Create Promotion' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PromotionsPage",
  data() {
    return {
      showFilters: false,
      showCreateModal: false,
      viewMode: 'grid',
      editingPromotion: null,
      
      filters: {
        status: '',
        type: '',
        startDate: '',
        endDate: ''
      },
      
      currentPromotion: {
        title: '',
        description: '',
        type: '',
        discount: '',
        startDate: '',
        endDate: '',
        usageLimit: null,
        minOrderAmount: null,
        icon: '🎉'
      },
      
      promotions: [
        {
          id: 1,
          title: "Summer Special 20% Off",
          description: "Get 20% off on all menu items this summer season",
          type: "percentage",
          discount: "20%",
          status: "active",
          startDate: "2024-06-01T00:00:00",
          endDate: "2024-08-31T23:59:59",
          usageCount: 245,
          usageLimit: 500,
          minOrderAmount: 1000,
          views: 2840,
          clicks: 567,
          icon: "☀️",
          createdAt: "2024-05-28T10:00:00"
        },
        {
          id: 2,
          title: "Free Delivery Weekend",
          description: "Free delivery on all orders during weekends",
          type: "free_delivery",
          discount: "Free Delivery",
          status: "active",
          startDate: "2024-07-01T00:00:00",
          endDate: "2024-12-31T23:59:59",
          usageCount: 89,
          usageLimit: null,
          minOrderAmount: 500,
          views: 1520,
          clicks: 234,
          icon: "🚚",
          createdAt: "2024-06-25T14:30:00"
        },
        {
          id: 3,
          title: "Buy 2 Get 1 Free Pizza",
          description: "Order any 2 pizzas and get the 3rd one absolutely free",
          type: "bogo",
          discount: "Buy 2 Get 1 Free",
          status: "scheduled",
          startDate: "2024-09-01T00:00:00",
          endDate: "2024-09-30T23:59:59",
          usageCount: 0,
          usageLimit: 200,
          minOrderAmount: 1500,
          views: 0,
          clicks: 0,
          icon: "🍕",
          createdAt: "2024-08-15T09:15:00"
        },
        {
          id: 4,
          title: "Student Discount 15%",
          description: "Special discount for students with valid ID",
          type: "percentage",
          discount: "15%",
          status: "paused",
          startDate: "2024-03-01T00:00:00",
          endDate: "2024-08-31T23:59:59",
          usageCount: 156,
          usageLimit: 1000,
          minOrderAmount: 800,
          views: 980,
          clicks: 187,
          icon: "🎓",
          createdAt: "2024-02-28T16:45:00"
        },
        {
          id: 5,
          title: "Eid Special PKR 500 Off",
          description: "Celebrate Eid with PKR 500 off on orders above PKR 3000",
          type: "fixed",
          discount: "PKR 500",
          status: "expired",
          startDate: "2024-04-10T00:00:00",
          endDate: "2024-04-15T23:59:59",
          usageCount: 78,
          usageLimit: 100,
          minOrderAmount: 3000,
          views: 1240,
          clicks: 198,
          icon: "🌙",
          createdAt: "2024-04-05T11:20:00"
        }
      ]
    };
  },
  
  computed: {
    filteredPromotions() {
      let filtered = this.promotions;
      
      if (this.filters.status) {
        filtered = filtered.filter(p => p.status === this.filters.status);
      }
      
      if (this.filters.type) {
        filtered = filtered.filter(p => p.type === this.filters.type);
      }
      
      if (this.filters.startDate) {
        filtered = filtered.filter(p => new Date(p.startDate) >= new Date(this.filters.startDate));
      }
      
      if (this.filters.endDate) {
        filtered = filtered.filter(p => new Date(p.endDate) <= new Date(this.filters.endDate));
      }
      
      return filtered;
    }
  },
  
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    },
    
    getStatusText(status) {
      const statusMap = {
        active: 'Active',
        scheduled: 'Scheduled',
        expired: 'Expired',
        paused: 'Paused'
      };
      return statusMap[status] || status;
    },
    
    editPromotion(promotion) {
      this.editingPromotion = promotion;
      this.currentPromotion = { ...promotion };
      this.showCreateModal = true;
    },
    
    duplicatePromotion(promotion) {
      const duplicated = {
        ...promotion,
        id: Date.now(),
        title: promotion.title + ' (Copy)',
        status: 'scheduled',
        usageCount: 0,
        views: 0,
        clicks: 0,
        createdAt: new Date().toISOString()
      };
      this.promotions.unshift(duplicated);
    },
    
    deletePromotion(promotion) {
      if (confirm(`Are you sure you want to delete "${promotion.title}"?`)) {
        const index = this.promotions.findIndex(p => p.id === promotion.id);
        if (index > -1) {
          this.promotions.splice(index, 1);
        }
      }
    },
    
    togglePromotionStatus(promotion) {
      if (promotion.status === 'active') {
        promotion.status = 'paused';
      } else if (promotion.status === 'paused') {
        promotion.status = 'active';
      }
    },
    
    closeModal() {
      this.showCreateModal = false;
      this.editingPromotion = null;
      this.resetCurrentPromotion();
    },
    
    resetCurrentPromotion() {
      this.currentPromotion = {
        title: '',
        description: '',
        type: '',
        discount: '',
        startDate: '',
        endDate: '',
        usageLimit: null,
        minOrderAmount: null,
        icon: '🎉'
      };
    },
    
    savePromotion() {
      if (this.editingPromotion) {
        // Update existing promotion
        const index = this.promotions.findIndex(p => p.id === this.editingPromotion.id);
        if (index > -1) {
          this.promotions[index] = { ...this.currentPromotion, id: this.editingPromotion.id };
        }
      } else {
        // Create new promotion
        const newPromotion = {
          ...this.currentPromotion,
          id: Date.now(),
          status: 'scheduled',
          usageCount: 0,
          views: 0,
          clicks: 0,
          createdAt: new Date().toISOString()
        };
        this.promotions.unshift(newPromotion);
      }
      
      this.closeModal();
    }
  }
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
  --info-color: #74b9ff;
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

/* Main Layout */
.promotions-page {
  min-height: 100vh;
  background: var(--background);
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Page Header */
.page-header {
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

/* Filters Section */
.filters-section {
  background: var(--card-background);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow);
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
}

.filter-select, .filter-input {
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 0.9rem;
  transition: var(--transition);
}

.filter-select:focus, .filter-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.1);
}

/* Stats Section */
.stats-section {
  margin-bottom: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: var(--card-background);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: var(--shadow);
  transition: var(--transition);
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
}

.stat-icon {
  font-size: 2rem;
  line-height: 1;
}

.stat-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-number {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
}

/* Promotions Section */
.promotions-section {
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

.section-header h2 {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-primary);
}

.view-toggles {
  display: flex;
  gap: 0.5rem;
}

.toggle-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  background: transparent;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.toggle-btn:hover {
  background: var(--background);
}

.toggle-btn.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

/* Grid View */
.promotions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
}

.promotion-card {
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  overflow: hidden;
  transition: var(--transition);
  position: relative;
}

.promotion-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}

.promotion-card.active {
  border-left: 4px solid var(--success-color);
}

.promotion-card.scheduled {
  border-left: 4px solid var(--warning-color);
}

.promotion-card.expired {
  border-left: 4px solid var(--text-light);
  opacity: 0.7;
}

.promotion-card.paused {
  border-left: 4px solid var(--error-color);
}

.promotion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: var(--background);
  border-bottom: 1px solid var(--border-color);
}

.promotion-status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.promotion-status-badge.active {
  background: rgba(0, 184, 148, 0.1);
  color: var(--success-color);
}

.promotion-status-badge.scheduled {
  background: rgba(253, 203, 110, 0.1);
  color: var(--warning-color);
}

.promotion-status-badge.expired {
  background: rgba(178, 190, 195, 0.1);
  color: var(--text-light);
}

.promotion-status-badge.paused {
  background: rgba(225, 112, 85, 0.1);
  color: var(--error-color);
}

.promotion-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn:hover {
  background: var(--background);
}

.action-btn.danger:hover {
  background: rgba(225, 112, 85, 0.1);
  color: var(--error-color);
}

.promotion-content {
  padding: 1.5rem;
}

.promotion-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-align: center;
}

.promotion-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
  text-align: center;
}

.promotion-description {
  color: var(--text-secondary);
  text-align: center;
  margin: 0 0 1.5rem 0;
  line-height: 1.5;
}

.promotion-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.detail-value {
  font-size: 0.9rem;
  color: var(--text-primary);
  font-weight: 600;
}

.promotion-stats {
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  background: var(--background);
  border-radius: var(--border-radius);
  margin-bottom: 1.5rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.stat-number {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
}

.stat-text {
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.promotion-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: var(--background);
  border-top: 1px solid var(--border-color);
}

.toggle-status-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
}

.toggle-status-btn.active {
  background: var(--error-color);
  color: white;
  border-color: var(--error-color);
}

.toggle-status-btn:not(.active) {
  background: var(--success-color);
  color: white;
  border-color: var(--success-color);
}

.toggle-status-btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow);
}

.creation-date {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

/* List View */
.promotions-list {
  padding: 0;
}

.list-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr 1fr 1fr 0.5fr;
  gap: 1rem;
  padding: 1rem 2rem;
  background: var(--background);
  border-bottom: 1px solid var(--border-color);
  font-weight: 600;
  color: var(--text-secondary);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.list-item {
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr 1fr 1fr 0.5fr;
  gap: 1rem;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--border-color);
  transition: var(--transition);
}

.list-item:hover {
  background: rgba(108, 92, 231, 0.03);
}

.list-item:last-child {
  border-bottom: none;
}

.col-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.promotion-icon-small {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.title-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.title-text {
  font-weight: 600;
  color: var(--text-primary);
}

.title-description {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.3;
}

.col-discount {
  display: flex;
  align-items: center;
  font-weight: 600;
  color: var(--text-primary);
}

.col-period {
  display: flex;
  align-items: center;
}

.period-dates {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.col-usage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
}

.usage-bar {
  width: 100%;
  height: 6px;
  background: var(--border-color);
  border-radius: 3px;
  overflow: hidden;
}

.usage-fill {
  height: 100%;
  background: var(--primary-color);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.usage-text {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.col-status {
  display: flex;
  align-items: center;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status-badge.active {
  background: rgba(0, 184, 148, 0.1);
  color: var(--success-color);
}

.status-badge.scheduled {
  background: rgba(253, 203, 110, 0.1);
  color: var(--warning-color);
}

.status-badge.expired {
  background: rgba(178, 190, 195, 0.1);
  color: var(--text-light);
}

.status-badge.paused {
  background: rgba(225, 112, 85, 0.1);
  color: var(--error-color);
}

.col-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: var(--card-background);
  border-radius: var(--border-radius);
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--border-color);
}

.modal-header h3 {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-primary);
}

.close-btn {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-secondary);
  transition: var(--transition);
}

.close-btn:hover {
  color: var(--error-color);
  transform: rotate(90deg);
}

.promotion-form {
  padding: 2rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
}

.form-input, .form-select, .form-textarea {
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 0.95rem;
  transition: var(--transition);
  font-family: inherit;
}

.form-input:focus, .form-select:focus, .form-textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .promotions-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .promotions-page {
    padding: 1rem;
  }
  
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .header-actions {
    width: 100%;
    flex-wrap: wrap;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .promotions-grid {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
  
  .list-header, .list-item {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .col-title, .col-discount, .col-period, .col-usage, .col-status, .col-actions {
    padding: 0.5rem 0;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .modal-content {
    margin: 0;
    border-radius: 0;
    max-height: 100vh;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .btn-primary, .btn-secondary {
    width: 100%;
    justify-content: center;
  }
}
</style>