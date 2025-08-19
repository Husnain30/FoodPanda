<template>
  <q-layout view="lHh Lpr lFf">

    <!-- Optional: top header for auth pages -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>Welcome to FoodApp</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- Page container -->
    <q-page-container>
      <q-page class="flex flex-center">
        <!-- Render child routes here -->
        <router-view />
      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  name: "AuthLayout",
};
</script>
