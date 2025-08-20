// src/store/modules/admin.js
import api from "boot/axios";

const state = {
  stats: {},
  users: [],
};

const mutations = {
  SET_STATS(state, stats) {
    state.stats = stats;
  },
  SET_USERS(state, users) {
    state.users = users;
  },
};

const actions = {
  async fetchStats({ commit }) {
    try {
      const res = await api.get("/api/admin/stats");
      commit("SET_STATS", res.data);
    } catch (e) {
      console.error("Failed to fetch stats:", e);
    }
  },

  async fetchUsers({ commit }) {
    try {
      const res = await api.get("/api/admin/users");
      commit("SET_USERS", res.data);
    } catch (e) {
      console.error("Failed to fetch users:", e);
    }
  },
};

const getters = {
  stats: (state) => state.stats,
  users: (state) => state.users,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
