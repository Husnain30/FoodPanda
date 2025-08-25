<template>
  <div class="restaurant-layout">
    <!-- Simple Header -->
    <header class="restaurant-header">
      <h2>🍽️ TasteCraft Manager</h2>
    </header>

    <!-- Main Content -->
    <main class="restaurant-content">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="restaurant-footer">
      <div class="footer-top">
        <!-- About Section -->
        <div class="footer-section about">
          <h3>TasteCraft</h3>
          <p>Delivering exquisite dining experiences with the finest dishes crafted daily by our master chefs.</p>
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
export default {
  name: "RestaurantLayout",
};
</script>

<style scoped>
.restaurant-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f6fa;
  font-family: 'Arial', sans-serif;
}

.restaurant-header {
  background: #2d3436;
  color: white;
  padding: 1rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
}

.restaurant-content {
  flex: 1;
  padding: 1.5rem;
}

/* Footer Styling */
.restaurant-footer {
  background: #1e272e;
  color: #dcdde1;
  padding: 3rem 2rem 1rem;
  font-size: 0.9rem;
}

.footer-top {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.footer-section {
  flex: 1 1 200px;
  min-width: 180px;
}

.footer-section h3 {
  color: #ffffff;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  border-bottom: 2px solid #6c5ce7;
  display: inline-block;
  padding-bottom: 0.25rem;
}

.footer-section p, 
.footer-section ul, 
.footer-section a {
  color: #dcdde1;
  text-decoration: none;
  line-height: 1.6;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section ul li a:hover {
  color: #6c5ce7;
  text-decoration: underline;
}

.social-icons a {
  display: inline-block;
  margin-right: 1rem;
  background: #2d3436;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.social-icons a:hover {
  background: #6c5ce7;
  color: #fff;
  transform: translateY(-2px);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #353b48;
  padding-top: 1rem;
  font-size: 0.8rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.footer-bottom span {
  color: #7f8c8d;
}

/* Responsive Footer */
@media (max-width: 768px) {
  .footer-top {
    flex-direction: column;
    gap: 1.5rem;
  }
  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
