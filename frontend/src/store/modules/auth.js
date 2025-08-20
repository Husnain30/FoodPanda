// src/store/modules/auth.js
import api from "boot/axios";

const state = {
  token: localStorage.getItem("token") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
    localStorage.setItem("token", token);
  },
  SET_USER(state, user) {
    state.user = user;
    localStorage.setItem("user", JSON.stringify(user));
  },
  LOGOUT(state) {
    state.token = null;
    state.user = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};

const actions = {
  async login({ commit }, credentials) {
    try {
      const res = await api.post("/api/login", credentials); // backend login
      const { token, user } = res.data;

      commit("SET_TOKEN", token);
      commit("SET_USER", user);

      return res.data;
    } catch (err) {
      throw err.response?.data || err;
    }
  },

  logout({ commit }) {
    commit("LOGOUT");
  },
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  getUser: (state) => state.user,
  getToken: (state) => state.token,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
