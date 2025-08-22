<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <!-- Shared Rider Navbar -->
    <RiderNavbar />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import RiderNavbar from '/src/modules/rider/components/RiderNavbar.vue';
</script>
