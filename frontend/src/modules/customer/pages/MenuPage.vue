<template>
  <q-page class="menu-page q-pa-md">
    <!-- Header -->
    <div class="q-mb-md text-center">
      <h2 class="text-h5">{{ restaurant?.name || "Restaurant" }} Menu</h2>
      <p class="text-subtitle2 text-grey">
        Browse delicious dishes and order easily 🍴
      </p>
    </div>

    <!-- Menu Loader -->
    <div v-if="loading" class="text-center q-my-lg">
      <q-spinner color="primary" size="40px" />
      <p>Loading menu...</p>
    </div>

    <!-- Error -->
    <div v-if="error" class="text-negative text-center q-my-lg">
      {{ error }}
    </div>

    <!-- Menu Grid -->
    <div v-if="!loading && !error" class="row q-col-gutter-md">
      <div
        v-for="item in menu"
        :key="item.id"
        class="col-12 col-sm-6 col-md-4"
      >
        <q-card class="menu-card">
          <q-img
            :src="item.image || 'https://source.unsplash.com/400x200/?food,dish'"
            height="180px"
          />
          <q-card-section>
            <div class="text-h6">{{ item.name }}</div>
            <div class="text-subtitle2 text-grey-8">
              {{ item.description || "Delicious meal" }}
            </div>
            <div class="text-bold text-primary q-mt-sm">
              Rs. {{ item.price }}
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              unelevated
              color="secondary"
              icon="add_shopping_cart"
              label="Add to Cart"
              @click="addToCart(item)"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "MenuPage",
  data() {
    return {
      restaurant: null,
    };
  },
  computed: {
    ...mapState("customer", ["menu", "loading", "error"]),
  },
  created() {
    const restaurantId = this.$route.params.id;
    this.fetchMenu(restaurantId);
    this.fetchRestaurant(restaurantId);
  },
  methods: {
    ...mapActions("customer", ["fetchMenu", "fetchRestaurant"]),
    addToCart(item) {
      this.$store.dispatch("customer/addToCart", item);
      this.$q.notify({
        type: "positive",
        message: `${item.name} added to cart!`,
      });
    },
  },
};
</script>

<style scoped>
.menu-card {
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.menu-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.15);
}
</style>





