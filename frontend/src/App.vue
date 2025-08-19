<template>
  <q-layout view="hHh lpR fFf">
    <!-- Header -->
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>🍔 Foodpanda Clone</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- Router Pages -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Footer -->
    <q-footer class="text-center bg-grey-8 text-white">
      <p class="q-ma-none">© 2025 Foodpanda Clone</p>
    </q-footer>
  </q-layout>
</template>
