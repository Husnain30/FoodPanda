// src/boot/axios.js
import axios from "axios"

// -------------------
// Axios instance
// -------------------
const api = axios.create({
  baseURL: "http://192.168.11.114:8000/api/", // ✅ /api added
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

// -------------------
// Request Interceptor
// -------------------
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// -------------------
// Response Interceptor
// -------------------
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Unauthorized: clear localStorage and force login
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        window.location.href = "/auth/login"
      }
    }
    return Promise.reject(error)
  }
)

export default api
