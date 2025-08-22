<template>
  <div class="login-page">
    <div class="login-container">
      <h2 class="login-title">Welcome Back 👋</h2>
      <p class="login-subtitle">Sign in to continue your journey</p>

      <form @submit.prevent="onSubmit" class="login-form">
        <input
          v-model="form.email"
          type="text"
          placeholder="Email or Username"
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
          <option value="admin">Admin</option>
          <option value="restaurant">Restaurant</option>
          <option value="rider">Rider</option>
          <option value="customer">Customer</option>
        </select>

        <button type="submit" class="login-btn">Login</button>
      </form>

      <p v-if="error" class="error-msg">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"

const store = useStore()
const router = useRouter()
const error = ref("")

const form = reactive({
  email: "",
  password: "",
  role: "",
})

const onSubmit = async () => {
  error.value = ""
  try {
    const res = await store.dispatch("auth/login", form)
    let user = res.user

    if (!user) {
      throw new Error("Invalid login response")
    }

    // Normalize role
    let role = user.role
    if (!role && user.roles && user.roles.length > 0) {
      role = user.roles[0].name
    }

    if (!role) {
      throw new Error("User role not found")
    }

    // Role-based redirect
    switch (role) {
      case "admin":
        router.push("/admin/dashboard")
        break
      case "restaurant":
        router.push("/restaurant/dashboard")
        break
      case "rider":
        router.push("/rider")
        break
      case "customer":
        router.push("/restaurants")
        break
      default:
        router.push("/")
    }
  } catch (err) {
    console.error("Login error:", err)
    error.value = "Invalid login credentials or role"
  }
}
</script>



<style scoped>
/* Background */
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  font-family: "Poppins", sans-serif;
}

/* Card */
.login-container {
  background: #fff;
  padding: 2.5rem 2rem;
  border-radius: 1.5rem;
  width: 380px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  text-align: center;
  animation: fadeIn 0.8s ease;
}

.login-title {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
  color: #333;
}

.login-subtitle {
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
.login-btn {
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
.login-btn:hover {
  opacity: 0.92;
  transform: translateY(-2px);
}

/* Error */
.error-msg {
  margin-top: 1rem;
  color: red;
  font-size: 0.9rem;
  font-weight: 500;
}

/* Animation */
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
