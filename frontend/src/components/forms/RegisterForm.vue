<template>
  <div class="register-page">
    <div class="register-container">
      <h2 class="register-title">Create Account ✨</h2>
      <p class="register-subtitle">Join us and start your journey today</p>

      <form @submit.prevent="onSubmit" class="register-form">
        <input
          v-model="form.name"
          type="text"
          placeholder="Full Name"
          required
          class="input-field"
        />
        <input
          v-model="form.email"
          type="email"
          placeholder="Email Address"
          required
          class="input-field"
        />
        <input
          v-model="form.password"
          type="password"
          placeholder="Password"
          required
          class="input-field"
        />

        <select v-model="form.role" required class="input-field">
          <option disabled value="">Select Role</option>
          <option value="customer">Customer</option>
          <option value="restaurant">Restaurant</option>
          <option value="rider">Rider</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" class="register-btn">Register</button>
      </form>

      <p v-if="error" class="error-msg">{{ error }}</p>

      <!-- ✅ Login link -->
      <p class="login-link">
        Already have an account?
        <router-link to="/auth/login" class="login-anchor">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import api from "boot/axios" // Axios instance with /api baseURL

const router = useRouter()
const error = ref("")

const form = reactive({
  name: "",
  email: "",
  password: "",
  role: "",
})

const onSubmit = async () => {
  error.value = ""
  try {
    const res = await api.post("/auth/register", form) // ✅ relative path
    console.log("✅ Registration Success:", res.data)

    // Redirect user after register
    router.push("/auth/login")
  } catch (err) {
    console.error("❌ Registration failed:", err)
    error.value = err.response?.data?.message || "Something went wrong!"
  }
}
</script>

<style scoped>
/* Background with Purple-Blue Gradient */
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  font-family: "Poppins", sans-serif;
}

/* Card container */
.register-container {
  background: #fff;
  padding: 2.5rem 2rem;
  border-radius: 1.5rem;
  width: 380px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  text-align: center;
  animation: fadeIn 0.8s ease;
}

.register-title {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
  color: #333;
}

.register-subtitle {
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 1.5rem;
}

/* Inputs */
.input-field {
  width: 100%;
  padding: 0.85rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.9rem;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  outline: none;
}

.input-field:focus {
  border-color: #6a11cb;
  box-shadow: 0 0 8px rgba(106, 17, 203, 0.3);
  transform: translateY(-2px);
}

/* Button */
.register-btn {
  width: 100%;
  padding: 0.9rem;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  border: none;
  border-radius: 0.9rem;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.register-btn:hover {
  opacity: 0.92;
  transform: translateY(-2px);
}

/* Error message */
.error-msg {
  margin-top: 1rem;
  color: red;
  font-size: 0.9rem;
  font-weight: 500;
}

/* Login link */
.login-link {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #555;
}

.login-anchor {
  color: #2575fc;
  font-weight: 600;
  text-decoration: none;
}

.login-anchor:hover {
  text-decoration: underline;
}

/* Smooth Fade-In */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
