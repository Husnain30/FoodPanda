<template>
  <q-page padding>
    <!-- Header -->
    <div class="row items-center justify-between q-mb-md">
      <div class="col">
        <h4 class="text-h4 q-ma-none">Users Management</h4>
        <p class="text-grey-6 q-ma-none q-mt-xs">
          Manage platform users and their accounts
        </p>
      </div>
      <div class="col-auto">
        <div class="row q-gutter-sm">
          <q-btn
            outline
            color="primary"
            icon="refresh"
            label="Refresh"
            :loading="isLoading"
            @click="refreshUsers"
          />
          <q-btn
            outline
            color="primary"
            icon="file_download"
            label="Export"
            :disable="!hasUsers"
          />
          <q-btn
            color="primary"
            icon="person_add"
            label="Add User"
            @click="showAddDialog = true"
          />
        </div>
      </div>
    </div>

    <!-- Stats Cards (Quick Overview) -->
    <div class="row q-gutter-md q-mb-lg" v-if="hasUsers || isLoading">
      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="stats-card">
          <q-card-section class="row items-center q-pa-md">
            <div class="col">
              <div class="text-h6">
                <q-skeleton v-if="isLoading" type="text" width="60px" />
                <span v-else>{{ totalUsers }}</span>
              </div>
              <div class="text-grey-6">Total Users</div>
            </div>
            <div class="col-auto">
              <q-icon name="people" size="2rem" color="primary" />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="stats-card">
          <q-card-section class="row items-center q-pa-md">
            <div class="col">
              <div class="text-h6">
                <q-skeleton v-if="isLoading" type="text" width="60px" />
                <span v-else>{{ activeUsers }}</span>
              </div>
              <div class="text-grey-6">Active Users</div>
            </div>
            <div class="col-auto">
              <q-icon name="person_check" size="2rem" color="positive" />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="stats-card">
          <q-card-section class="row items-center q-pa-md">
            <div class="col">
              <div class="text-h6">
                <q-skeleton v-if="isLoading" type="text" width="60px" />
                <span v-else>{{ verifiedUsers }}</span>
              </div>
              <div class="text-grey-6">Verified Users</div>
            </div>
            <div class="col-auto">
              <q-icon name="verified_user" size="2rem" color="info" />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <q-card class="stats-card">
          <q-card-section class="row items-center q-pa-md">
            <div class="col">
              <div class="text-h6">
                <q-skeleton v-if="isLoading" type="text" width="60px" />
                <span v-else>{{ newUsersThisMonth }}</span>
              </div>
              <div class="text-grey-6">New This Month</div>
            </div>
            <div class="col-auto">
              <q-icon name="person_add" size="2rem" color="warning" />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Error Banner -->
    <div v-if="hasError" class="q-mb-md">
      <q-banner class="bg-red-1 text-red-8" icon="error" rounded>
        <div class="text-subtitle1">Failed to load users</div>
        <div class="text-body2">{{ errorMessage }}</div>
        <template v-slot:action>
          <q-btn 
            flat 
            color="red" 
            label="Retry" 
            icon="refresh"
            @click="loadUsers"
            :loading="isLoading"
          />
        </template>
      </q-banner>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading && !hasUsers" class="q-pa-lg text-center">
      <q-spinner-grid size="50px" color="primary" />
      <div class="text-h6 q-mt-md">Loading users...</div>
      <div class="text-grey-6">Please wait while we fetch the data</div>
    </div>

    <!-- Users Table -->
    <div v-else-if="hasUsers || (!isLoading && !hasError)">
  <UsersTable 
  :users="users"
  :loading="isLoading"
  @refresh="refreshUsers"
  @user-updated="handleUserUpdated"
  @edit-user="editUser"
/>
    </div>

 <!-- Empty State -->
<div v-else-if="!hasUsers && !isLoading" class="q-pa-xl text-center">
  <q-icon name="people_outline" size="4rem" color="grey-5" />
  <div class="text-h6 q-mt-md text-grey-6">No users found</div>
  <div class="text-body2 text-grey-5 q-mb-md">
    There are no users in the system yet.
  </div>
  <q-btn 
    color="primary" 
    label="Add First User" 
    icon="person_add"
    @click="showAddDialog = true"
  />
</div>

 <!-- Add User Dialog -->
  <q-dialog v-model="showAddDialog">
  <q-card style="min-width: 400px">
    <q-card-section>
      <div class="text-h6">Add New User</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <!-- Full Name -->
      <q-input
        filled
        v-model="newUser.name"
        label="Full Name"
        lazy-rules
        :rules="[val => val && val.length > 0 || 'Name is required']"
      />

      <!-- Email -->
      <q-input
        filled
        v-model="newUser.email"
        label="Email"
        type="email"
        class="q-mt-md"
        lazy-rules
        :rules="[
          val => val && val.length > 0 || 'Email is required',
          val => val && val.includes('@') || 'Please enter a valid email'
        ]"
      />

      <!-- Phone -->
      <q-input
        filled
        v-model="newUser.phone"
        label="Phone Number"
        class="q-mt-md"
      />

      <!-- Role -->
      <q-select
        filled
        v-model="newUser.role"
        :options="roleOptions"
        label="Role"
        class="q-mt-md"
        emit-value
        map-options
      />

      <!-- Password -->
      <q-input
        filled
        v-model="newUser.password"
        :type="showPassword ? 'text' : 'password'"
        label="Password"
        class="q-mt-md"
        lazy-rules
        :rules="[val => val && val.length >= 6 || 'Password must be at least 6 characters']"
      >
        <template v-slot:append>
          <q-icon
            :name="showPassword ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="showPassword = !showPassword"
          />
        </template>
      </q-input>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Cancel" color="grey" v-close-popup />
      <q-btn 
        label="Add User" 
        color="primary" 
        @click="addUser"
        :loading="isAddingUser"
      />
    </q-card-actions>
  </q-card>
</q-dialog>

    <!-- Edit User Dialog -->
<q-dialog v-model="showEditDialog">
  <q-card style="min-width: 400px">
    <q-card-section>
      <div class="text-h6">Edit User</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-input
        filled
        v-model="editingUser.name"
        label="Full Name"
        lazy-rules
        :rules="[val => val && val.length > 0 || 'Name is required']"
      />

      <q-input
        filled
        v-model="editingUser.email"
        label="Email"
        type="email"
        class="q-mt-md"
        lazy-rules
        :rules="[
          val => val && val.length > 0 || 'Email is required',
          val => val && val.includes('@') || 'Please enter a valid email'
        ]"
      />

      <q-input
        filled
        v-model="editingUser.phone"
        label="Phone Number"
        class="q-mt-md"
      />

      <q-select
        filled
        v-model="editingUser.role"
        :options="roleOptions"
        label="Role"
        class="q-mt-md"
        emit-value
        map-options
      />
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Cancel" color="grey" v-close-popup />
      <q-btn 
        label="Update User" 
        color="primary" 
        @click="updateUser"
        :loading="isUpdatingUser"
      />
    </q-card-actions>
  </q-card>
</q-dialog>
  </q-page>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'
import UsersTable from "../../admin/components/UsersTable.vue"

export default {
  name: "UsersPage",
  components: {
    UsersTable,
  },
  setup() {
    const store = useStore()
    const $q = useQuasar()

    // Reactive data
    
    const showAddDialog = ref(false)
    const isAddingUser = ref(false)
    const newUser = ref({
      name: '',
      email: '',
        password: "",
      phone: '',
      role: 'customer'
    })
    const showEditDialog = ref(false)
const isUpdatingUser = ref(false)
const editingUser = ref({})

 const roleOptions = [
  { label: 'Customer', value: 'customer' }
]

    // Computed properties from store
    const users = computed(() => store.getters['admin/users'])
    const isLoading = computed(() => store.getters['admin/isLoading']('users'))
    const errors = computed(() => store.getters['admin/errors'])

    // Error handling
    const hasError = computed(() => !!errors.value.users)
    const errorMessage = computed(() => errors.value.users || '')

    // Data stats
    const hasUsers = computed(() => users.value.length > 0)
    const totalUsers = computed(() => users.value.length)
    
    const activeUsers = computed(() => 
      users.value.filter(user => user.status === 'active').length
    )
    
    const verifiedUsers = computed(() => 
      users.value.filter(user => user.email_verified_at !== null).length
    )
    
    const newUsersThisMonth = computed(() => {
      const thisMonth = new Date()
      thisMonth.setDate(1)
      thisMonth.setHours(0, 0, 0, 0)
      
      return users.value.filter(user => {
        const userDate = new Date(user.created_at)
        return userDate >= thisMonth
      }).length
    })

    // Methods

    const editUser = (user) => {
  editingUser.value = { ...user }
  showEditDialog.value = true
}
const openAddDialog = () => {
  console.log('Button clicked!')  // Ye print hota hai?
  console.log('Before:', showAddDialog.value)  // false hoga
  showAddDialog.value = true
  console.log('After:', showAddDialog.value)  // true hona chahiye
}
const updateUser = async () => {
  if (!editingUser.value.name || !editingUser.value.email) {
    $q.notify({
      type: 'warning',
      message: 'Please fill in all required fields',
      position: 'top-right'
    })
    return
  }

  isUpdatingUser.value = true
  
  try {
    await store.dispatch('admin/updateUser', {
      id: editingUser.value.id,
      userData: editingUser.value
    })
    
    $q.notify({
      type: 'positive',
      message: 'User updated successfully',
      position: 'top-right'
    })
    
    showEditDialog.value = false
    
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: error.message,
      position: 'top-right'
    })
  } finally {
    isUpdatingUser.value = false
  }
}
    const loadUsers = async () => {
      try {
        await store.dispatch('admin/fetchUsers')
        
        // Show success notification only if it's a manual refresh
        if (!isLoading.value) {
          $q.notify({
            type: 'positive',
            message: `Loaded ${users.value.length} users successfully`,
            position: 'top-right',
            timeout: 2000
          })
        }
      } catch (error) {
        console.error('Failed to load users:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to load users data',
          position: 'top-right',
          timeout: 3000
        })
      }
    }

    const refreshUsers = async () => {
      await loadUsers()
      $q.notify({
        type: 'info',
        message: 'Users data refreshed',
        position: 'top-right',
        timeout: 1500
      })
    }

    const addUser = async () => {
  if (!newUser.value.name || !newUser.value.email) {
    $q.notify({
      type: 'warning',
      message: 'Please fill in all required fields',
      position: 'top-right'
    })
    return
  }

  isAddingUser.value = true
  
  try {
    await store.dispatch('admin/createUser', newUser.value)
    
    $q.notify({
      type: 'positive',
      message: 'User added successfully',
      position: 'top-right'
    })
    
    newUser.value = {
      name: '',
      email: '',
      phone: '',
       password: "",  // Add kar do
      role: 'customer'
    }
    showAddDialog.value = false
    
  } catch (error) {
    $q.notify({
      type: 'negative', 
      message: error.message,
      position: 'top-right'
    })
  } finally {
    isAddingUser.value = false
  }
}

    const handleUserUpdated = async () => {
      // Refresh users when a user is updated from the table
      await refreshUsers()
    }

    // Lifecycle hooks
    onMounted(async () => {
      // Load users data when page mounts
      console.log('UsersPage mounted - loading users data...')
      
      // Check if we already have users data
      if (users.value.length === 0) {
        await loadUsers()
      } else {
        console.log('Users data already available:', users.value.length, 'users')
      }
    })

    onBeforeUnmount(() => {
      // Optional: Clear users data when leaving page to free memory
      // Uncomment if you want to clear data on page leave
      // store.dispatch('admin/clearPageData', 'users')
      console.log('UsersPage unmounted')
    })

    return {
      // Data
      showAddDialog,
      isAddingUser,
      newUser,
      roleOptions,

      // Computed
      users,
      isLoading,
      hasError,
      errorMessage,
      hasUsers,
      totalUsers,
      activeUsers,
      verifiedUsers,
      newUsersThisMonth,
      openAddDialog,

      // Methods
      loadUsers,
      refreshUsers,
      addUser,
      handleUserUpdated,
        showEditDialog,
  isUpdatingUser,
  editingUser,
  editUser,
  
  updateUser
    }
  }
}
</script>

<style scoped>
.stats-card {
  transition: all 0.3s ease;
}

.stats-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.stats-card .q-card-section {
  min-height: 80px;
}

/* Mobile First Responsive Design */

/* Extra small devices (phones, 576px and down) */
@media (max-width: 575px) {
  .q-page {
    padding: 12px !important;
  }
  
  /* Header responsive */
  .text-h4 {
    font-size: 1.5rem !important;
  }
  
  /* Button group stacking */
  .row.q-gutter-sm {
    flex-direction: column;
    gap: 8px !important;
  }
  
  .row.q-gutter-sm .q-btn {
    width: 100%;
    margin: 0 !important;
  }
  
  /* Stats cards full width on mobile */
  .stats-card .q-card-section {
    min-height: 60px;
    padding: 12px !important;
  }
  
  .stats-card .text-h6 {
    font-size: 1.1rem;
  }
  
  .stats-card .q-icon {
    font-size: 1.5rem !important;
  }
  
  /* Dialog responsive */
  .q-dialog .q-card {
    min-width: 90vw !important;
    margin: 0 16px;
  }
  
  /* Empty state responsive */
  .q-pa-xl {
    padding: 24px !important;
  }
  
  .q-pa-xl .q-icon {
    font-size: 3rem !important;
  }
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767px) {
  .q-page {
    padding: 16px !important;
  }
  
  /* Header layout */
  .row.items-center.justify-between {
    flex-direction: column;
    align-items: flex-start !important;
    gap: 16px;
  }
  
  .row.items-center.justify-between .col-auto {
    width: 100%;
  }
  
  .row.q-gutter-sm {
    width: 100%;
    justify-content: space-between;
  }
  
  .row.q-gutter-sm .q-btn {
    flex: 1;
    min-width: 0;
  }
  
  /* Stats cards 2 columns */
  .stats-card .q-card-section {
    min-height: 70px;
  }
  
  /* Dialog size */
  .q-dialog .q-card {
    min-width: 80vw !important;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991px) {
  .q-page {
    padding: 20px !important;
  }
  
  /* Header responsive */
  .row.items-center.justify-between {
    flex-wrap: wrap;
  }
  
  .row.items-center.justify-between .col {
    min-width: 250px;
  }
  
  /* Button group responsive */
  .row.q-gutter-sm .q-btn {
    white-space: nowrap;
  }
  
  /* Dialog size */
  .q-dialog .q-card {
    min-width: 500px !important;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  .q-page {
    padding: 24px !important;
  }
  
  /* Ensure proper spacing on larger screens */
  .stats-card .q-card-section {
    min-height: 90px;
  }
  
  .q-dialog .q-card {
    min-width: 600px !important;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  .q-page {
    max-width: 1400px;
    margin: 0 auto;
    padding: 32px !important;
  }
  
  .stats-card .q-card-section {
    min-height: 100px;
  }
}

/* Utility classes for responsive behavior */

/* Hide/Show elements on different screen sizes */
.mobile-only {
  display: block;
}

.desktop-only {
  display: none;
}

@media (min-width: 768px) {
  .mobile-only {
    display: none;
  }
  
  .desktop-only {
    display: block;
  }
}

/* Responsive text sizes */
.responsive-title {
  font-size: 1.5rem;
}

@media (min-width: 576px) {
  .responsive-title {
    font-size: 1.75rem;
  }
}

@media (min-width: 768px) {
  .responsive-title {
    font-size: 2rem;
  }
}

/* Responsive spacing */
.responsive-margin {
  margin-bottom: 16px;
}

@media (min-width: 768px) {
  .responsive-margin {
    margin-bottom: 24px;
  }
}

/* Table responsive wrapper (if needed) */
.table-responsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

/* Form responsive adjustments */
.q-field {
  margin-bottom: 16px;
}

@media (max-width: 575px) {
  .q-field .q-field__control {
    min-height: 48px;
  }
  
  .q-btn {
    min-height: 44px;
    padding: 0 16px;
  }
}

/* Responsive banner */
.q-banner {
  border-radius: 8px;
}

@media (max-width: 575px) {
  .q-banner .q-banner__content {
    flex-direction: column;
    text-align: center;
  }
  
  .q-banner .q-banner__actions {
    margin-top: 12px;
    justify-content: center;
  }
}

/* Loading state responsive */
.loading-container {
  padding: 40px 20px;
}

@media (min-width: 768px) {
  .loading-container {
    padding: 80px 40px;
  }
}

/* Error state responsive */
@media (max-width: 575px) {
  .q-banner .text-subtitle1 {
    font-size: 1rem;
  }
  
  .q-banner .text-body2 {
    font-size: 0.875rem;
    margin-top: 8px;
  }
}

/* Dialog responsive improvements */
@media (max-width: 575px) {
  .q-dialog .q-card-section .q-input,
  .q-dialog .q-card-section .q-select {
    margin-top: 12px;
  }
  
  .q-dialog .q-card-actions {
    flex-direction: column-reverse;
    gap: 8px;
  }
  
  .q-dialog .q-card-actions .q-btn {
    width: 100%;
  }
}

/* Ensure icons are responsive */
.q-icon {
  flex-shrink: 0;
}

/* Responsive grid adjustments */
@media (max-width: 575px) {
  .row.q-gutter-md {
    margin: 0 -8px !important;
  }
  
  .row.q-gutter-md > div {
    padding: 0 8px !important;
    margin-bottom: 16px !important;
  }
}

/* Additional mobile optimizations */
@media (max-width: 575px) {
  /* Reduce header margin on mobile */
  .q-mb-md {
    margin-bottom: 16px !important;
  }
  
  .q-mb-lg {
    margin-bottom: 20px !important;
  }
  
  /* Optimize card spacing */
  .q-card {
    border-radius: 8px;
  }
  
  /* Better touch targets */
  .q-btn {
    min-height: 44px;
    border-radius: 6px;
  }
  
  /* Responsive spacing for sections */
  .q-card-section {
    padding: 16px 12px !important;
  }
}

/* Tablet specific adjustments */
@media (min-width: 576px) and (max-width: 991px) {
  .q-page {
    padding: 20px !important;
  }
  
  /* Better button layout on tablets */
  .row.q-gutter-sm .q-btn {
    min-width: 100px;
  }
  
  /* Optimal stats card height for tablets */
  .stats-card .q-card-section {
    min-height: 85px;
  }
}

/* Print styles (bonus) */
@media print {
  .q-btn,
  .q-dialog {
    display: none !important;
  }
  
  .stats-card {
    break-inside: avoid;
  }
}
</style>