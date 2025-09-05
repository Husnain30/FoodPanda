import api from "src/boot/axios";

const state = {
  restaurants: [],
  menu: [],
  cart: [],   // 🛒 make it an array (not null)
  orders: [],
  currentOrder: null,
  reviews: [],
  loading: false,
  error: null,
};

const getters = {
  allRestaurants: (state) => state.restaurants,
  restaurantMenu: (state) => state.menu,
  customerCart: (state) => state.cart,
  customerOrders: (state) => state.orders,
  currentOrder: (state) => state.currentOrder,
  customerReviews: (state) => state.reviews,
  customerLoading: (state) => state.loading,
  customerError: (state) => state.error,
};

const actions = {
  // ✅ fetch all restaurants
  async fetchRestaurants({ commit }) {
    try {
      commit("setLoading", true);
      const { data } = await api.get("customer/restaurants");
      commit("setRestaurants", data);
    } catch (error) {
      commit(
        "setError",
        error.response?.data?.message || "Failed to load restaurants"
      );
    } finally {
      commit("setLoading", false);
    }
  },

  // ✅ fetch single restaurant menu
  async fetchMenu({ commit }, ) {
    try {
      commit("setLoading", true);
      const { data } = await api.get(`customer/restaurants/1/menu`);
      commit("setRestaurant", data.data);
      commit("setMenu", data.data.menus);
    } catch (error) {
      commit("setError", error.response?.data?.message || "Failed to load menu");
    } finally {
      commit("setLoading", false);
    }
  },

  // ✅ Cart APIs
 async addToCart({ commit, state }, item) {
    try {
      commit("setLoading", true);

      let cartId = state.cartId;

      // 1️⃣ If no cart exists, create one first
      if (!cartId) {
        const { data } = await api.post("customer/carts"); 
        cartId = data.data.id;
        commit("setCartId", cartId);
      }

      // 2️⃣ Add item to cart
      const { data } = await api.post(`customer/carts/${cartId}/items`, {
        menu_item_id: item.id,
        quantity: 1,
      });

      commit("addToCart", data.data);
    } catch (error) {
      commit("setError", error.response?.data?.message || "Failed to add to cart");
    } finally {
      commit("setLoading", false);
    }
  },

  async fetchCart({ commit, state }) {
    try {
      commit("setLoading", true);
      if (!state.cartId) return;

      const { data } = await api.get(`customer/carts/${state.cartId}/items`);
      commit("setCart", data.data);
    } catch (error) {
      commit("setError", error.response?.data?.message || "Failed to load cart");
    } finally {
      commit("setLoading", false);
    }
  },

  async updateCartItem({ commit }, { id, quantity }) {
    try {
      const { data } = await api.patch(`customer/cart-items/${id}`, { quantity });
      commit("updateCartItem", data);
    } catch (error) {
      commit("setError", error.response?.data?.message || "Failed to update item");
    }
  },

  async removeFromCart({ commit }, id) {
    try {
      await api.delete(`customer/cart-items/${id}`);
      commit("removeFromCart", id);
    } catch (error) {
      commit("setError", error.response?.data?.message || "Failed to remove item");
    }
  },

  async clearCart({ commit }) {
    commit("clearCart");
  },

  // ✅ place order
  async placeOrder({ commit }, orderData) {
    try {
      commit("setLoading", true);
      const { data } = await api.post("customer/orders", orderData);
      commit("addOrder", data.data);
      commit("clearCart");
      return data;
    } catch (error) {
      commit("setError", error.response?.data?.message || "Failed to place order");
      throw error;
    } finally {
      commit("setLoading", false);
    }
  },

  // ✅ fetch order history
  async fetchOrders({ commit }) {
    try {
      commit("setLoading", true);
      const { data } = await api.get("customer/orders");
      commit("setOrders", data.data);
    } catch (error) {
      commit("setError", error.response?.data?.message || "Failed to load orders");
    } finally {
      commit("setLoading", false);
    }
  },

  // ✅ track single order
  async trackOrder({ commit }, orderId) {
    try {
      commit("setLoading", true);
      const { data } = await api.get(`customer/orders/${orderId}`);
      commit("setCurrentOrder", data.data);
    } catch (error) {
      commit("setError", error.response?.data?.message || "Failed to track order");
    } finally {
      commit("setLoading", false);
    }
  },

  // ✅ reviews
  async updateReview({ commit }, { id, reviewData }) {
    try {
      commit("setLoading", true);
      const { data } = await api.put(`customer/reviews/${id}`, reviewData);
      commit("updateReview", data.data);
    } catch (error) {
      commit("setError", error.response?.data?.message || "Failed to update review");
    } finally {
      commit("setLoading", false);
    }
  },

  async deleteReview({ commit }, id) {
    try {
      commit("setLoading", true);
      await api.delete(`customer/reviews/${id}`);
      commit("removeReview", id);
    } catch (error) {
      commit("setError", error.response?.data?.message || "Failed to delete review");
    } finally {
      commit("setLoading", false);
    }
  },

  async postReview({ commit }, reviewData) {
    try {
      commit("setLoading", true);
      const { data } = await api.post("customer/reviews", reviewData);
      commit("addReview", data.data);
    } catch (error) {
      commit("setError", error.response?.data?.message || "Failed to post review");
    } finally {
      commit("setLoading", false);
    }
  },
};

const mutations = {
  setRestaurants: (state, restaurants) => (state.restaurants = restaurants),
  setMenu: (state, menu) => (state.menu = menu),
  setCart: (state, cart) => (state.cart = cart),

  addOrder: (state, order) => state.orders.push(order),
  setOrders: (state, orders) => (state.orders = orders),
  setCurrentOrder: (state, order) => (state.currentOrder = order),

  addReview: (state, review) => state.reviews.push(review),
  updateReview: (state, updated) => {
    const idx = state.reviews.findIndex((r) => r.id === updated.id);
    if (idx !== -1) state.reviews.splice(idx, 1, updated);
  },
  removeReview: (state, id) => {
    state.reviews = state.reviews.filter((r) => r.id !== id);
  },

  addToCart: (state, item) => state.cart.push(item),
  updateCartItem: (state, updated) => {
    const idx = state.cart.findIndex((i) => i.id === updated.id);
    if (idx !== -1) state.cart.splice(idx, 1, updated);
  },
  removeFromCart: (state, itemId) => {
    state.cart = state.cart.filter((i) => i.id !== itemId);
  },
  clearCart: (state) => (state.cart = []),

  setLoading: (state, loading) => (state.loading = loading),
  setError: (state, error) => (state.error = error),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};


