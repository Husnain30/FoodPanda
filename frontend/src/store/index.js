// src/store/index.js
import { createStore } from "vuex"
import auth from "./modules/auth"
import admin from "./modules/admin"
import cart from "./modules/cart"
import customer from "./modules/customer"

export default createStore({
  modules: {
    auth,
    admin,
    cart,
    customer,
  },
})
