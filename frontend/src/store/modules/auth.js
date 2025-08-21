const state = {
  users: JSON.parse(localStorage.getItem("users") || "[]"),
  currentUser: JSON.parse(localStorage.getItem("currentUser") || "null"),
}

const mutations = {
  REGISTER_USER(state, payload) {
    state.users.push(payload)
    localStorage.setItem("users", JSON.stringify(state.users))
  },
  LOGIN_USER(state, user) {
    state.currentUser = user
    localStorage.setItem("currentUser", JSON.stringify(user))
  },
  LOGOUT_USER(state) {
    state.currentUser = null
    localStorage.removeItem("currentUser")
  },
}

const actions = {
  register({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      const exists = state.users.find(u => u.email === payload.email)
      if (exists) {
        reject("User already exists")
      } else {
        commit("REGISTER_USER", payload)
        resolve()
      }
    })
  },

  login({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      const user = state.users.find(
        u =>
          (u.email === payload.email || u.name === payload.email) &&
          u.password === payload.password
      )
      if (user) {
        commit("LOGIN_USER", user)
        resolve(user) // ✅ send user back with role
      } else {
        reject("Invalid credentials")
      }
    })
  },

  logout({ commit }) {
    commit("LOGOUT_USER")
  },
}

const getters = {
  isAuthenticated: state => !!state.currentUser,
  currentUser: state => state.currentUser,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
