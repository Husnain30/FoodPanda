<template>
  <footer class="customer-footer">
    <div class="footer-top">
      <!-- About Section -->
      <div class="footer-section about">
        <h3>FoodieHub</h3>
        <p>
          Discover the best food around you. Order from your favorite restaurants
          and enjoy fast delivery at your doorstep.
        </p>
      </div>

      <!-- Quick Links -->
      <div class="footer-section links">
        <h3>Quick Links</h3>
        <ul>
          <li><router-link to="/customer/home">🏠 Home</router-link></li>
          <li><router-link to="/customer/browse">🍽 Browse Restaurants</router-link></li>
          <li><router-link to="/customer/orders">📦 My Orders</router-link></li>
          <li><router-link to="/customer/profile">👤 My Profile</router-link></li>
        </ul>
      </div>

      <!-- Contact Info -->
      <div class="footer-section contact">
        <h3>Contact Us</h3>
        <p>📍 456 Food Street, Karachi</p>
        <p>📞 +92 322 9876543</p>
        <p>✉️ support@foodiehub.com</p>
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
      <span>© 2025 FoodieHub. All rights reserved.</span>
      <span>Made with ❤️ for food lovers</span>
    </div>
  </footer>
</template>

<script>
export default {
  name: "CustomerFooter",
};
</script>

<style scoped>
.customer-footer {
  background: #1e272e;
  color: #dcdde1;
  margin-top: 40px;
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
  border-bottom: 2px solid #ff4b2b;
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
  color: #ff4b2b;
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
  background: #ff4b2b;
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

/* Responsive */
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
