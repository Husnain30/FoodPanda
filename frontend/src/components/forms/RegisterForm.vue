<template>
  <div class="register-page">
    <!-- Left Side - Image Section -->
    <div class="image-section">
      <div class="image-overlay">
        <div class="brand-content">
          <h1 class="brand-title">
            <span class="brand-icon">🍽️</span>
            FoodieExpress
          </h1>
          <p class="brand-tagline">Delicious food delivered to your doorstep</p>
          <div class="feature-list">
            <div class="feature-item">
              <span class="feature-icon">⚡</span>
              <span>Lightning Fast Delivery</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">🍕</span>
              <span>Fresh & Hot Meals</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">📱</span>
              <span>Easy Mobile Ordering</span>
            </div>
          </div>
        </div>
      </div>
      <div class="floating-elements">
        <div class="floating-food food-1">🍔</div>
        <div class="floating-food food-2">🍕</div>
        <div class="floating-food food-3">🥗</div>
        <div class="floating-food food-4">🍜</div>
        <div class="floating-food food-5">🌮</div>
      </div>
    </div>

    <!-- Right Side - Registration Form -->
    <div class="form-section">
      <div class="register-container">
        <div class="form-header">
          <h2 class="register-title">Create Account ✨</h2>
          <p class="register-subtitle">Join thousands of food lovers and start your culinary journey</p>
        </div>

        <form @submit.prevent="onSubmit" class="register-form">
          <div class="input-group">
            <div class="input-wrapper">
              <span class="input-icon">👤</span>
              <input
                v-model="form.name"
                type="text"
                placeholder="Full Name"
                required
                class="input-field"
              />
            </div>
          </div>

          <div class="input-group">
            <div class="input-wrapper">
              <span class="input-icon">📧</span>
              <input
                v-model="form.email"
                type="email"
                placeholder="Email Address"
                required
                class="input-field"
              />
            </div>
          </div>

          <div class="input-group">
            <div class="input-wrapper">
              <span class="input-icon">🔒</span>
              <input
                v-model="form.password"
                type="password"
                placeholder="Password (min 6 characters)"
                required
                class="input-field"
              />
            </div>
          </div>

          <div class="input-group">
            <div class="input-wrapper">
              <span class="input-icon">🎭</span>
              <select v-model="form.role" required class="input-field select-field">
                <option disabled value="">Select Your Role</option>
                <option value="customer">🛒 Customer - Order Food</option>
                <option disabled value="restaurant">🏪 Restaurant - Coming Soon</option>
                <option value="rider">🏍️ Delivery Rider - Earn Money</option>
                <option disabled value="admin">👑 Admin - Restricted</option>
              </select>
            </div>
          </div>

          <button type="submit" class="register-btn">
            <span class="btn-text">Create My Account</span>
            <span class="btn-icon">🚀</span>
          </button>
        </form>

        <div v-if="error" class="error-container">
          <p class="error-msg">
            <span class="error-icon">⚠️</span>
            {{ error }}
          </p>
        </div>

        <!-- Login link -->
        <div class="login-section">
          <p class="login-link">
            Already part of our foodie family?
            <router-link to="/auth/login" class="login-anchor">Sign In</router-link>
          </p>
        </div>

        <!-- Trust indicators -->
        <div class="trust-indicators">
          <div class="trust-item">
            <span class="trust-icon">🔐</span>
            <span>Secure & Safe</span>
          </div>
          <div class="trust-item">
            <span class="trust-icon">⭐</span>
            <span>5-Star Rated</span>
          </div>
          <div class="trust-item">
            <span class="trust-icon">👥</span>
            <span>10K+ Users</span>
          </div>
        </div>
      </div>
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
/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

/* Main Layout */
.register-page {
  min-height: 100vh;
  display: flex;
  font-family: "Poppins", sans-serif;
  overflow: hidden;
}

/* Left Side - Image Section */
.image-section {
  flex: 1.2;
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6a11cb 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.image-overlay {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  padding: 2rem;
}

.brand-content {
  animation: slideInLeft 1s ease-out;
}

.brand-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  letter-spacing: -1px;
}

.brand-icon {
  display: inline-block;
  animation: bounce 2s infinite;
}

.brand-tagline {
  font-size: 1.3rem;
  font-weight: 300;
  margin-bottom: 2.5rem;
  opacity: 0.95;
  letter-spacing: 0.5px;
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.feature-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(10px);
}

.feature-icon {
  font-size: 1.5rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

/* Floating Food Animation */
.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.floating-food {
  position: absolute;
  font-size: 2.5rem;
  animation: float 6s ease-in-out infinite;
  opacity: 0.6;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.food-1 {
  top: 15%;
  left: 15%;
  animation-delay: 0s;
}

.food-2 {
  top: 25%;
  right: 20%;
  animation-delay: 1s;
}

.food-3 {
  bottom: 30%;
  left: 10%;
  animation-delay: 2s;
}

.food-4 {
  bottom: 20%;
  right: 15%;
  animation-delay: 3s;
}

.food-5 {
  top: 50%;
  left: 5%;
  animation-delay: 4s;
}

/* Right Side - Form Section */
.form-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 2rem;
}

.register-container {
  background: rgba(255, 255, 255, 0.95);
  padding: 3rem 2.5rem;
  border-radius: 2rem;
  width: 100%;
  max-width: 450px;
  box-shadow:
    0 20px 40px rgba(106, 17, 203, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: slideInRight 0.8s ease-out;
  position: relative;
  overflow: hidden;
}

.register-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #6a11cb, #2575fc, #667eea);
  border-radius: 2rem 2rem 0 0;
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.register-title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  letter-spacing: -0.5px;
}

.register-subtitle {
  font-size: 1rem;
  color: #64748b;
  margin-bottom: 0;
  font-weight: 400;
  line-height: 1.5;
}

/* Enhanced Form Styling */
.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-group {
  position: relative;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1rem;
  z-index: 2;
  font-size: 1.2rem;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.input-field {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #e2e8f0;
  border-radius: 1.2rem;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  background: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  letter-spacing: 0.3px;
}

.input-field:focus {
  border-color: #6a11cb;
  box-shadow:
    0 0 0 3px rgba(106, 17, 203, 0.1),
    0 8px 25px rgba(106, 17, 203, 0.15);
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 1);
}

.input-field:focus + .input-icon,
.input-wrapper:hover .input-icon {
  opacity: 1;
  transform: scale(1.1);
}

.select-field {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 1rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 3rem;
}

.select-field option:disabled {
  color: #9ca3af;
  font-style: italic;
}

/* Enhanced Button */
.register-btn {
  width: 100%;
  padding: 1.2rem 2rem;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 50%, #667eea 100%);
  border: none;
  border-radius: 1.2rem;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  box-shadow: 0 8px 25px rgba(106, 17, 203, 0.3);
}

.register-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.register-btn:hover::before {
  left: 100%;
}

.register-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(106, 17, 203, 0.4);
}

.register-btn:active {
  transform: translateY(-1px);
}

.btn-text {
  font-weight: 700;
}

.btn-icon {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.register-btn:hover .btn-icon {
  transform: scale(1.2) rotate(15deg);
}

/* Error Styling */
.error-container {
  margin-top: 1.5rem;
  animation: shake 0.5s ease-in-out;
}

.error-msg {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #fee2e2, #fecaca);
  border: 1px solid #fca5a5;
  border-radius: 1rem;
  color: #dc2626;
  font-size: 0.95rem;
  font-weight: 500;
  margin: 0;
}

.error-icon {
  font-size: 1.1rem;
}

/* Login Section */
.login-section {
  margin-top: 2rem;
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.login-link {
  font-size: 0.95rem;
  color: #64748b;
  margin: 0;
  font-weight: 400;
}

.login-anchor {
  color: #6a11cb;
  font-weight: 600;
  text-decoration: none;
  margin-left: 0.5rem;
  transition: all 0.3s ease;
  position: relative;
}

.login-anchor:hover {
  color: #2575fc;
  text-decoration: none;
}

.login-anchor::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #6a11cb, #2575fc);
  transition: width 0.3s ease;
}

.login-anchor:hover::after {
  width: 100%;
}

/* Trust Indicators */
.trust-indicators {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.trust-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
  color: #64748b;
  font-weight: 500;
}

.trust-icon {
  font-size: 1.2rem;
  opacity: 0.8;
}

/* Animations */
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-20px) rotate(5deg);
  }
  50% {
    transform: translateY(-15px) rotate(-5deg);
  }
  75% {
    transform: translateY(-25px) rotate(3deg);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .register-page {
    flex-direction: column;
  }

  .image-section {
    flex: none;
    min-height: 40vh;
  }

  .brand-title {
    font-size: 2.5rem;
  }

  .feature-list {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }

  .feature-item {
    flex: 1;
    min-width: 140px;
    padding: 0.8rem 1rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .form-section {
    padding: 1rem;
  }

  .register-container {
    padding: 2rem 1.5rem;
    margin: 0;
    border-radius: 1.5rem;
  }

  .register-title {
    font-size: 1.8rem;
  }

  .input-field {
    padding: 0.9rem 0.9rem 0.9rem 2.8rem;
    font-size: 0.95rem;
  }

  .input-icon {
    font-size: 1rem;
    left: 0.8rem;
  }

  .brand-title {
    font-size: 2rem;
  }

  .brand-tagline {
    font-size: 1.1rem;
  }

  .floating-food {
    font-size: 2rem;
  }

  .trust-indicators {
    flex-direction: column;
    gap: 1rem;
  }

  .trust-item {
    flex-direction: row;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .image-section {
    min-height: 30vh;
  }

  .register-container {
    padding: 1.5rem 1rem;
  }

  .input-field {
    padding: 0.8rem 0.8rem 0.8rem 2.5rem;
  }

  .register-btn {
    padding: 1rem 1.5rem;
    font-size: 1rem;
  }

  .feature-item {
    font-size: 0.85rem;
    padding: 0.6rem 0.8rem;
  }
}

/* Enhanced Glassmorphism Effect */
.register-container {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

/* Additional Hover Effects */
.input-wrapper:hover .input-field {
  border-color: #a855f7;
  background: rgba(255, 255, 255, 0.9);
}

.input-wrapper:hover .input-icon {
  opacity: 1;
  color: #6a11cb;
}

/* Loading state for button */
.register-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

/* Beautiful focus ring */
.input-field:focus-visible {
  outline: 2px solid #6a11cb;
  outline-offset: 2px;
}

/* Enhanced gradient backgrounds */
.register-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 20% 50%, rgba(106, 17, 203, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(37, 117, 252, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, rgba(102, 126, 234, 0.1) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.form-section {
  position: relative;
  z-index: 1;
}
</style>
