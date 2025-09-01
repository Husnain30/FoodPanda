<template>
  <q-page padding>
    <h1 class="page-title">📖 {{ restaurant?.name || "Menu" }}</h1>
    <div v-if="restaurant?.cuisine" class="text-subtitle2 text-grey q-mb-md">
      Cuisine: {{ restaurant.cuisine }}
    </div>

    <!-- Loading -->
    <div v-if="loading" class="q-pa-md text-grey">
      Loading menu...
    </div>

    <!-- Error -->
    <div v-else-if="error" class="q-pa-md text-negative">
      {{ error }}
    </div>

    <!-- Menu Items -->
    <div v-else class="menu-grid">
      <MenuItem
        v-for="item in menu"
        :key="item.id"
        :item="item"
        @add-to-cart="addToCart"
      />
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import MenuItem from "../components/MenuItem.vue";

export default {
  name: "MenuPage",
  components: { MenuItem },
  computed: {
    ...mapGetters("customer", [
      "restaurantMenu",
      "customerLoading",
      "customerError",
      "allRestaurants",
    ]),
    menu() {
      return this.restaurantMenu;
    },
    loading() {
      return this.customerLoading;
    },
    error() {
      return this.customerError;
    },
    restaurant() {
      const id = this.$route.params.id;
      return this.allRestaurants.find((r) => r.id == id) || null;
    },
  },
  async mounted() {
    const id = this.$route.params.id;
    // ✅ fetch menu from /customer/restaurants/:id/menu
    await this.$store.dispatch("customer/fetchMenu", id);
  },
  methods: {
    addToCart(item) {
      this.$store.dispatch("customer/addToCart", item);
    },
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




