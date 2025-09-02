<template>
  <div class="users-table-container">
    <!-- Search and Filters -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="row q-gutter-md items-end">
          <div class="col-12 col-md-4">
            <q-input
              v-model="searchQuery"
              filled
              placeholder="Search users by name, email, or phone..."
              debounce="300"
              clearable
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          
          <div class="col-6 col-md-2">
            <q-select
              v-model="statusFilter"
              filled
              :options="statusOptions"
              label="Status"
              emit-value
              map-options
              clearable
            />
          </div>
          
          <div class="col-6 col-md-2">
            <q-select
              v-model="roleFilter"
              filled
              :options="roleOptions"
              label="Role"
              emit-value
              map-options
              clearable
            />
          </div>
          
          <div class="col-12 col-md-3">
            <div class="row q-gutter-sm">
              <q-btn
                flat
                color="primary"
                icon="filter_list_off"
                label="Clear Filters"
                @click="clearFilters"
                :disable="!hasActiveFilters"
              />
              <q-btn
                outline
                color="primary"
                icon="refresh"
                label="Refresh"
                @click="$emit('refresh')"
                :loading="loading"
              />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Users Table -->
    <q-table
      :rows="filteredUsers"
      :columns="columns"
      :loading="loading"
      :pagination="pagination"
      @update:pagination="pagination = $event"
      row-key="id"
      class="users-table"
      :rows-per-page-options="[10, 25, 50, 100]"
    >
      <!-- Loading slot -->
      <template v-slot:loading>
        <q-inner-loading showing color="primary">
          <q-spinner-grid size="50px" />
          <div class="q-mt-md text-center">
            <div class="text-h6">Loading Users</div>
            <div class="text-grey-6">Fetching user data from server...</div>
          </div>
        </q-inner-loading>
      </template>
      
      <!-- No data slot -->
      <template v-slot:no-data>
        <div class="full-width column flex-center q-pa-lg">
          <q-icon 
            :name="hasActiveFilters ? 'search_off' : 'people_outline'" 
            size="3em" 
            class="q-mb-md text-grey-5" 
          />
          <div class="text-h6 text-grey-6 q-mb-sm">
            {{ hasActiveFilters ? 'No users match your filters' : 'No users found' }}
          </div>
          <div class="text-body2 text-grey-5 q-mb-lg">
            {{ hasActiveFilters ? 'Try adjusting your search criteria' : 'Users will appear here when added to the system' }}
          </div>
          <div class="row q-gutter-sm">
            <q-btn
              v-if="hasActiveFilters"
              flat
              color="primary"
              label="Clear Filters"
              icon="filter_list_off"
              @click="clearFilters"
            />
            <q-btn
              outline
              color="primary" 
              label="Refresh Data"
              icon="refresh"
              @click="$emit('refresh')"
            />
          </div>
        </div>
      </template>

      <!-- Custom column templates -->
      <template v-slot:body-cell-avatar="props">
        <q-td :props="props">
          <q-avatar size="40px">
            <img 
              v-if="props.row.avatar" 
              :src="props.row.avatar" 
              :alt="props.row.name"
              @error="handleImageError"
            />
            <q-icon v-else name="person" color="grey-5" />
          </q-avatar>
        </q-td>
      </template>

      <template v-slot:body-cell-name="props">
        <q-td :props="props">
          <div class="column">
            <div class="text-weight-medium">{{ props.row.name || 'N/A' }}</div>
            <div class="text-caption text-grey-6">ID: {{ props.row.id }}</div>
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-contact="props">
        <q-td :props="props">
          <div class="column">
            <div class="text-body2">{{ props.row.email || 'No email' }}</div>
            <div class="text-caption text-grey-6">{{ props.row.phone || 'No phone' }}</div>
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge
            :color="getStatusColor(props.row.status)"
            :label="getStatusLabel(props.row.status)"
            text-color="white"
            class="q-px-sm"
          />
          <div v-if="props.row.email_verified_at" class="q-mt-xs">
            <q-badge
              color="positive"
              text-color="white"
              icon="verified"
              label="Verified"
              class="text-caption"
            />
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-role="props">
        <q-td :props="props">
          <q-chip
            :color="getRoleColor(props.row.role)"
            text-color="white"
            :label="getRoleLabel(props.row.role)"
            size="sm"
          />
        </q-td>
      </template>

      <template v-slot:body-cell-created_at="props">
        <q-td :props="props">
          <div class="column">
            <div class="text-body2">{{ formatDate(props.row.created_at) }}</div>
            <div class="text-caption text-grey-6">{{ getRelativeTime(props.row.created_at) }}</div>
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <div class="row q-gutter-xs no-wrap">
            <q-btn
              flat
              round
              color="primary"
              icon="visibility"
              size="sm"
              @click="viewUser(props.row)"
            >
              <q-tooltip class="text-body2">View Details</q-tooltip>
            </q-btn>
            
            <q-btn
              flat
              round
              color="warning"
              icon="edit"
              size="sm"
              @click="editUser(props.row)"
            >
              <q-tooltip class="text-body2">Edit User</q-tooltip>
            </q-btn>
            
            <q-btn
              flat
              round
              :color="props.row.status === 'active' ? 'negative' : 'positive'"
              :icon="props.row.status === 'active' ? 'block' : 'check_circle'"
              size="sm"
              @click="toggleUserStatus(props.row)"
              :loading="userActionLoading[props.row.id]"
            >
              <q-tooltip class="text-body2">
                {{ props.row.status === 'active' ? 'Suspend User' : 'Activate User' }}
              </q-tooltip>
            </q-btn>
            
            <q-btn
              flat
              round
              color="negative"
              icon="delete"
              size="sm"
              @click="deleteUser(props.row)"
              :loading="userActionLoading[props.row.id]"
            >
              <q-tooltip class="text-body2">Delete User</q-tooltip>
            </q-btn>
          </div>
        </q-td>
      </template>

      <!-- Table top slot for showing count -->
      <template v-slot:top>
        <div class="row full-width items-center">
          <div class="col">
            <div class="text-h6">Users ({{ filteredUsers.length }})</div>
            <div class="text-caption text-grey-6">
              {{ hasActiveFilters ? `Filtered from ${users.length} total` : 'Total users in system' }}
            </div>
          </div>
          <div class="col-auto">
            <q-space />
          </div>
        </div>
      </template>
    </q-table>
  </div>
  
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useQuasar, date } from 'quasar'
import { useStore } from 'vuex'


export default {
  name: 'UsersTable',
  props: {
    users: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['refresh', 'user-updated', 'edit-user'],
  setup(props, { emit }) {
    const $q = useQuasar()
    const store = useStore()

    // Reactive data
    const searchQuery = ref('')
    const statusFilter = ref(null)
    const roleFilter = ref(null)
    const userActionLoading = ref({})

    const pagination = ref({
      page: 1,
      rowsPerPage: 25,
      sortBy: 'created_at',
      descending: true
    })

    // Filter options
    const statusOptions = [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
      { label: 'Suspended', value: 'suspended' }
    ]

    const roleOptions = [
      { label: 'Customer', value: 'customer' },
      { label: 'Admin', value: 'admin' },
      { label: 'Support', value: 'support' }
    ]

    // Table columns
    const columns = [
      {
        name: 'avatar',
        label: '',
        field: 'avatar',
        align: 'center',
        style: 'width: 60px',
        headerStyle: 'width: 60px'
      },
      {
        name: 'name',
        label: 'Name',
        field: 'name',
        align: 'left',
        sortable: true,
        style: 'width: 180px'
      },
      {
        name: 'contact',
        label: 'Contact Info',
        field: 'email',
        align: 'left',
        sortable: true,
        style: 'width: 220px'
      },
      {
        name: 'role',
        label: 'Role',
        field: 'role',
        align: 'center',
        sortable: true,
        style: 'width: 100px'
      },
      {
        name: 'status',
        label: 'Status',
        field: 'status',
        align: 'center',
        sortable: true,
        style: 'width: 120px'
      },
      {
        name: 'created_at',
        label: 'Join Date',
        field: 'created_at',
        align: 'center',
        sortable: true,
        style: 'width: 140px'
      },
      {
        name: 'actions',
        label: 'Actions',
        field: 'actions',
        align: 'center',
        style: 'width: 160px',
        headerStyle: 'width: 160px'
      }
    ]

    // Computed properties
    const hasActiveFilters = computed(() => 
      searchQuery.value || statusFilter.value || roleFilter.value
    )

    const filteredUsers = computed(() => {
      let filtered = [...props.users]

      // Apply search filter
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(user =>
          user.name?.toLowerCase().includes(query) ||
          user.email?.toLowerCase().includes(query) ||
          user.phone?.includes(query)
        )
      }

      // Apply status filter
      if (statusFilter.value) {
        filtered = filtered.filter(user => user.status === statusFilter.value)
      }

      // Apply role filter
      if (roleFilter.value) {
        filtered = filtered.filter(user => user.role === roleFilter.value)
      }

      return filtered
    })

    // Methods
    const clearFilters = () => {
      searchQuery.value = ''
      statusFilter.value = null
      roleFilter.value = null
      pagination.value.page = 1
    }

    const getStatusColor = (status) => {
      const colors = {
        active: 'positive',
        inactive: 'grey-6',
        suspended: 'negative'
      }
      return colors[status] || 'grey'
    }

    const getStatusLabel = (status) => {
      return status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown'
    }

    const getRoleColor = (role) => {
      const colors = {
        admin: 'purple',
        support: 'info',
        customer: 'primary'
      }
      return colors[role] || 'grey'
    }

    const getRoleLabel = (role) => {
      return role ? role.charAt(0).toUpperCase() + role.slice(1) : 'Unknown'
    }

    const formatDate = (dateString) => {
      if (!dateString) return 'N/A'
      return date.formatDate(dateString, 'MMM DD, YYYY')
    }

    const getRelativeTime = (dateString) => {
      if (!dateString) return ''
      const now = Date.now()
      const targetDate = new Date(dateString).getTime()
      return date.getDateDiff(now, targetDate, 'days') + ' days ago'
    }

    const handleImageError = (event) => {
      event.target.style.display = 'none'
    }

    // User actions
    const viewUser = (user) => {
      console.log('View user:', user)
      // Implement view user logic
    }

    // Fixed editUser function
    const editUser = (user) => {
      emit('edit-user', user)
    }

    const toggleUserStatus = async (user) => {
      const newStatus = user.status === 'active' ? 'suspended' : 'active'
      const action = newStatus === 'active' ? 'activate' : 'suspend'

      try {
     const confirmed = await new Promise((resolve) => {
  if (confirm(`Are you sure you want to delete "${user.name}"?`)) {
    resolve(true)
  } else {
    resolve(false)
  }
})

        if (!confirmed) return

        // Set loading state
        userActionLoading.value = {
          ...userActionLoading.value,
          [user.id]: true
        }

        // Call store action to update user status
        await store.dispatch('admin/updateUser', {
          id: user.id,
          userData: { status: newStatus }
        })
        
        $q.notify({
          type: 'positive',
          message: `User ${action}d successfully`,
          position: 'top-right'
        })

        emit('user-updated')

      } catch {
  $q.notify({
    type: 'negative',
    message: `Failed to ${action} user`,
    position: 'top-right'
  })

      } finally {
        // Clear loading state
        userActionLoading.value = {
          ...userActionLoading.value,
          [user.id]: false
        }
      }
    }

   const deleteUser = async (user) => {
  try {
    // $q.dialog ki jagah native confirm use kar do
    const confirmed = confirm(`Are you sure you want to permanently delete "${user.name}"? This action cannot be undone.`)
    
    if (!confirmed) return

    userActionLoading.value = {
      ...userActionLoading.value,
      [user.id]: true
    }

    await store.dispatch('admin/deleteUser', user.id)
    
    // $q.notify ki jagah console ya alert use kar do temporarily
    console.log('User deleted successfully')
    
    emit('user-updated')

  } catch (error) {
    console.error('Failed to delete user:', error.message)
  } finally {
    userActionLoading.value = {
      ...userActionLoading.value,
      [user.id]: false
    }
  }
}

    // Watch for search query changes to reset pagination
    watch(searchQuery, () => {
      pagination.value.page = 1
    })

    watch([statusFilter, roleFilter], () => {
      pagination.value.page = 1
    })

    return {
      // Data
      searchQuery,
      statusFilter,
      roleFilter,
      pagination,
      columns,
      statusOptions,
      roleOptions,
      userActionLoading,

      // Computed
      hasActiveFilters,
      filteredUsers,

      // Methods
      clearFilters,
      getStatusColor,
      getStatusLabel,
      getRoleColor,
      getRoleLabel,
      formatDate,
      getRelativeTime,
      handleImageError,
      viewUser,
      editUser,
      toggleUserStatus,
      deleteUser
    }
  }
}
</script>

<style scoped>
.users-table-container {
  width: 100%;
}

.users-table {
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
}

.users-table .q-table__top {
  padding: 12px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.users-table tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.03);
}

/* Loading animation */
.users-table :deep(.q-inner-loading) {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(2px);
}

/* ===== RESPONSIVE DESIGN ===== */

/* Mobile devices (320px to 575px) */
@media (max-width: 575px) {
  .users-table-container {
    padding: 0;
  }
  
  /* Search and filters responsive */
  .q-card-section .row.q-gutter-md {
    margin: 0 !important;
    gap: 12px !important;
  }
  
  .q-card-section .row.q-gutter-md > div {
    margin: 0 !important;
  }
  
  /* Stack filter buttons vertically on mobile */
  .row.q-gutter-sm {
    flex-direction: column;
    gap: 8px !important;
  }
  
  .row.q-gutter-sm .q-btn {
    width: 100%;
    margin: 0 !important;
  }
  
  /* Table responsive adjustments */
  .users-table-container :deep(.q-table__container) {
    font-size: 11px;
  }
  
  .users-table-container :deep(.q-table th),
  .users-table-container :deep(.q-table td) {
    padding: 6px 2px;
    white-space: nowrap;
  }
  
  /* Hide less important columns on mobile */
  .users-table-container :deep(.q-table th:nth-child(1)),
  .users-table-container :deep(.q-table td:nth-child(1)) {
    display: none; /* Hide avatar column */
  }
  
  .users-table-container :deep(.q-table th:nth-child(6)),
  .users-table-container :deep(.q-table td:nth-child(6)) {
    display: none; /* Hide join date column */
  }
  
  /* Compact action buttons on mobile */
  .row.q-gutter-xs.no-wrap {
    gap: 2px !important;
  }
  
  .row.q-gutter-xs.no-wrap .q-btn {
    min-width: 32px;
    width: 32px;
    height: 32px;
    padding: 0;
  }
  
  /* Mobile table header */
  .users-table :deep(.q-table__top) {
    padding: 8px 12px;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .users-table :deep(.q-table__top) .text-h6 {
    font-size: 1.1rem;
  }
  
  /* Mobile badges and chips smaller */
  .q-badge,
  .q-chip {
    font-size: 10px !important;
    padding: 2px 6px !important;
  }
}

/* Small tablets (576px to 767px) */
@media (min-width: 576px) and (max-width: 767px) {
  .users-table-container :deep(.q-table__container) {
    font-size: 12px;
  }
  
  .users-table-container :deep(.q-table th),
  .users-table-container :deep(.q-table td) {
    padding: 8px 6px;
  }
  
  /* Hide avatar on small tablets */
  .users-table-container :deep(.q-table th:nth-child(1)),
  .users-table-container :deep(.q-table td:nth-child(1)) {
    display: none;
  }
  
  /* Filter row responsive */
  .q-card-section .row.q-gutter-md > div:last-child {
    width: 100%;
    margin-top: 12px;
  }
  
  .q-card-section .row.q-gutter-md > div:last-child .row {
    justify-content: center;
  }
}

/* Medium tablets (768px to 991px) */
@media (min-width: 768px) and (max-width: 991px) {
  .users-table-container :deep(.q-table__container) {
    font-size: 13px;
  }
  
  .users-table-container :deep(.q-table th),
  .users-table-container :deep(.q-table td) {
    padding: 10px 8px;
  }
  
  /* Show all columns but make them more compact */
  .row.q-gutter-xs.no-wrap .q-btn {
    min-width: 36px;
    width: 36px;
    height: 36px;
  }
}

/* Large screens (992px and up) */
@media (min-width: 992px) {
  .users-table-container :deep(.q-table__container) {
    font-size: 14px;
  }
  
  .users-table-container :deep(.q-table th),
  .users-table-container :deep(.q-table td) {
    padding: 12px 16px;
  }
  
  /* Better spacing for action buttons */
  .row.q-gutter-xs.no-wrap {
    gap: 4px !important;
  }
  
  .row.q-gutter-xs.no-wrap .q-btn {
    min-width: 40px;
    width: 40px;
    height: 40px;
  }
}

/* Extra large screens (1200px and up) */
@media (min-width: 1200px) {
  .users-table-container {
    max-width: 1400px;
    margin: 0 auto;
  }
  
  .users-table-container :deep(.q-table th),
  .users-table-container :deep(.q-table td) {
    padding: 14px 20px;
  }
}

/* ===== ENHANCED TABLE STYLING ===== */

/* Better table styling */
.users-table :deep(.q-table__container) {
  border-radius: 8px;
  overflow: hidden;
}

.users-table :deep(.q-table thead th) {
  background-color: #f5f5f5;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #e0e0e0;
}

.users-table :deep(.q-table tbody tr) {
  transition: background-color 0.2s ease;
}

.users-table :deep(.q-table tbody tr:nth-child(even)) {
  background-color: #fafafa;
}

.users-table :deep(.q-table tbody tr:hover) {
  background-color: rgba(25, 118, 210, 0.08) !important;
}

/* Badge and chip improvements */
.q-badge {
  border-radius: 12px;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.q-chip {
  border-radius: 16px;
  font-weight: 500;
}

/* Avatar improvements */
.q-avatar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 2px solid #fff;
}

/* Action buttons improvements */
.row.q-gutter-xs.no-wrap .q-btn {
  transition: all 0.2s ease;
  border-radius: 50%;
}

.row.q-gutter-xs.no-wrap .q-btn:hover {
  transform: scale(1.1);
}

/* ===== SEARCH AND FILTER STYLING ===== */

/* Search card styling */
.q-card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.q-input,
.q-select {
  border-radius: 8px;
}

/* Filter buttons styling */
.q-btn {
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.q-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* ===== RESPONSIVE SEARCH FILTERS ===== */

@media (max-width: 575px) {
  /* Mobile search section */
  .q-card-section .row.q-gutter-md {
    flex-direction: column;
  }
  
  .q-card-section .row.q-gutter-md > div {
    width: 100% !important;
  }
  
  /* Mobile input styling */
  .q-input,
  .q-select {
    margin-bottom: 12px;
  }
  
  /* Mobile button group */
  .q-card-section .row.q-gutter-md > div:last-child .row {
    flex-direction: column;
    gap: 8px !important;
  }
  
  .q-card-section .row.q-gutter-md > div:last-child .q-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  /* Tablet search layout */
  .q-card-section .row.q-gutter-md > div:nth-child(2),
  .q-card-section .row.q-gutter-md > div:nth-child(3) {
    flex: 0 0 calc(50% - 12px);
  }
  
  .q-card-section .row.q-gutter-md > div:last-child {
    flex: 0 0 100%;
    margin-top: 12px;
  }
}

/* ===== PAGINATION RESPONSIVE ===== */

.users-table :deep(.q-table__bottom) {
  padding: 12px 16px;
  border-top: 1px solid #e0e0e0;
  background-color: #fafafa;
}

@media (max-width: 575px) {
  .users-table :deep(.q-table__bottom) {
    padding: 8px 12px;
    flex-direction: column;
    gap: 8px;
  }
  
  .users-table :deep(.q-table__bottom-item) {
    margin: 0 !important;
    justify-content: center;
  }
  
  /* Pagination controls responsive */
  .users-table :deep(.q-pagination) {
    font-size: 12px;
  }
  
  .users-table :deep(.q-pagination .q-btn) {
    min-width: 32px;
    height: 32px;
    margin: 0 2px;
  }
}

/* ===== NO DATA STATE RESPONSIVE ===== */

.full-width.column.flex-center {
  min-height: 300px;
}

@media (max-width: 575px) {
  .full-width.column.flex-center {
    min-height: 200px;
    padding: 20px !important;
  }
  
  .full-width.column.flex-center .q-icon {
    font-size: 2.5rem !important;
  }
  
  .full-width.column.flex-center .text-h6 {
    font-size: 1.2rem;
  }
  
  .full-width.column.flex-center .row.q-gutter-sm {
    flex-direction: column;
    width: 100%;
    gap: 8px !important;
  }
  
  .full-width.column.flex-center .row.q-gutter-sm .q-btn {
    width: 100%;
  }
}

/* ===== HORIZONTAL SCROLL FOR MOBILE TABLES ===== */

@media (max-width: 767px) {
  .users-table-container {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  
  .users-table :deep(.q-table__container) {
    min-width: 600px; /* Minimum width to maintain table structure */
  }
  
  /* Add scroll indicators */
  .users-table-container::after {
    content: "← Scroll to see more →";
    display: block;
    text-align: center;
    font-size: 12px;
    color: #999;
    padding: 8px;
    background: linear-gradient(90deg, transparent, rgba(0,0,0,0.05), transparent);
  }
}

/* Hide scroll indicator on larger screens */
@media (min-width: 768px) {
  .users-table-container::after {
    display: none;
  }
}

/* ===== IMPROVED VISUAL ELEMENTS ===== */

/* Better status badges */
.q-badge {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 4px 8px;
  border-radius: 10px;
}

/* Better role chips */
.q-chip {
  font-weight: 500;
  font-size: 12px;
  height: 24px;
  border-radius: 12px;
}

/* Avatar enhancements */
.q-avatar {
  border: 2px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease;
}

.q-avatar:hover {
  transform: scale(1.05);
}

/* Action buttons enhancements */
.row.q-gutter-xs.no-wrap .q-btn {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.row.q-gutter-xs.no-wrap .q-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s ease;
}

.row.q-gutter-xs.no-wrap .q-btn:hover::before {
  left: 100%;
}

/* ===== TABLE HEADER IMPROVEMENTS ===== */

.users-table :deep(.q-table thead th) {
  position: sticky;
  top: 0;
  z-index: 1;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  font-weight: 700;
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 0.5px;
  color: #495057;
  border-bottom: 2px solid #dee2e6;
}

/* ===== RESPONSIVE TABLE PAGINATION ===== */

@media (max-width: 575px) {
  .users-table :deep(.q-table__bottom) {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .users-table :deep(.q-table__bottom-item) {
    font-size: 12px;
  }
  
  .users-table :deep(.q-select--standard .q-field__control) {
    min-height: 32px;
  }
}

/* ===== SEARCH CARD RESPONSIVE ===== */

@media (max-width: 575px) {
  .q-card {
    margin: 0 -12px 16px -12px;
    border-radius: 0 0 12px 12px;
  }
  
  .q-card-section {
    padding: 16px 12px !important;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .q-card-section {
    padding: 18px 16px !important;
  }
}

/* ===== ENHANCED LOADING STATE ===== */

.users-table :deep(.q-inner-loading) {
  border-radius: 8px;
}

.users-table :deep(.q-spinner-grid) {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

/* ===== IMPROVED HOVER EFFECTS ===== */

.users-table :deep(.q-table tbody tr) {
  transition: all 0.2s ease;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.users-table :deep(.q-table tbody tr:hover) {
  background: linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(25, 118, 210, 0.02) 100%) !important;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* ===== RESPONSIVE TOOLTIPS ===== */

@media (max-width: 767px) {
  /* Hide tooltips on mobile to prevent issues */
  .q-tooltip {
    display: none !important;
  }
}

/* ===== SCROLL ENHANCEMENT ===== */

.users-table-container {
  scrollbar-width: thin;
  scrollbar-color: #ccc #f5f5f5;
}

.users-table-container::-webkit-scrollbar {
  height: 6px;
}

.users-table-container::-webkit-scrollbar-track {
  background: #f5f5f5;
  border-radius: 3px;
}

.users-table-container::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}

.users-table-container::-webkit-scrollbar-thumb:hover {
  background: #999;
}

/* ===== ACCESSIBILITY IMPROVEMENTS ===== */

/* Focus styles */
.q-btn:focus,
.q-input:focus,
.q-select:focus {
  outline: 2px solid #1976d2;
  outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .users-table :deep(.q-table thead th) {
    background: #000;
    color: #fff;
  }
  
  .users-table :deep(.q-table tbody tr:hover) {
    background: #333 !important;
    color: #fff;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .users-table :deep(.q-table tbody tr),
  .q-btn,
  .q-avatar {
    transition: none !important;
  }
  
  .row.q-gutter-xs.no-wrap .q-btn:hover {
    transform: none !important;
  }
}

/* ===== DARK MODE SUPPORT ===== */

.body--dark .users-table :deep(.q-table thead th) {
  background: #2d2d2d;
  color: #fff;
  border-bottom-color: #404040;
}

.body--dark .users-table :deep(.q-table tbody tr:nth-child(even)) {
  background-color: #1e1e1e;
}

.body--dark .users-table :deep(.q-table tbody tr:hover) {
  background: rgba(25, 118, 210, 0.15) !important;
}

.body--dark .q-card {
  background: #2d2d2d;
}

/* ===== PERFORMANCE OPTIMIZATIONS ===== */

/* GPU acceleration for smooth scrolling */
.users-table-container {
  transform: translateZ(0);
  will-change: scroll-position;
}

/* Optimize repaints */
.users-table :deep(.q-table tbody tr) {
  contain: layout style paint;
}

/* ===== RESPONSIVE BREAKPOINT UTILITIES ===== */

/* Hide elements on specific screen sizes */
.hide-xs {
  display: block;
}

.hide-sm {
  display: block;
}

.hide-md {
  display: block;
}

@media (max-width: 575px) {
  .hide-xs {
    display: none !important;
  }
}

@media (max-width: 767px) {
  .hide-sm {
    display: none !important;
  }
}

@media (max-width: 991px) {
  .hide-md {
    display: none !important;
  }
}
</style>