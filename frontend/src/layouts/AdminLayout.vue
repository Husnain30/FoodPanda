<template>
  <q-layout view="hHh Lpr fFf" class="admin-layout">

    <!-- ===== Top Header ===== -->
    <q-header elevated class="modern-header">
      <q-toolbar class="header-toolbar">
        <q-btn
          flat
          dense
          round
          icon="menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
          class="menu-toggle text-black"
        />
        
        <div class="header-brand ">
          <div class="brand-icon">🚀</div>
          <div class="brand-text">
            <div class="brand-title text-black">Admin Panel</div>
            <div class="brand-subtitle text-black">Management Dashboard</div>
          </div>
        </div>

        <q-space />

        <!-- Header Actions -->
        <div class="header-actions">
          <q-btn
            flat
            dense
            round
            icon="notifications"
            class="header-btn text-black"
          >
            <q-badge color="red" floating>3</q-badge>
          </q-btn>
          
          <q-btn
            flat
            dense
            round
            icon="settings"
            class="header-btn text-black"
          />
          
          <q-separator vertical class="q-mx-sm" />
          
          <q-btn
            flat
            dense
            icon="logout"
            label="Logout"
            class="logout-btn"
            @click="logout"
          />
        </div>
      </q-toolbar>
    </q-header>

    <!-- ===== Sidebar (Navigation Drawer) ===== -->
    <q-drawer
      v-model="leftDrawerOpen"
      behavior="mobile"
      bordered
      class="modern-sidebar"
    >
      <div class="sidebar-header">
        <div class="admin-profile">
          <div class="profile-avatar">
            <q-avatar size="50px" class="profile-img">
              <img src="https://cdn.quasar.dev/img/avatar.png" />
            </q-avatar>
          </div>
          <div class="profile-info">
            <div class="profile-name">Admin User</div>
            <div class="profile-role">Super Administrator</div>
          </div>
        </div>
      </div>

      <q-separator class="q-my-md" />

      <q-list padding class="navigation-list">
        <q-item-label header class="nav-header">
          📊 Main Navigation
        </q-item-label>

        <q-item 
          clickable 
          v-ripple 
          to="/admin/dashboard" 
          class="nav-item"
          active-class="nav-item-active"
        >
          <q-item-section avatar>
            <div class="nav-icon-wrapper">
              <q-icon name="dashboard" class="nav-icon" />
            </div>
          </q-item-section>
          <q-item-section>
            <q-item-label class="nav-label">Dashboard</q-item-label>
            <q-item-label caption class="nav-caption">Overview & Analytics</q-item-label>
          </q-item-section>
        </q-item>

        <q-item 
          clickable 
          v-ripple 
          to="/admin/users" 
          class="nav-item"
          active-class="nav-item-active"
        >
          <q-item-section avatar>
            <div class="nav-icon-wrapper">
              <q-icon name="people" class="nav-icon" />
            </div>
          </q-item-section>
          <q-item-section>
            <q-item-label class="nav-label">Users</q-item-label>
            <q-item-label caption class="nav-caption">Manage Customers</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-badge color="blue" rounded>247</q-badge>
          </q-item-section>
        </q-item>

        <q-item 
          clickable 
          v-ripple 
          to="/admin/restaurants" 
          class="nav-item"
          active-class="nav-item-active"
        >
          <q-item-section avatar>
            <div class="nav-icon-wrapper">
              <q-icon name="store" class="nav-icon" />
            </div>
          </q-item-section>
          <q-item-section>
            <q-item-label class="nav-label">Restaurants</q-item-label>
            <q-item-label caption class="nav-caption">Partner Management</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-badge color="green" rounded>45</q-badge>
          </q-item-section>
        </q-item>

        <q-item 
          clickable 
          v-ripple 
          to="/admin/riders" 
          class="nav-item"
          active-class="nav-item-active"
        >
          <q-item-section avatar>
            <div class="nav-icon-wrapper">
              <q-icon name="two_wheeler" class="nav-icon" />
            </div>
          </q-item-section>
          <q-item-section>
            <q-item-label class="nav-label">Delivery Riders</q-item-label>
            <q-item-label caption class="nav-caption">Fleet Management</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-badge color="orange" rounded>128</q-badge>
          </q-item-section>
        </q-item>

        <q-item 
          clickable 
          v-ripple 
          to="/admin/orders" 
          class="nav-item"
          active-class="nav-item-active"
        >
          <q-item-section avatar>
            <div class="nav-icon-wrapper">
              <q-icon name="receipt_long" class="nav-icon" />
            </div>
          </q-item-section>
          <q-item-section>
            <q-item-label class="nav-label">Orders</q-item-label>
            <q-item-label caption class="nav-caption">Order Management</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-badge color="purple" rounded>1.2k</q-badge>
          </q-item-section>
        </q-item>

        <q-item 
          clickable 
          v-ripple 
          to="/admin/payments" 
          class="nav-item"
          active-class="nav-item-active"
        >
          <q-item-section avatar>
            <div class="nav-icon-wrapper">
              <q-icon name="payment" class="nav-icon" />
            </div>
          </q-item-section>
          <q-item-section>
            <q-item-label class="nav-label">Payments</q-item-label>
            <q-item-label caption class="nav-caption">Financial Overview</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator class="q-my-md" />

        <q-item-label header class="nav-header">
          ⚙️ System Tools
        </q-item-label>

        <q-item clickable v-ripple class="nav-item">
          <q-item-section avatar>
            <div class="nav-icon-wrapper">
              <q-icon name="analytics" class="nav-icon" />
            </div>
          </q-item-section>
          <q-item-section>
            <q-item-label class="nav-label">Analytics</q-item-label>
            <q-item-label caption class="nav-caption">Reports & Insights</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple class="nav-item">
          <q-item-section avatar>
            <div class="nav-icon-wrapper">
              <q-icon name="settings" class="nav-icon" />
            </div>
          </q-item-section>
          <q-item-section>
            <q-item-label class="nav-label">Settings</q-item-label>
            <q-item-label caption class="nav-caption">System Configuration</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <div class="sidebar-footer">
        <q-item class="footer-item">
          <q-item-section>
            <div class="footer-text">
              <div class="app-version">Version 2.1.0</div>
              <div class="copyright">© 2024 Food Delivery</div>
            </div>
          </q-item-section>
        </q-item>
      </div>
    </q-drawer>

    <!-- ===== Page Content ===== -->
    <q-page-container class="main-content">
      <div class="page-wrapper">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"

export default {
  name: "AdminLayout",
  setup() {
    const leftDrawerOpen = ref(false) // default closed
    const store = useStore()
    const router = useRouter()

    const logout = () => {
      store.dispatch("auth/logout")
      router.push("/auth/login")
    }

    return {
      leftDrawerOpen,
      logout,
    }
  },
}
</script>



<style scoped>
/* ===== Variables ===== */
:root {
  --primary-color: #6366f1;
  --primary-dark: #4f46e5;
  --secondary-color: #f8fafc;
  --accent-color: #06b6d4;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --error-color: #ef4444;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --text-light: #94a3b8;
  --background: #f8fafc;
  --card-bg: #ffffff;
  --border-color: #e2e8f0;
  --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --border-radius: 12px;
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ===== Layout Base ===== */
.admin-layout {
  min-height: 100vh;
  background: var(--background);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* ===== Header Styles ===== */
.modern-header {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: var(--shadow-lg);
}

.header-toolbar {
  padding: 0 24px;
  min-height: 70px;
}

.menu-toggle {
  color: white;
  margin-right: 16px;
  border-radius: 8px;
  transition: var(--transition);
}

.menu-toggle:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(1.05);
}

.header-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-icon {
  font-size: 2rem;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  line-height: 1.2;
}

.brand-subtitle {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-btn {
  color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  transition: var(--transition);
}

.header-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transform: translateY(-1px);
}

.logout-btn {
  background: rgba(239, 68, 68, 0.9);
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  transition: var(--transition);
}

.logout-btn:hover {
  background: #dc2626;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
}

/* ===== Sidebar Styles ===== */
.modern-sidebar {
  background: var(--card-bg);
  border-right: 1px solid var(--border-color);
  width: 300px;
  box-shadow: var(--shadow-lg);
}

.sidebar-header {
  padding: 24px 20px 16px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

.admin-profile {
  display: flex;
  align-items: center;
  gap: 12px;
}

.profile-avatar {
  position: relative;
}

.profile-img {
  border: 3px solid var(--primary-color);
  box-shadow: var(--shadow);
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 2px;
}

.profile-role {
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 500;
}

/* ===== Navigation Styles ===== */
.navigation-list {
  padding: 0 16px;
}

.nav-header {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 24px 0 12px;
  padding: 0 12px;
}

.nav-item {
  border-radius: var(--border-radius);
  margin-bottom: 4px;
  padding: 12px;
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.nav-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  background: var(--primary-color);
  transition: var(--transition);
}

.nav-item:hover {
  background: rgba(99, 102, 241, 0.05);
  transform: translateX(2px);
}

.nav-item:hover::before {
  width: 4px;
}

.nav-item-active {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(79, 70, 229, 0.05) 100%);
  border: 1px solid rgba(99, 102, 241, 0.2);
}

.nav-item-active::before {
  width: 4px;
}

.nav-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(99, 102, 241, 0.1);
  transition: var(--transition);
}

.nav-item:hover .nav-icon-wrapper {
  background: var(--primary-color);
  transform: scale(1.1);
}

.nav-item:hover .nav-icon {
  color: white;
}

.nav-item-active .nav-icon-wrapper {
  background: var(--primary-color);
}

.nav-item-active .nav-icon {
  color: white;
}

.nav-icon {
  font-size: 1.3rem;
  color: var(--primary-color);
  transition: var(--transition);
}

.nav-label {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.95rem;
}

.nav-caption {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-top: 2px;
}

/* ===== Sidebar Footer ===== */
.sidebar-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: var(--secondary-color);
  border-top: 1px solid var(--border-color);
}

.footer-item {
  padding: 8px 0;
}

.footer-text {
  text-align: center;
}

.app-version {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.copyright {
  font-size: 0.75rem;
  color: var(--text-light);
}

/* ===== Main Content ===== */
.main-content {
  background: var(--background);
  min-height: calc(100vh - 70px);
}

.page-wrapper {
  padding: 24px;
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ===== Responsive Design ===== */
@media (max-width: 1024px) {
  .modern-sidebar {
    width: 280px;
  }
  
  .brand-subtitle {
    display: none;
  }
}

@media (max-width: 768px) {
  .header-toolbar {
    padding: 0 16px;
    min-height: 60px;
  }
  
  .brand-title {
    font-size: 1.3rem;
  }
  
  .header-actions {
    gap: 4px;
  }
  
  .page-wrapper {
    padding: 16px;
  }
  
  .modern-sidebar {
    width: 260px;
  }
}

@media (max-width: 480px) {
  .brand-text {
    display: none;
  }
  
  .header-actions .header-btn {
    padding: 6px;
  }
  
  .logout-btn {
    padding: 6px 12px;
  }
  
  .logout-btn .q-btn__content {
    font-size: 0.85rem;
  }
}

/* ===== Dark Mode Support ===== */
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0f172a;
    --card-bg: #1e293b;
    --text-primary: #f8fafc;
    --text-secondary: #cbd5e1;
    --text-light: #94a3b8;
    --border-color: #334155;
  }
  
  .modern-sidebar {
    background: var(--card-bg);
    border-right-color: var(--border-color);
  }
  
  .sidebar-header {
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  }
}

/* ===== Animations ===== */
.nav-item {
  animation: slideInLeft 0.3s ease-out;
  animation-fill-mode: both;
}

.nav-item:nth-child(1) { animation-delay: 0.1s; }
.nav-item:nth-child(2) { animation-delay: 0.15s; }
.nav-item:nth-child(3) { animation-delay: 0.2s; }
.nav-item:nth-child(4) { animation-delay: 0.25s; }
.nav-item:nth-child(5) { animation-delay: 0.3s; }
.nav-item:nth-child(6) { animation-delay: 0.35s; }

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>