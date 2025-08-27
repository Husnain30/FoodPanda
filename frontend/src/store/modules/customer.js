// src/store/modules/customer/restaurants.js
import axios from "axios";

const state = {
  restaurants: [],
  loading: false,
  error: null,
};

const getters = {
  allRestaurants: (state) => state.restaurants,
  isLoading: (state) => state.loading,
  fetchError: (state) => state.error,
};

const actions = {
  async fetchRestaurants({ commit }) {
    commit("setLoading", true);
    commit("setError", null);
    try {
      const res = await axios.get("/restaurants");
      commit("setRestaurants", res.data);
    } catch (err) {
      commit("setError", "Failed to fetch restaurants");
      console.error(err);
    } finally {
      commit("setLoading", false);
    }
  },
};

const mutations = {
  setRestaurants: (state, restaurants) => (state.restaurants = restaurants),
  setLoading: (state, status) => (state.loading = status),
  setError: (state, error) => (state.error = error),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
