// src/store/modules/admin.js
const state = {
  stats: {
    totalUsers: 120,
    totalBookings: 340,
    revenue: 56000,
  },
  users: [
    { id: 1, name: "Ali", email: "ali@test.com" },
    { id: 2, name: "Sara", email: "sara@test.com" },
  ],
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
    // ⚡ Abhi backend nahi hai, dummy data se hi update karwa dete hain
    const fakeStats = {
      totalUsers: 150,
      totalBookings: 400,
      revenue: 75000,
    };
    commit("SET_STATS", fakeStats);
  },

  async fetchUsers({ commit }) {
    const fakeUsers = [
      { id: 3, name: "Usman", email: "usman@test.com" },
      { id: 4, name: "Ayesha", email: "ayesha@test.com" },
    ];
    commit("SET_USERS", fakeUsers);
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
