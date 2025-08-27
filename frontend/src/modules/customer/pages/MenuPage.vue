<template>
  <q-page padding>
    <h1 class="page-title">📖 {{ restaurant?.name }} Menu</h1>
    <div class="text-subtitle2 text-grey q-mb-md">
      Cuisine: {{ restaurant?.cuisine }}
    </div>

    <div class="menu-grid">
      <MenuItem
        v-for="item in menu"
        :key="item.id"
        :title="item.name"
        :price="item.price"
      />
    </div>
  </q-page>
</template>

<script>
import MenuItem from "../components/MenuItem.vue";
import api from "@/boot/axios";

export default {
  components: { MenuItem },
  data() {
    return {
      restaurant: null,
      menu: [],
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    try {
      const res = await api.get(`/restaurants/${id}/menu`);
      this.restaurant = res.data.restaurant;
      this.menu = res.data.menu;
    } catch (err) {
      console.error("Error fetching menu:", err);
    }
  },
};
</script>

<style scoped>
.page-title {
  font-size: 28px;
  margin-bottom: 10px;
  font-weight: bold;
}
.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}
</style>
