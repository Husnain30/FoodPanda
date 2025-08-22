// // src/store/modules/auth.js
// import api from "boot/axios";
// import { LocalStorage } from "quasar";

// const state = {
//   token: LocalStorage.getItem("token") || null,
//   user: LocalStorage.getItem("user") || null,
// };

// const mutations = {
//   SET_TOKEN(state, token) {
//     state.token = token;
//     if (token) {
//       LocalStorage.set("token", token);
//     } else {
//       LocalStorage.remove("token");
//     }
//   },
//   SET_USER(state, user) {
//     state.user = user;
//     if (user) {
//       LocalStorage.set("user", user);
//     } else {
//       LocalStorage.remove("user");
//     }
//   },
// };

// const actions = {
//   async login({ commit }, credentials) {
//     try {
//       const res = await api.post("/api/auth/login", credentials);
//       commit("SET_TOKEN", res.data.token);
//       commit("SET_USER", res.data.user);
//       return res.data;
//     } catch (e) {
//       console.error("Login failed:", e);
//       throw e;
//     }
//   },

//   async register({ commit }, payload) {
//     try {
//       const res = await api.post("/api/auth/register", payload);
//       commit("SET_TOKEN", res.data.token);
//       commit("SET_USER", res.data.user);
//       return res.data;
//     } catch (e) {
//       console.error("Registration failed:", e);
//       throw e;
//     }
//   },

//   async fetchUser({ commit, state }) {
//     if (!state.token) return;
//     try {
//       const res = await api.get("/api/auth/me");
//       commit("SET_USER", res.data);
//     } catch (e) {
//       console.error("Failed to fetch user:", e);
//       commit("SET_TOKEN", null);
//       commit("SET_USER", null);
//     }
//   },

//   logout({ commit }) {
//     commit("SET_TOKEN", null);
//     commit("SET_USER", null);
//   },
// };

// const getters = {
//   isAuthenticated: (state) => !!state.token,
//   getUser: (state) => state.user,
//   getRole: (state) => state.user?.role || "guest",
// };

// export default {
//   namespaced: true,
//   state,
//   mutations,
//   actions,
//   getters,
// };





// api
// src/store/modules/auth.js
// src/store/modules/auth.js
// store/modules/auth.js
import api from "boot/axios"

const state = {
  token: localStorage.getItem("token") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
    if (token) {
      localStorage.setItem("token", token)
    } else {
      localStorage.removeItem("token")
    }
  },
  SET_USER(state, user) {
    state.user = user
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
    }
  },
}

const actions = {
  // ----------------
  // Register
  // ----------------
  async register({ commit }, payload) {
    try {
      const res = await api.post("/auth/register", payload) // ✅ relative path
      const { token, user } = res.data
      commit("SET_TOKEN", token)
      commit("SET_USER", user)
      return res.data
    } catch (err) {
      console.error("Register error:", err)
      throw err
    }
  },

  // ----------------
  // Login
  // ----------------
  async login({ commit }, payload) {
    try {
      const res = await api.post("/auth/login", payload) // ✅ relative path
      const { token, user } = res.data
      commit("SET_TOKEN", token)
      commit("SET_USER", user)
      return res.data
    } catch (err) {
      console.error("Login error:", err)
      throw err
    }
  },

  // ----------------
  // Logout
  // ----------------
  logout({ commit }) {
    commit("SET_TOKEN", null)
    commit("SET_USER", null)
  },
}

const getters = {
  isAuthenticated: (state) => !!state.token,
  user: (state) => state.user,
  token: (state) => state.token,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
