<template>
  <q-page class="cart-page q-pa-md">
    <div class="text-h5 q-mb-md">🛒 Your Cart</div>

    <!-- Loading -->
    <div v-if="loading" class="text-center q-my-lg">
      <q-spinner color="primary" size="40px" />
      <p>Loading your cart...</p>
    </div>

    <!-- Error -->
    <div v-if="error" class="text-negative text-center q-my-lg">
      {{ error }}
    </div>

    <!-- Empty Cart -->
    <div v-if="!loading && cartItems.length === 0" class="text-center q-my-lg">
      <q-icon name="remove_shopping_cart" size="48px" color="grey" />
      <p class="text-grey">Your cart is empty</p>
    </div>

    <!-- Cart Items -->
    <div v-if="!loading && cartItems.length > 0" class="row q-col-gutter-md">
      <div v-for="item in cartItems" :key="item.id" class="col-12 col-md-6">
        <q-card class="cart-item-card">
          <q-card-section class="row items-center">
            <q-img
              :src="item.image || 'https://source.unsplash.com/100x100/?food'"
              :alt="item.name"
              class="cart-img col-3"
            />
            <div class="col-6 q-pl-md">
              <div class="text-h6">{{ item.name }}</div>
              <div class="text-subtitle2 text-grey">Rs. {{ item.price }}</div>
              <div class="text-caption">Qty: {{ item.quantity }}</div>
            </div>
            <div class="col-3 text-right">
              <q-btn
                dense
                flat
                round
                color="negative"
                icon="delete"
                @click="removeItem(item)"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Total & Actions -->
    <div
      v-if="cartItems.length > 0"
      class="q-mt-lg flex justify-between items-center"
    >
      <div class="text-h6">
        Total: Rs. {{ totalPrice }}
      </div>
      <div>
        <q-btn
          color="negative"
          flat
          label="Clear Cart"
          @click="clearCart"
          class="q-mr-sm"
        />
        <q-btn color="primary" label="Checkout" @click="checkout" />
      </div>
    </div>
  </q-page>
</template>

<script>
import api from "src/boot/axios";

export default {
  name: "CartPage",
  data() {
    return {
      cartItems: [],
      loading: false,
      error: null,
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
  },
  methods: {
    async fetchCart() {
      try {
        this.loading = true;
        const { data } = await api.get("/carts/1/items"); // ✅ Adjust cartId dynamically if needed
        this.cartItems = data.data || [];
      } catch (err) {
        console.error(err);
        this.error = err.response?.data?.message || "Failed to load your cart.";
      } finally {
        this.loading = false;
      }
    },
    async removeItem(item) {
      try {
        await api.delete(`/cart-items/${item.id}`);
        this.cartItems = this.cartItems.filter((i) => i.id !== item.id);
      } catch (err) {
        console.error(err);
        this.$q.notify({
          type: "negative",
          message: "Failed to remove item",
        });
      }
    },
    async clearCart() {
      try {
        for (const item of this.cartItems) {
          await api.delete(`/cart-items/${item.id}`);
        }
        this.cartItems = [];
        this.$q.notify({ type: "positive", message: "Cart cleared!" });
      } catch (err) {
        console.error(err);
        this.$q.notify({
          type: "negative",
          message: "Failed to clear cart",
        });
      }
    },
    async checkout() {
      try {
        await api.post("/orders", {
          cart_id: 1, // ✅ Replace with dynamic cartId
          items: this.cartItems,
        });
        this.cartItems = [];
        this.$q.notify({ type: "positive", message: "Order placed successfully!" });
        this.$router.push("/orders");
      } catch (err) {
        console.error(err);
        this.$q.notify({
          type: "negative",
          message: "Checkout failed",
        });
      }
    },
  },
  created() {
    this.fetchCart();
  },
};
</script>

<style scoped>
.cart-item-card {
  border-radius: 12px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.cart-item-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
}
.cart-img {
  border-radius: 8px;
  height: 80px;
  object-fit: cover;
}
</style>



