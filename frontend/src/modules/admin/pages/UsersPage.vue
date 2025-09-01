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
          <q-input
            filled
            v-model="newUser.name"
            label="Full Name"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Name is required']"
          />

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

          <q-input
            filled
            v-model="newUser.phone"
            label="Phone Number"
            class="q-mt-md"
          />

          <q-select
            filled
            v-model="newUser.role"
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
            label="Add User" 
            color="primary" 
            @click="addUser"
            :loading="isAddingUser"
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
      phone: '',
      role: 'customer'
    })

    const roleOptions = [
      { label: 'Customer', value: 'customer' },
      { label: 'Admin', value: 'admin' },
      { label: 'Support', value: 'support' }
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
      // Basic validation
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
        // Call API to add user (you'll need to implement this in store)
        // await store.dispatch('admin/addUser', newUser.value)
        
        // For now, just show success message
        $q.notify({
          type: 'positive',
          message: 'User added successfully',
          position: 'top-right'
        })
        
        // Reset form and close dialog
        newUser.value = {
          name: '',
          email: '',
          phone: '',
          role: 'customer'
        }
        showAddDialog.value = false
        
        // Refresh users list
        await refreshUsers()
        
      } catch (error) {
        console.error('Failed to add user:', error)
        $q.notify({
          type: 'negative',
          message: 'Failed to add user',
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

      // Methods
      loadUsers,
      refreshUsers,
      addUser,
      handleUserUpdated
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
</style>