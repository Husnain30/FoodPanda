<template>
  <q-page class="q-pa-md navigation-page">
    <div class="text-h5 q-mb-md">Navigation</div>
    <navigation-map />
  </q-page>
</template>

<script setup>
import NavigationMap from "../components/NavigationMap.vue";
</script>

<style scoped>
.navigation-page {
  background: #fefefe;
  border-radius: 12px;
}
</style>