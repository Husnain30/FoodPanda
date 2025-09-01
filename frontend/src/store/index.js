// src/store/index.js
import { createStore } from "vuex";

// Import all modules
import auth from "./modules/auth";
import admin from "./modules/admin";
import customer from "./modules/customer";
import rider from "./modules/rider"; // ✅ customer module imported


export default createStore({
  modules: {
    auth,
    admin,
    customer, 
    rider,// ✅ customer module added
  },
});
