<!-- src/pages/AdminDashboard.vue -->
<template>
  <q-page padding>
    <div class="row q-mb-md">
      <div class="col">
        <h4 class="text-h4">Admin Dashboard</h4>
      </div>
      <div class="col-auto">
        <q-btn 
          color="negative" 
          label="Logout" 
          @click="logout" 
        />
      </div>
    </div>
    
   <q-card-section>
  <div v-if="user">
    <div class="text-h6">Welcome, {{ user.name || user.email }}</div>
    <div>Role: {{ user.role }}</div>
  </div>
  <div v-else>
    <q-spinner size="sm" /> Loading user info...
  </div>
</q-card-section>

    
    <div class="row q-col-gutter-md q-mt-md">
      <div class="col-12 col-md-6">
        <q-card class="q-pa-md">
          <q-card-section>
            <div class="text-h6">Statistics</div>
            <div v-if="stats">
              <div>Total Users: {{ stats.totalUsers }}</div>
              <div>Total Restaurants: {{ stats.totalRestaurants }}</div>
              <div>Total Orders: {{ stats.totalOrders }}</div>
            </div>
            <div v-else>
              <q-spinner size="sm" />
              Loading statistics...
            </div>
          </q-card-section>
          <q-card-actions>
            <q-btn 
              color="primary" 
              label="Refresh Stats" 
              @click="fetchStats" 
            />
          </q-card-actions>
        </q-card>
      </div>
      
      <div class="col-12 col-md-6">
        <q-card class="q-pa-md">
          <q-card-section>
            <div class="text-h6">User Management</div>
            <q-btn 
              color="primary" 
              label="View Users" 
              @click="viewUsers" 
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'AdminDashboard',
  setup() {
    const store = useStore()
    const router = useRouter()
    
    const user = computed(() => store.getters['auth/getUser'])
    const stats = computed(() => store.getters['admin/stats'])
    
    onMounted(() => {
      // Fetch admin data when component mounts
      store.dispatch('admin/fetchStats')
    })
    
    const fetchStats = () => {
      store.dispatch('admin/fetchStats')
    }
    
    const viewUsers = () => {
      router.push('/admin/users')
    }
    
    const logout = () => {
      store.dispatch('auth/logout')
      router.push('/auth/login')
    }
    
    return {
      user,
      stats,
      fetchStats,
      viewUsers,
      logout
    }
  }
}
</script>