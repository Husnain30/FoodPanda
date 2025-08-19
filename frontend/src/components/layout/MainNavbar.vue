<template>
  <q-header elevated class="bg-gradient text-white shadow-3">
    <q-toolbar class="q-px-md">

      <!-- Sidebar Toggle (only on mobile) -->
      <q-btn
        flat dense round icon="menu"
        class="lt-md q-mr-sm"
        @click="$emit('toggle-sidebar')"
      />

      <!-- App Logo + Title (hidden on small screens) -->
      <q-toolbar-title class="row items-center gt-sm">
        <img
          src="../../assets/logos/foodpanda-logo.svg"
          alt="FoodPanda"
          height="34"
          class="q-mr-sm logo-spin"
        />
        <span class="text-h6 text-bold">FoodPanda Clone</span>
      </q-toolbar-title>

      <!-- Right Side Actions -->
      <div class="row items-center q-gutter-sm">
        <q-btn flat round dense icon="notifications" class="gt-sm neon-icon" />
        <q-btn flat round dense icon="account_circle" class="gt-sm neon-icon" />

        <!-- Log In & Sign Up -->
        <q-btn outline color="white" label="Log In" class="q-ml-sm btn-glow" @click="showLogin = true" />
        <q-btn unelevated color="secondary" label="Sign Up" class="q-ml-sm btn-gradient" @click="showRegister = true" />
      </div>
    </q-toolbar>

    <!-- Login Modal -->
    <q-dialog v-model="showLogin">
      <LoginForm @logged-in="showLogin = false" />
    </q-dialog>

    <!-- Register Modal -->
    <q-dialog v-model="showRegister">
      <RegisterForm @registered="showRegister = false" />
    </q-dialog>
  </q-header>
</template>

<script>
import LoginForm from "../forms/LoginForm.vue";
import RegisterForm from "../forms/RegisterForm.vue";

export default {
  name: "MainNavbar",
  components: { LoginForm, RegisterForm },
  data() {
    return {
      showLogin: false,
      showRegister: false,
    };
  },
};
</script>

<style scoped>
/* Fancy styles */
.logo-spin {
  transition: transform 0.4s ease;
}
.logo-spin:hover {
  transform: rotate(360deg);
}

.neon-icon {
  transition: color 0.3s ease, transform 0.3s ease;
}
.neon-icon:hover {
  color: #ff4081;
  transform: scale(1.2);
}

.btn-glow:hover {
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.7);
}

.btn-gradient {
  background: linear-gradient(45deg, #ff4081, #ff9800);
  color: white;
}
.btn-gradient:hover {
  opacity: 0.9;
}
</style>
