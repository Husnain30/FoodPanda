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
        <!-- Notification + Account (desktop only) -->
        <q-btn flat round dense icon="notifications" class="gt-sm neon-icon" />
        <q-btn flat round dense icon="account_circle" class="gt-sm neon-icon" />

        <!-- Log In & Sign Up -->
        <q-btn
          outline
          color="white"
          label="Log In"
          class="q-ml-sm btn-glow"
          @click="$emit('login')"
        />
        <q-btn
          unelevated
          color="secondary"
          label="Sign Up"
          class="q-ml-sm btn-gradient"
          @click="$emit('signup')"
        />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  name: "MainNavbar",
};
</script>

<style scoped>
/* Gradient Background */
.bg-gradient {
  background: linear-gradient(90deg, #ff0080, #7928ca);
}

/* Neon Icon Hover */
.neon-icon:hover {
  color: #ffeb3b;
  text-shadow: 0 0 8px #ffeb3b, 0 0 16px #ffeb3b;
}

/* Animated Logo */
.logo-spin {
  transition: transform 0.4s ease-in-out;
}
.logo-spin:hover {
  transform: rotate(10deg) scale(1.1);
}

/* Glow Button */
.btn-glow {
  border: 2px solid white;
  transition: all 0.3s ease-in-out;
}
.btn-glow:hover {
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 12px white;
}

/* Gradient Button */
.btn-gradient {
  background: linear-gradient(135deg, #ff4b2b, #ff416c);
  color: white;
  font-weight: bold;
  border-radius: 8px;
  transition: all 0.3s ease-in-out;
}
.btn-gradient:hover {
  background: linear-gradient(135deg, #ff416c, #ff4b2b);
  box-shadow: 0 0 15px rgba(255, 65, 108, 0.8);
}

/* Responsive Adjustments */
@media (max-width: 600px) {
  .q-btn[label] {
    font-size: 12px;
    padding: 4px 10px;
    border-radius: 6px;
  }
}
</style>
