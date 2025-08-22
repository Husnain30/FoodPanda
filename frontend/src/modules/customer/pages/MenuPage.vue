<template>
  <q-page padding>
    <h1 class="page-title">📖 Menu</h1>
    <div class="menu-grid">
      <MenuItem v-for="n in 6" :key="n" :title="'Dish ' + n" :price="10*n" />
    </div>
  </q-page>
</template>

<script>
import MenuItem from "../components/MenuItem.vue";
export default { components: { MenuItem } };
</script>

<style scoped>
.page-title { font-size: 28px; margin-bottom: 20px; }
.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}
</style>