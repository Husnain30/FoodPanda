<template>
  <div class="restaurant-layout">
    <!-- Animated Header -->
  <header class="restaurant-header">
  <h2>🍽️ TasteCraft Manager</h2>

  <button class="logout-btn" @click="logoutToHome">
    🚪 Logout
  </button>
</header>

    <!-- Main Content -->
    <main class="restaurant-content">
      <router-view />
    </main>

    <!-- Fancy Footer -->
    <footer class="restaurant-footer">
      <div class="footer-top">
        <!-- About Section -->
        <div class="footer-section about">
          <h3>TasteCraft</h3>
          <p>
            Delivering exquisite dining experiences with the finest dishes crafted daily by our master chefs.
          </p>
        </div>

        <!-- Quick Links -->
        <div class="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><router-link to="/restaurant/dashboard">Dashboard</router-link></li>
            <li><router-link to="/restaurant/menu">Menu Manager</router-link></li>
            <li><router-link to="/restaurant/orders">Orders</router-link></li>
            <li><router-link to="/restaurant/earnings">Earnings</router-link></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="footer-section contact">
          <h3>Contact Us</h3>
          <p>📍 123 Gourmet Street, Lahore</p>
          <p>📞 +92 300 1234567</p>
          <p>✉️ info@tastecraft.com</p>
        </div>

        <!-- Social Media -->
        <div class="footer-section social">
          <h3>Follow Us</h3>
          <div class="social-icons">
            <a href="#" target="_blank">🐦 Twitter</a>
            <a href="#" target="_blank">📘 Facebook</a>
            <a href="#" target="_blank">📸 Instagram</a>
            <a href="#" target="_blank">🎥 YouTube</a>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <span>© 2025 TasteCraft. All rights reserved.</span>
        <span>Designed with ❤️ by TasteCraft Team</span>
      </div>
    </footer>
  </div>
</template>

<script>
import { useStore } from "vuex"
import { useRouter } from "vue-router"

export default {
  name: "RestaurantLayout",
  setup() {
    const store = useStore()
    const router = useRouter()

    const logoutToHome = () => {
      store.dispatch("auth/logout")
      router.push("/") // 👈 Home page redirect
    }

    return {
      logoutToHome
    }
  }
}
</script>

<style scoped>
/* Layout */


.restaurant-header {
  background: linear-gradient(135deg, #6c5ce7, #0984e3);
  color: white;

  height: 70px;               /* 🔹 Fixed navbar height */
  padding: 0 1.5rem;          /* 🔹 sirf left/right padding */
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 1.2rem;          /* 🔹 smaller text */
  font-weight: 600;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
}

.restaurant-header h2 {
  margin: 0;                  /* 🔹 extra space hatao */
  font-size: 1.2rem;          /* 🔹 same as header */
  font-weight: 600;
}

.logout-btn {
  background: #e63946;
  color: #fff;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background: #d62828;
}

.restaurant-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f6fa;
  font-family: "Poppins", sans-serif;
}

/* ================= HEADER ================= */


/* Floating gradient animation */
.restaurant-header::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 10%, transparent 40%);
  animation: header-glow 6s infinite linear;
}

@keyframes header-glow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* HEADER TEXT ANIMATION */
.restaurant-header h2 {
  position: relative;
  animation: slide-in 1.2s ease-out forwards;
  opacity: 0;
}

@keyframes slide-in {
  0% {
    transform: translateY(-30px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}

/* ================= CONTENT ================= */
.restaurant-content {
  flex: 1;
  padding: 1.5rem;
}

/* ================= FOOTER ================= */
.restaurant-footer {
  background: linear-gradient(135deg, #2c2c54, #341f97);
  color: #dcdde1;
  padding: 3rem 2rem 1rem;
  font-size: 0.95rem;
  position: relative;
  overflow: hidden;
}

/* Floating particles in footer */
.restaurant-footer::before,
.restaurant-footer::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  animation: float-particles 12s infinite ease-in-out;
}

.restaurant-footer::before {
  width: 120px;
  height: 120px;
  bottom: 20px;
  left: 20px;
}

.restaurant-footer::after {
  width: 200px;
  height: 200px;
  top: 10px;
  right: 30px;
}

@keyframes float-particles {
  0%,
  100% {
    transform: translateY(0px) translateX(0px);
  }
  50% {
    transform: translateY(-20px) translateX(20px);
  }
}

.footer-top {
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.footer-section {
  flex: 1 1 200px;
  min-width: 180px;
  transition: transform 0.3s ease, color 0.3s ease;
}

.footer-section:hover {
  transform: translateY(-5px);
}

.footer-section h3 {
  color: #ffffff;
  margin-bottom: 1rem;
  font-size: 1.3rem;
  font-weight: 700;
  border-bottom: 2px solid #6c5ce7;
  display: inline-block;
  padding-bottom: 0.3rem;
  text-shadow: 0px 0px 6px rgba(108, 92, 231, 0.7);
}

.footer-section p,
.footer-section ul,
.footer-section a {
  color: #dcdde1;
  text-decoration: none;
  line-height: 1.6;
  transition: color 0.3s ease;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 0.6rem;
}

.footer-section ul li a:hover {
  color: #74b9ff;
  text-decoration: underline;
}

/* Social icons */
.social-icons a {
  display: inline-block;
  margin-right: 0.8rem;
  background: linear-gradient(135deg, #0984e3, #6c5ce7);
  padding: 0.5rem 1rem;
  border-radius: 30px;
  color: #fff;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 10px rgba(108, 92, 231, 0.5);
}

.social-icons a:hover {
  background: linear-gradient(135deg, #6c5ce7, #00cec9);
  transform: scale(1.1) translateY(-3px);
}

/* Footer bottom */
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  padding-top: 1rem;
  font-size: 0.85rem;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.footer-bottom span {
  color: #b2bec3;
  transition: color 0.3s ease;
}

.footer-bottom span:hover {
  color: #ffffff;
}

/* Responsive */
@media (max-width: 768px) {
  .footer-top {
    flex-direction: column;
    gap: 1.8rem;
  }
  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
