// // src/boot/axios.js
// import axios from "axios"

// // -------------------
// // Axios instance
// // -------------------
// const api = axios.create({
//   baseURL: "https://e67333ed90e1.ngrok-free.app/api/",

//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
// })

// // -------------------
// // Request Interceptor
// // -------------------
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token")
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => Promise.reject(error)
// )

// // -------------------
// // Response Interceptor
// // -------------------
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       if (error.response.status === 401) {
//         // Unauthorized: clear localStorage and force login
//         localStorage.removeItem("token")
//         localStorage.removeItem("user")
//         window.location.href = "/auth/login"
//       }
//     }
//     return Promise.reject(error)
//   }
// )

// export default api

//update

// src/boot/axios.js
import axios from 'axios'

// -------------------
// Axios instance
// -------------------
const api = axios.create({
  // baseURL: 'http://192.168.18.88:8000/api/',

  baseURL: 'https://8434b052da68.ngrok-free.app/api/',

  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'ngrok-skip-browser-warning': 'true', // Skip ngrok warning
  },
})

// -------------------
// Request Interceptor
// -------------------
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('❌ Request error:', error)
    return Promise.reject(error)
  },
)

// -------------------
// Response Interceptor
// -------------------
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response

      if (status === 401) {
        // Unauthorized: clear session and redirect to login
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/auth/login'
      }

      console.error(`❌ API Error [${status}]:`, data?.message || error.message)
    } else if (error.request) {
      console.error('❌ Network error:', error.message)
    } else {
      console.error('❌ Request setup error:', error.message)
    }

    return Promise.reject(error)
  },
)

export default api
