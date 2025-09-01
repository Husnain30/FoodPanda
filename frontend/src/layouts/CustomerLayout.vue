<template>
  <q-layout view="hHh lpR fFf">
    <CustomerNavbar />
    <q-page-container>
      <router-view />
    </q-page-container>
    <customer-footer/>
  </q-layout>
</template>

<script setup>
import CustomerNavbar from '/src/modules/customer/components/CustomerNavbar.vue';
import customerFooter from '/src/modules/customer/components/CustomerFooter.vue';
</script>

