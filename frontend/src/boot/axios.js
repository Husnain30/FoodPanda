// src/boot/axios.js
import axios from "axios";
import store from "src/store";

const api = axios.create({
  baseURL: "https://6ad2a42541ac.ngrok-free.app/",
  timeout: 10000,
});

// Request → attach token
api.interceptors.request.use(
  (config) => {
    const token = store.getters["auth/getToken"];
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response → logout if unauthorized
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch("auth/logout");
    }
    return Promise.reject(error);
  }
);

export default api;