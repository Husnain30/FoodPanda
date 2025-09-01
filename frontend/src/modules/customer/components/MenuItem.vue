<template>
  <q-card class="menu-item">
    <q-card-section>
      <div class="menu-title">{{ item.name }}</div>
      <div class="menu-price">$ {{ item.price.toFixed(2) }}</div>
      <q-btn
        color="primary"
        flat
        icon="add_shopping_cart"
        label="Add to Cart"
        @click="$emit('add-to-cart', item)"
      />
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "MenuItem",
  props: {
    item: { type: Object, required: true },
  },
};
</script>

<style scoped>
.menu-item {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}
.menu-item:hover {
  transform: scale(1.03);
}
.menu-title {
  font-size: 16px;
  font-weight: bold;
}
.menu-price {
  font-size: 14px;
  color: #888;
  margin-bottom: 8px;
}
</style>


