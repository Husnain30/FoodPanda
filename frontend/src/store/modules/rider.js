// src/store/modules/rider.js
import api from "src/boot/axios";

const state = {
  status: "offline", // online | offline
  orders: [],
  earnings: 0,
  loading: false,
  error: null,
};

const getters = {
  riderStatus: (state) => state.status,
  riderOrders: (state) => state.orders,
  riderEarnings: (state) => state.earnings,
  riderLoading: (state) => state.loading,
  riderError: (state) => state.error,
};

const actions = {
async updateStatus({ commit }, status) {
  try {
    commit("setLoading", true);
    await api.post("/riders/status", { status });
    commit("setStatus", status);
  } catch (error) {
    commit(
      "setError",
      error.response?.data?.message || "Failed to update status"
    );
  } finally {
    commit("setLoading", false);
  }
},



  // ✅ fetch all orders
  async fetchOrders({ commit }) {
    try {
      commit("setLoading", true);
      const { data } = await api.get("/riders/orders"); // plural ✅
      commit("setOrders", data.data.orders);
    } catch (error) {
      commit(
        "setError",
        error.response?.data?.message || "Failed to fetch orders"
      );
    } finally {
      commit("setLoading", false);
    }
  },

  // ✅ update single order status
  async updateOrderStatus({ commit }, { id, status }) {
    try {
      commit("setLoading", true);
      await api.patch(`/riders/orders/${id}`, { status }); // singular ✅
      commit("updateOrder", { id, status });
    } catch (error) {
      commit(
        "setError",
        error.response?.data?.message || "Failed to update order"
      );
    } finally {
      commit("setLoading", false);
    }
  },

async fetchEarnings({ commit }) {
  try {
    commit("setLoading", true);
    const { data } = await api.get("/riders/earnings");

    // ✅ Save full earnings data from API
    commit("setEarnings", data.data);
  } catch (error) {
    commit(
      "setError",
      error.response?.data?.message || "Failed to fetch earnings"
    );
  } finally {
    commit("setLoading", false);
  }
},



  async logout({ commit }) {
    try {
      await api.post("logout");
      commit("resetRider");
    } catch (error) {
      commit(
        "setError",
        error.response?.data?.message || "Failed to logout"
      );
    }
  },
};

const mutations = {
  setStatus: (state, status) => (state.status = status),
  setOrders: (state, orders) => (state.orders = orders),
  updateOrder: (state, { id, status }) => {
    const order = state.orders.find((o) => o.id === id);
    if (order) order.status = status;
  },
  setEarnings: (state, earnings) => (state.earnings = earnings),
  setLoading: (state, loading) => (state.loading = loading),
  setError: (state, error) => (state.error = error),
  resetRider: (state) => {
    state.status = "offline";
    state.orders = [];
    state.earnings = 0;
    state.loading = false;
    state.error = null;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

