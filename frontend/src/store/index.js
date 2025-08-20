// src/store/index.js
import { createStore } from 'vuex'
import auth from './modules/auth'
import admin from './modules/admin'
import customer from './modules/customer'
import restaurant from './modules/restaurant'
import rider from './modules/rider'

// Create store
export default createStore({
  modules: {
    auth,
    admin,
    customer,
    restaurant,
    rider
  }
})