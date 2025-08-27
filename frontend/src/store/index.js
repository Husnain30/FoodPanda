// src/store/index.js
import { createStore } from "vuex"
import auth from "./modules/auth"
import admin from "./modules/admin"
import restaurant from './modules/restaurant'

export default createStore({
  modules: {
    auth,
    admin,
    restaurant
  },
})
