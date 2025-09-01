const state = {
  cart: [],
};

const mutations = {
  ADD_TO_CART(state, item) {
    const existing = state.cart.find((i) => i.id === item.id);
    if (existing) {
      existing.quantity++;
    } else {
      state.cart.push({ ...item, quantity: 1 });
    }
  },
  REMOVE_FROM_CART(state, itemId) {
    state.cart = state.cart.filter((i) => i.id !== itemId);
  },
  CLEAR_CART(state) {
    state.cart = [];
  },
};

const actions = {
  addToCart({ commit }, item) {
    commit("ADD_TO_CART", item);
  },
  removeFromCart({ commit }, itemId) {
    commit("REMOVE_FROM_CART", itemId);
  },
  clearCart({ commit }) {
    commit("CLEAR_CART");
  },
};

const getters = {
  cartItems: (state) => state.cart,
  cartTotal: (state) =>
    state.cart.reduce((sum, i) => sum + i.price * i.quantity, 0),
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

