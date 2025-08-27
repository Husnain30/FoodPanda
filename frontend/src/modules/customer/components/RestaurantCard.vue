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
.restaurant-card {
  border-radius: 18px;
  overflow: hidden;
  transition: all 0.3s ease;
  background: #fff;
  box-shadow: 
    0 4px 8px rgba(106, 17, 203, 0.15),   /* purple glow */
    0 6px 20px rgba(37, 117, 252, 0.15),  /* blue glow */
    0 2px 4px rgba(0, 0, 0, 0.08);        /* soft dark shadow */
}

.restaurant-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 
    0 6px 12px rgba(106, 17, 203, 0.25),
    0 10px 25px rgba(37, 117, 252, 0.25),
    0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-img {
  height: 180px;
  object-fit: cover;
  filter: brightness(0.95);
  transition: filter 0.3s ease;
}
.card-img:hover {
  filter: brightness(1.05);
}

.restaurant-name {
  font-weight: 700;
  font-size: 19px;
  margin-bottom: 6px;
  color: #333;
}

.restaurant-details {
  color: #666;
  font-size: 15px;
  margin-bottom: 6px;
}
</style>
