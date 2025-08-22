<template>
  <q-card class="restaurant-card">
    <q-img :src="'https://picsum.photos/400/200?random=' + name" class="card-img" />
    <q-card-section>
      <div class="restaurant-name">{{ name }}</div>
      <div class="restaurant-details">{{ cuisine }}</div>
      <q-rating v-model="dummyRating" readonly size="20px" color="amber" />
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: ["name", "cuisine", "rating"],
  data() {
    return { dummyRating: 4 };
  },
};
</script>

<style scoped>
.restaurant-card { border-radius: 16px; overflow: hidden; transition: transform 0.3s; }
.restaurant-card:hover { transform: translateY(-5px); }
.card-img { height: 180px; }
.restaurant-name { font-weight: bold; font-size: 18px; margin-bottom: 6px; }
.restaurant-details { color: #666; font-size: 14px; margin-bottom: 4px; }
</style>