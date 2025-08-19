<template>
  <q-footer class="footer-gradient text-white q-pa-md">
    <div class="row justify-between items-center q-col-gutter-sm">

      <!-- Left Side -->
      <div class="col-12 col-md-auto text-center text-md-left">
        <span class="text-body2">
          © 2025 <strong>FoodPanda Clone</strong>. All rights reserved.
        </span>
      </div>

      <!-- Right Side: Social Icons -->
      <div class="col-12 col-md-auto text-center">
        <q-btn
          flat round dense
          icon="mdi-facebook"
          class="social-btn"
          @click="openLink('https://facebook.com')"
        />
        <q-btn
          flat round dense
          icon="mdi-twitter"
          class="social-btn"
          @click="openLink('https://twitter.com')"
        />
        <q-btn
          flat round dense
          icon="mdi-instagram"
          class="social-btn"
          @click="openLink('https://instagram.com')"
        />
      </div>
    </div>
  </q-footer>
</template>

<script>
export default {
  name: "AppFooter",
  methods: {
    openLink(url) {
      window.open(url, "_blank");
    },
  },
};
</script>

<style scoped>

.social-btn {
  transition: transform 0.3s ease, color 0.3s ease;
  margin: 0 5px;
  color: white;
  font-size: 20px;
}

.social-btn:hover {
  transform: scale(1.2);
  color: #ffd740;
}
</style>
