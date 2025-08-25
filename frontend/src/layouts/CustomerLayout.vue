<template>
  <q-layout view="hHh lpR fFf">
    <CustomerNavbar />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import CustomerNavbar from '/src/modules/customer/components/CustomerNavbar.vue';
</script>

