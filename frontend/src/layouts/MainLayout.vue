<template>
  <q-layout view="hHh lpR fFf">
    <!-- Top Navbar -->
    <MainNavbar @toggle-sidebar="drawer = !drawer" />

    <!-- Sidebar -->
    <AppSidebar v-model="drawer" />

    <!-- Main Page Container -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Footer -->
    <AppFooter />
  </q-layout>
</template>

<script>
import MainNavbar from "src/components/layout/MainNavbar.vue";
import AppSidebar from "src/components/layout/AppSidebar.vue";
import AppFooter from "src/components/layout/AppFooter.vue";

export default {
  name: "MainLayout",
  components: {
    MainNavbar,
    AppSidebar,
    AppFooter,
  },
  data() {
    return {
      drawer: false,
    };
  },
};
</script>
