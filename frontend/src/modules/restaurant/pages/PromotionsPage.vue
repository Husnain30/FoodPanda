<template>
  <div class="page">
    <!-- Header -->
    <div class="header">
      <h1>Promotions & Offers</h1>
      <button class="btn-primary" @click="showModal = true">
        ➕ Create Promotion
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading">
      Loading promotions...
    </div>

    <!-- Error State -->
    <div v-if="error" class="error">
      {{ error }}
    </div>

    <!-- Stats -->
    <div v-if="!loading" class="stats">
      <div class="stat-card">
        <span class="number">{{ activeCount }}</span>
        <span class="label">Active</span>
      </div>
      <div class="stat-card">
        <span class="number">{{ scheduledCount }}</span>
        <span class="label">Scheduled</span>
      </div>
      <div class="stat-card">
        <span class="number">{{ totalPromotions }}</span>
        <span class="label">Total Promotions</span>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!loading && promotions.length === 0" class="empty-state">
      <div class="empty-icon">🎉</div>
      <h3>No promotions yet</h3>
      <p>Create your first promotion to attract more customers</p>
      <button class="btn-primary" @click="showModal = true">
        Create First Promotion
      </button>
    </div>

    <!-- Promotions Grid -->
    <div v-if="!loading && promotions.length > 0" class="promotions">
      <div
        v-for="promo in promotions"
        :key="promo.id"
        class="promo-card"
        :class="promo.status"
      >
        <div class="card-header">
          <span class="status-badge" :class="promo.status">
            {{ formatStatus(promo.status) }}
          </span>
          <div class="actions">
            <button @click="editPromo(promo)" title="Edit">✏️</button>
            <button @click="deletePromo(promo)" title="Delete">🗑️</button>
          </div>
        </div>

        <div class="card-body">
          <div class="icon">{{ getPromotionIcon(promo.type) }}</div>
          <h3>{{ promo.title }}</h3>
          <p>{{ promo.description }}</p>

          <div class="details">
            <div class="detail">
              <span>Type:</span>
              <strong>{{ formatType(promo.type) }}</strong>
            </div>
            <div class="detail">
              <span>Discount:</span>
              <strong>{{ formatDiscount(promo.discount, promo.type) }}</strong>
            </div>
            <div class="detail">
              <span>Duration:</span>
              <strong>{{ formatDate(promo.start_date) }} - {{ formatDate(promo.end_date) }}</strong>
            </div>
            <div class="detail">
              <span>Created:</span>
              <strong>{{ formatDateTime(promo.created_at) }}</strong>
            </div>
          </div>
        </div>

        <div class="card-footer">
          <button
            class="toggle-btn"
            :class="promo.status"
            @click="toggleStatus(promo)"
          >
            {{ promo.status === 'active' ? 'Pause' : 'Activate' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ editing ? 'Edit' : 'Create' }} Promotion</h3>
          <button @click="closeModal">✕</button>
        </div>

        <form @submit.prevent="savePromo">
          <div class="form-group">
            <label>Title *</label>
            <input
              v-model="form.title"
              placeholder="e.g., Weekend Special Offer"
              required
            >
          </div>

          <div class="form-group">
            <label>Description</label>
            <textarea
              v-model="form.description"
              rows="3"
              placeholder="Describe your promotion offer..."
            ></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Type *</label>
              <select v-model="form.type" required>
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
                v-model="form.discount"
                :placeholder="getDiscountPlaceholder(form.type)"
                required
              >
              <small class="hint">{{ getDiscountHint(form.type) }}</small>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Start Date *</label>
              <input
                type="date"
                v-model="form.start_date"
                :min="today"
                required
              >
            </div>

            <div class="form-group">
              <label>End Date *</label>
              <input
                type="date"
                v-model="form.end_date"
                :min="form.start_date || today"
                required
              >
            </div>
          </div>
          <div class="form-row">
  <div class="form-group">
    <label>Status *</label>
    <select v-model="form.status" required>
      <option value="active">Active</option>
      <option value="scheduled">Scheduled</option>
      <option value="paused">Paused</option>
    </select>
  </div>

  <div class="form-group">
    <label>Usage Limit (Optional)</label>
    <input
      v-model="form.usage_limit"
      type="number"
      placeholder="e.g., 100"
    >
    <small class="hint">Maximum number of times this promotion can be used</small>
  </div>
</div>

<div class="form-group">
  <label>Minimum Order (Optional)</label>
  <input
    v-model="form.minimum_order"
    type="number"
    placeholder="e.g., 1000"
  >
  <small class="hint">Minimum order amount in PKR</small>
</div>


          <div class="form-group">
            <label>Minimum Order (Optional)</label>
            <input
              v-model="form.minimum_order"
              type="number"
              placeholder="e.g., 1000"
            >
            <small class="hint">Minimum order amount in PKR</small>
          </div>

          <div class="form-group">
            <label>Usage Limit (Optional)</label>
            <input
              v-model="form.usage_limit"
              type="number"
              placeholder="e.g., 100"
            >
            <small class="hint">Maximum number of times this promotion can be used</small>
          </div>

          <div class="form-actions">
            <button type="button" class="btn-secondary" @click="closeModal">Cancel</button>
            <button type="submit" class="btn-primary" :disabled="loading">
              {{ loading ? 'Saving...' : 'Save' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PromotionPage',

  data() {
    return {
      showModal: false,
      editing: false,
      editingId: null,

      form: {
        title: '',
        description: '',
        type: '',
        discount: '',
        start_date: '',
        end_date: '',
        minimum_order: '',
        usage_limit: '',
           status: 'active'  // Add default status
      }
    };
  },

computed: {
  ...mapGetters('restaurant', [
    'getAllPromotions',
    'getPromotionsLoading',
    'getPromotionsError'
  ]),


promotions() {
  const promos = this.getAllPromotions
  console.log('🔍 Computed promotions TYPE:', typeof promos, promos) // Debug log
  return Array.isArray(promos) ? promos : []
},
  loading() {
    return this.getPromotionsLoading
  },

  error() {
    return this.getPromotionsError
  },
  today() {
    return new Date().toISOString().split('T')[0]
  },

  // Fixed stats calculations
  activeCount() {
    return this.promotions.filter(p => p.status === 'active').length
  },

  scheduledCount() {
    return this.promotions.filter(p => p.status === 'scheduled').length
  },

  totalPromotions() {
    return this.promotions.length
  }
},

async mounted() {
  console.log('🚀 PromotionPage mounted')

  try {
    await this.fetchPromotions()
    console.log('✅ Final promotions after fetch:', this.promotions)
  } catch (error) {
    console.error('❌ Failed to load promotions:', error)
  }
},
methods: {
  ...mapActions('restaurant', [
    'fetchPromotions',
    'createPromotion',    // 👈 Yeh already mapped hai
    'updatePromotion',
    'deletePromotion'
  ]),

    // Format backend data for display
    formatStatus(status) {
      const statusMap = {
        'active': 'Active',
        'scheduled': 'Scheduled',
        'paused': 'Paused',
        'expired': 'Expired'
      }
      return statusMap[status] || status
    },

    formatType(type) {
      const typeMap = {
        'percentage': 'Percentage',
        'fixed': 'Fixed Amount',
        'bogo': 'BOGO',
        'free_delivery': 'Free Delivery'
      }
      return typeMap[type] || type
    },

    formatDiscount(discount, type) {
      if (type === 'percentage') {
        return `${discount}%`
      } else if (type === 'fixed') {
        return `PKR ${discount}`
      } else if (type === 'bogo') {
        return 'Buy 1 Get 1'
      } else if (type === 'free_delivery') {
        return 'Free Delivery'
      }
      return discount
    },

    getPromotionIcon(type) {
      const iconMap = {
        'percentage': '💰',
        'fixed': '💵',
        'bogo': '🍕',
        'free_delivery': '🚚'
      }
      return iconMap[type] || '🎉'
    },

    formatDate(date) {
      if (!date) return 'N/A'
      return new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    },

    formatDateTime(dateTime) {
      if (!dateTime) return 'N/A'
      return new Date(dateTime).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      })
    },

    getDiscountPlaceholder(type) {
      switch(type) {
        case 'percentage': return 'e.g., 20'
        case 'fixed': return 'e.g., 500'
        case 'bogo': return 'e.g., 1'
        case 'free_delivery': return 'Free'
        default: return 'Enter discount value'
      }
    },

    getDiscountHint(type) {
      switch(type) {
        case 'percentage': return 'Enter percentage without % sign'
        case 'fixed': return 'Enter amount in PKR'
        case 'bogo': return 'Number of free items'
        case 'free_delivery': return 'Free delivery service'
        default: return ''
      }
    },

    editPromo(promo) {
  this.editing = true;
  this.editingId = promo.id;
  this.form = {
    title: promo.title,
    description: promo.description,
    type: promo.type,
    discount: promo.discount,
    start_date: promo.start_date,
    end_date: promo.end_date,
    minimum_order: promo.minimum_order || '',
    usage_limit: promo.usage_limit || '',
    status: promo.status || 'active'  // Add status field
  };
  this.showModal = true;
},

   async deletePromo(promo) {
  if (confirm(`Delete "${promo.title}"?`)) {
    try {
      await this.deletePromotion(promo.id)
      this.$q.notify({
        type: 'positive',
        message: 'Promotion deleted successfully',
        position: 'top'
      })
    } catch (error) {
      console.error('Delete Promotion Error:', error) // 👈 error log
      this.$q.notify({
        type: 'negative',
        message: 'Failed to delete promotion: ' + (error.message || 'Unknown error'),
        position: 'top'
      })
    }
  }
}
,
   async toggleStatus(promo) {
  const newStatus = promo.status === 'active' ? 'paused' : 'active'

  try {
    await this.updatePromotion({
      id: promo.id,
      data: { status: newStatus }
    })

    this.$q.notify({
      type: 'positive',
      message: `Promotion ${newStatus}`,
      position: 'top'
    })
  } catch (error) {
    console.error('Toggle Status Error:', error) // 👈 error log
    this.$q.notify({
      type: 'negative',
      message: 'Failed to update promotion status: ' + (error.message || 'Unknown error'),
      position: 'top'
    })
  }
},

    closeModal() {
      this.showModal = false;
      this.editing = false;
      this.editingId = null;
      this.resetForm();
    },

   resetForm() {
  this.form = {
    title: '',
    description: '',
    type: '',
    discount: '',
    start_date: '',
    end_date: '',
    minimum_order: '',
    usage_limit: '',
    status: 'active'  // Add default status
  };
},

  async savePromo() {
  try {
    if (this.editing) {
      await this.updatePromotion({
        id: this.editingId,
        data: this.form
      })
    } else {
      await this.createPromotion(this.form)
    }

    this.closeModal()
    this.$q.notify({
      type: 'positive',
      message: this.editing ? 'Promotion updated successfully' : 'Promotion created successfully',
      position: 'top'
    })
  } catch (error) {
    console.error('Save Promotion Error:', error)
    this.$q.notify({
      type: 'negative',
      message: 'Failed to save promotion: ' + (error.message || 'Unknown error'),
      position: 'top'
    })
  }
}

  }
};
</script>
<style scoped>
.page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: system-ui, sans-serif;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header h1 {
  margin: 0;
  color: #2d3436;
  font-size: 2rem;
}

.btn-primary, .btn-secondary {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.btn-primary {
  background: #6c5ce7;
  color: white;
}

.btn-secondary {
  background: #ddd;
  color: #333;
}

/* Stats */
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  text-align: center;
}

.number {
  display: block;
  font-size: 1.8rem;
  font-weight: bold;
  color: #2d3436;
}

.label {
  color: #636e72;
  font-size: 0.9rem;
}

/* Promotions Grid */
.promotions {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.promo-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
  border-left: 4px solid #ddd;
}

.promo-card.active {
  border-left-color: #00b894;
}

.promo-card.scheduled {
  border-left-color: #fdcb6e;
}

.promo-card.paused {
  border-left-color: #e17055;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: capitalize;
}

.status-badge.active {
  background: #d1f2eb;
  color: #00b894;
}

.status-badge.scheduled {
  background: #fef9e7;
  color: #fdcb6e;
}

.status-badge.paused {
  background: #fadbd8;
  color: #e17055;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.actions button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
}

.actions button:hover {
  background: #e9ecef;
}

.card-body {
  padding: 1.5rem;
  text-align: center;
}

.icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.card-body h3 {
  margin: 0 0 0.5rem 0;
  color: #2d3436;
}

.card-body p {
  color: #636e72;
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
}

.details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.detail {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
}

.detail span {
  color: #636e72;
}

.card-footer {
  padding: 1rem;
  border-top: 1px solid #e9ecef;
  background: #f8f9fa;
}

.toggle-btn {
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.toggle-btn.active {
  background: #e17055;
  color: white;
}

.toggle-btn:not(.active) {
  background: #00b894;
  color: white;
}

/* Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
}

.modal-header h3 {
  margin: 0;
}

.modal-header button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

form {
  padding: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #2d3436;
}

input, select, textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #6c5ce7;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e9ecef;
}

/* Responsive */
@media (max-width: 768px) {
  .page {
    padding: 1rem;
  }

  .header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .promotions {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }
}
</style>
