import api from "src/boot/axios";

const state = {
  restaurants: [],
  menu: [],
  cart: [],
  orders: [],        // 🆕 list of all orders
  currentOrder: null,
  reviews: [],
  loading: false,
  error: null,
};

const getters = {
  allRestaurants: (state) => state.restaurants,
  restaurantMenu: (state) => state.menu,
  customerCart: (state) => state.cart,
  customerOrders: (state) => state.orders,          // ✅ all orders
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
      commit("setError", error.response?.data?.message || "Failed to load restaurants");
    } finally {
      commit("setLoading", false);
    }
  },

  // ✅ fetch single restaurant menu
  async fetchMenu({ commit }, restaurantId) {
    try {
      commit("setLoading", true);
      const { data } = await api.get(`customer/restaurants/${restaurantId}/menu`);
      commit("setMenu", data);
    } catch (error) {
      commit("setError", error.response?.data?.message || "Failed to load menu");
    } finally {
      commit("setLoading", false);
    }
  },

  // ✅ place order
  async placeOrder({ commit }, orderData) {
    try {
      commit("setLoading", true);
      const { data } = await api.post("customer/orders", orderData);
      commit("addOrder", data);
      commit("clearCart");
      return data;
    } catch (error) {
      commit("setError", error.response?.data?.message || "Failed to place order");
      throw error;
    } finally {
      commit("setLoading", false);
    }
  },

  // ✅ fetch all orders (for /orders page)
  async fetchOrders({ commit }) {
    try {
      commit("setLoading", true);
      const { data } = await api.get("customer/orders");
      commit("setOrders", data);
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
      commit("setCurrentOrder", data);
    } catch (error) {
      commit("setError", error.response?.data?.message || "Failed to track order");
    } finally {
      commit("setLoading", false);
    }
  },

   async updateReview({ commit }, { id, reviewData }) {
    try {
      commit("setLoading", true);
      const { data } = await api.put(`customer/reviews/${id}`, reviewData);
      commit("updateReview", data);
    } catch (error) {
      commit("setError", error.response?.data?.message || "Failed to update review");
    } finally {
      commit("setLoading", false);
    }
  },

  // ✅ delete review
  async deleteReview({ commit }, id) {
    try {
      commit("setLoading", true);
      await api.delete(`customer/reviews/${id}`);
      commit("deleteReview", id);
    } catch (error) {
      commit("setError", error.response?.data?.message || "Failed to delete review");
    } finally {
      commit("setLoading", false);
    }
  },

  // ✅ post review
  async postReview({ commit }, reviewData) {
    try {
      commit("setLoading", true);
      const { data } = await api.post("customer/reviews", reviewData);
      commit("addReview", data);
    } catch (error) {
      commit("setError", error.response?.data?.message || "Failed to post review");
    } finally {
      commit("setLoading", false);
    }
  },

  // ✅ Cart Management (frontend only)
  addToCart({ commit }, item) {
    commit("addToCart", item);
  },
  removeFromCart({ commit }, itemId) {
    commit("removeFromCart", itemId);
  },
  clearCart({ commit }) {
    commit("clearCart");
  },
};

const mutations = {
  setRestaurants: (state, restaurants) => (state.restaurants = restaurants),
  setMenu: (state, menu) => (state.menu = menu),

  addOrder: (state, order) => state.orders.push(order),
  setOrders: (state, orders) => (state.orders = orders),   // ✅ mutation for fetchOrders
  setCurrentOrder: (state, order) => (state.currentOrder = order),
 addReview: (state, review) => state.reviews.push(review),

  updateReview: (state, updated) => {
    const idx = state.reviews.findIndex(r => r.id === updated.id);
    if (idx !== -1) state.reviews.splice(idx, 1, updated);
  },

  removeReview: (state, id) => {
    state.reviews = state.reviews.filter(r => r.id !== id);
  },

  addToCart: (state, item) => state.cart.push(item),
  removeFromCart: (state, itemId) =>
    (state.cart = state.cart.filter((i) => i.id !== itemId)),
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

