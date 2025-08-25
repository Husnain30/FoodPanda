<template>
  <q-header elevated class="bg-white text-dark shadow-2">
    <q-toolbar class="q-px-lg" style="min-height: 70px;">
      <!-- Mobile Menu Toggle -->
      <q-btn
        flat
        dense
        round
        icon="menu"
        class="lt-md q-mr-sm text-primary"
        @click="$emit('toggle-sidebar')"
      />

      <!-- Brand/Logo Section -->
      <q-toolbar-title class="row items-center no-wrap">
        <div class="brand-logo">
          <q-icon name="restaurant" size="28px" color="primary" />
          <span class="text-h5 text-weight-bold text-primary q-ml-sm gt-xs">FoodPanda</span>
        </div>
      </q-toolbar-title>

      <!-- Desktop Navigation Links -->
      <div class="row items-center q-gutter-md gt-md">
        <q-btn
          flat
          no-caps
          class="nav-link"
          @click="$router.push('/')"
          :class="{ 'nav-active': $route.path === '/' }"
        >
          Home
        </q-btn>
        <q-btn
          flat
          no-caps
          class="nav-link"
          @click="$router.push('/restaurants')"
          :class="{ 'nav-active': $route.path === '/restaurants' }"
        >
          Restaurants
        </q-btn>
        <q-btn
          flat
          no-caps
          class="nav-link"
          @click="$router.push('/about')"
          :class="{ 'nav-active': $route.path === '/about' }"
        >
          About Us
        </q-btn>
        <q-btn
          flat
          no-caps
          class="nav-link"
          @click="$router.push('/contact')"
          :class="{ 'nav-active': $route.path === '/contact' }"
        >
          Contact
        </q-btn>
      </div>

      <!-- Right Side Actions -->
      <div class="row items-center q-gutter-sm q-ml-md">
        <!-- Search Icon -->
        <q-btn
          flat
          round
          dense
          icon="search"
          class="action-btn gt-sm"
          size="md"
        />
        
        <!-- Cart Icon with Badge -->
        <q-btn
          flat
          round
          dense
          icon="shopping_cart"
          class="action-btn gt-sm"
          size="md"
        >
          <q-badge color="red" floating rounded>3</q-badge>
        </q-btn>

        <!-- Notifications -->
        <q-btn
          flat
          round
          dense
          icon="notifications"
          class="action-btn gt-sm"
          size="md"
        />

        <!-- User Menu -->
        <q-btn-dropdown
          flat
          round
          dense
          icon="account_circle"
          class="action-btn gt-sm"
          size="md"
        >
          <q-list>
            <q-item clickable v-close-popup @click="goToProfile">
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>
              <q-item-section>Profile</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="goToOrders">
              <q-item-section avatar>
                <q-icon name="receipt" />
              </q-item-section>
              <q-item-section>My Orders</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup @click="logout">
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>
              <q-item-section>Logout</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <!-- Auth Buttons -->
        <q-btn
          outline
          no-caps
          color="primary"
          label="Login"
          class="auth-btn q-ml-sm"
          @click="goToLogin"
        />
        <q-btn
          unelevated
          no-caps
          color="primary"
          label="Sign Up"
          class="auth-btn q-ml-xs"
          @click="goToRegister"
        />
      </div>

      <!-- Mobile Search Bar (Toggle) -->
      <q-btn
        flat
        round
        dense
        icon="search"
        class="lt-lg q-ml-sm"
        @click="showMobileSearch = !showMobileSearch"
      />
    </q-toolbar>

    <!-- Mobile Search Expansion -->
    <q-slide-transition>
      <div v-show="showMobileSearch" class="mobile-search bg-grey-1 q-pa-md lt-lg">
        <q-input
          v-model="searchQuery"
          placeholder="Search restaurants, food..."
          outlined
          dense
          class="full-width"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
          <template v-slot:append>
            <q-btn
              flat
              round
              dense
              icon="close"
              @click="showMobileSearch = false"
            />
          </template>
        </q-input>
      </div>
    </q-slide-transition>
  </q-header>
</template>

<script>
import { ref } from 'vue'

export default {
  name: "MainNavbar",
  setup() {
    const showMobileSearch = ref(false)
    const searchQuery = ref('')

    return {
      showMobileSearch,
      searchQuery
    }
  },
  methods: {
    goToLogin() {
      this.$router.push("/auth/login");
    },
    goToRegister() {
      this.$router.push("/auth/register");
    },
    goToProfile() {
      this.$router.push("/profile");
    },
    goToOrders() {
      this.$router.push("/orders");
    },
    logout() {
      // Handle logout logic
      console.log("Logout clicked");
    }
  }
};
</script>

<style scoped>
/* Brand Styling */
.brand-logo {
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.brand-logo:hover {
  transform: scale(1.02);
}

/* Navigation Links */
.nav-link {
  font-weight: 500;
  font-size: 15px;
  color: #424242;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: #1976d2;
  background-color: rgba(25, 118, 210, 0.08);
}

.nav-active {
  color: #1976d2 !important;
  background-color: rgba(25, 118, 210, 0.12);
}

.nav-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 3px;
  background-color: #1976d2;
  border-radius: 2px;
}

/* Action Buttons */
.action-btn {
  color: #616161;
  transition: all 0.3s ease;
}

.action-btn:hover {
  color: #1976d2;
  background-color: rgba(25, 118, 210, 0.08);
}

/* Auth Buttons */
.auth-btn {
  font-weight: 500;
  border-radius: 8px;
  padding: 8px 20px;
  text-transform: none;
  transition: all 0.3s ease;
}

.auth-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
}

/* Mobile Search */
.mobile-search {
  border-top: 1px solid #e0e0e0;
}

/* Header Shadow */
.q-header {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95) !important;
}

/* Responsive Design */
@media (max-width: 1023px) {
  .q-toolbar {
    padding-left: 16px;
    padding-right: 16px;
  }
}

@media (max-width: 599px) {
  .brand-logo span {
    font-size: 1.1rem;
  }
  
  .auth-btn {
    padding: 6px 12px;
    font-size: 13px;
  }
}

/* Smooth transitions for all interactive elements */
* {
  transition: color 0.3s ease, background-color 0.3s ease, transform 0.3s ease;
}
</style>