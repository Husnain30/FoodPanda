// src/store/modules/auth.js
const state = {
  token: localStorage.getItem("token") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
    localStorage.setItem("token", token)
  },
  SET_USER(state, user) {
    state.user = user
    localStorage.setItem("user", JSON.stringify(user))
  },
  LOGOUT(state) {
    state.token = null
    state.user = null
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }
}

const actions = {
  async login({ commit }, credentials) {
    try {
      // This would be your API call - for now, let's mock it
      console.log('Login attempt with:', credentials)
      
      // Simulate API response
      const response = {
        data: {
          token: 'mock-jwt-token',
          user: {
            id: 1,
            email: credentials.email,
            role: credentials.role || 'customer',
            name: 'Test User'
          }
        }
      }
      
      const { token, user } = response.data
      commit("SET_TOKEN", token)
      commit("SET_USER", user)

      return response.data
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          "Login failed"
      throw new Error(errorMessage)
    }
  },

  logout({ commit }) {
    commit("LOGOUT")
  }
}

const getters = {
  isAuthenticated: (state) => !!state.token,
  getUser: (state) => state.user,
  getToken: (state) => state.token
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}