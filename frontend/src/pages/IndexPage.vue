<template>
  <div class="index-page flex column" style="min-height: 100vh;">
    <MainNavbar @toggle-sidebar="toggleSidebar" />
    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      :breakpoint="768"
      class="bg-primary text-white"
    >
      <q-list padding>
        <q-item clickable v-ripple @click="navigateTo('/')">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>Home</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="navigateTo('/about')">
          <q-item-section avatar>
            <q-icon name="info" />
          </q-item-section>
          <q-item-section>About Us</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="navigateTo('/contact')">
          <q-item-section avatar>
            <q-icon name="contact_support" />
          </q-item-section>
          <q-item-section>Contact</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="navigateTo('/restaurants')">
          <q-item-section avatar>
            <q-icon name="restaurant" />
          </q-item-section>
          <q-item-section>Restaurants</q-item-section>
        </q-item>
        
        <q-separator class="q-my-md" />
        
        <q-item clickable v-ripple @click="navigateTo('/auth/login')" v-if="!isAuthenticated">
          <q-item-section avatar>
            <q-icon name="login" />
          </q-item-section>
          <q-item-section>Login</q-item-section>
        </q-item>
        
        <q-item clickable v-ripple @click="logout" v-else>
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>Logout</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="flex-grow">
      <router-view />
    </q-page-container>

    <MainFooter />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import MainNavbar from 'src/components/layout/MainNavbar.vue'
import MainFooter from 'src/components/layout/MainFooter.vue'

export default {
  name: 'IndexPage',
  components: {
    MainNavbar,
    MainFooter
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const leftDrawerOpen = ref(false)
    
    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])

    const toggleSidebar = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }
    
    const navigateTo = (path) => {
      router.push(path)
      leftDrawerOpen.value = false
    }
    
    const logout = () => {
      store.dispatch('auth/logout')
      leftDrawerOpen.value = false
      router.push('/')
    }

    return {
      leftDrawerOpen,
      isAuthenticated,
      toggleSidebar,
      navigateTo,
      logout
    }
  }
}
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>