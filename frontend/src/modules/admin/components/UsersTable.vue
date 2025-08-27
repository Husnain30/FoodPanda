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
  emits: ['refresh', 'user-updated'],
  setup(props, { emit }) {
    const $q = useQuasar()

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

    const editUser = (user) => {
      console.log('Edit user:', user)
      // Implement edit user logic
    }

    const toggleUserStatus = async (user) => {
      const newStatus = user.status === 'active' ? 'suspended' : 'active'
      const action = newStatus === 'active' ? 'activate' : 'suspend'

      try {
        const confirmed = await new Promise((resolve) => {
          $q.dialog({
            title: `${action.charAt(0).toUpperCase() + action.slice(1)} User`,
            message: `Are you sure you want to ${action} "${user.name}"?`,
            cancel: true,
            persistent: true
          }).onOk(() => resolve(true))
            .onCancel(() => resolve(false))
        })

        if (!confirmed) return

        // Set loading state
        userActionLoading.value = {
          ...userActionLoading.value,
          [user.id]: true
        }

        // Simulate API call - replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Update user status locally
        user.status = newStatus

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
        const confirmed = await new Promise((resolve) => {
          $q.dialog({
            title: 'Delete User',
            message: `Are you sure you want to permanently delete "${user.name}"? This action cannot be undone.`,
            cancel: true,
            persistent: true,
            color: 'negative',
            ok: {
              color: 'negative',
              label: 'Delete'
            }
          }).onOk(() => resolve(true))
            .onCancel(() => resolve(false))
        })

        if (!confirmed) return

        // Set loading state
        userActionLoading.value = {
          ...userActionLoading.value,
          [user.id]: true
        }

        // Simulate API call - replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        $q.notify({
          type: 'positive',
          message: 'User deleted successfully',
          position: 'top-right'
        })

        emit('user-updated')

      } catch (error) {
        console.error('Failed to delete user:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to delete user',
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

/* Responsive adjustments */
@media (max-width: 600px) {
  .users-table-container :deep(.q-table__container) {
    font-size: 12px;
  }
  
  .users-table-container :deep(.q-table th),
  .users-table-container :deep(.q-table td) {
    padding: 8px 4px;
  }
}

/* Loading animation */
.users-table :deep(.q-inner-loading) {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(2px);
}
</style> 