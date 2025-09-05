<template>
  <q-card class="restaurant-card cursor-pointer" @click="goToMenu">
    <!-- Restaurant Image -->
    <q-img
      :src="getImage(restaurant.id)"
      height="200px"
      class="restaurant-img"
    >
      <div class="absolute-bottom bg-gradient text-white q-pa-sm">
        <div class="text-h6">{{ restaurant.name }}</div>
        <div class="text-caption">{{ restaurant.cuisine_type || "Cuisine" }}</div>
      </div>
    </q-img>

    <!-- Info -->
    <q-card-section class="info-section">
      <div class="text-body2 text-grey-8">
        📍 {{ restaurant.address || "Unknown location" }}
      </div>
      <div class="text-body2 text-grey-8">
        ⏰ {{ restaurant.opening_time }} – {{ restaurant.closing_time }}
      </div>
      <div class="text-body2 text-orange-9 flex items-center">
        ⭐ {{ restaurant.rating || "4.5" }} / 5
      </div>
    </q-card-section>

    <!-- Actions -->
    <q-separator />
    <q-card-actions align="right">
      <q-btn
        unelevated
        color="primary"
        icon="restaurant_menu"
        label="View Menu"
        @click.stop="goToMenu"
        class="view-btn"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "RestaurantCard",
  props: {
    restaurant: { type: Object, required: true },
  },
  methods: {
    goToMenu() {
      this.$router.push(`/restaurants/1/menu`);
    },
    getImage(id) {
      if (id === 1) return require("images/res1.jpg");
      if (id === 2) return require("images/res2.jpg");
      
    },
  },
};
</script>

<style scoped>
.restaurant-card {
  border-radius: 14px;
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.restaurant-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.2);
}
.restaurant-img {
  background : url("images/res1.jpg");
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
}
.bg-gradient {
  background: linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0));
}
.info-section {
  padding: 12px 16px;
  line-height: 1.6;
}
.view-btn {
  border-radius: 8px;
  padding: 6px 16px;
  font-weight: bold;
  transition: background 0.2s ease;
}
.view-btn:hover {
  background-color: #1565c0 !important;
}
</style>





