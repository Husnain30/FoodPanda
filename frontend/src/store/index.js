// src/store/index.js
import { createStore } from "vuex";

// Import all modules
import auth from "./modules/auth";
import admin from "./modules/admin";
import customer from "./modules/customer";
import rider from "./modules/rider"; // ✅ customer module imported
import restaurant from "./modules/restaurant";


export default createStore({
  modules: {
    auth,
    admin,
    customer, 
    restaurant,
    rider,// ✅ customer module added
  },
});
