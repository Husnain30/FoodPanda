// src/router/routes.js
import MainLayout from '../layouts/MainLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'

export default [
  // Public / Customer Routes
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: () => import('../pages/HomePage.vue') },
      { path: 'about', component: () => import('../pages/AboutPage.vue') },
      { path: 'contact', component: () => import('../pages/ContactPage.vue') },

      // Customer pages (under modules/customer/pages)
      { path: 'restaurants', component: () => import('../modules/customer/pages/BrowseRestaurants.vue') },
      { path: 'restaurants/:id', component: () => import('../modules/customer/pages/MenuPage.vue') },
      { path: 'cart', component: () => import('../modules/customer/pages/CartPage.vue') },
      { path: 'checkout', component: () => import('../modules/customer/pages/CheckoutPage.vue') },
      { path: 'orders', component: () => import('../modules/customer/pages/OrderHistory.vue') },
      { path: 'track/:id', component: () => import('../modules/customer/pages/OrderTracking.vue') },
      { path: 'review/:id', component: () => import('../modules/customer/pages/ReviewPage.vue') },
    ],
  },

  // Auth Routes (Login/Register use AuthLayout + forms inside)
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      { path: 'login', component: () => import('../components/forms/LoginForm.vue') },
      { path: 'register', component: () => import('../components/forms/RegisterForm.vue') },
    ],
  },

  // Admin Routes
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      { 
        path: '', 
        component: () => import('../modules/admin/pages/AdminDashboard.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      { 
        path: 'users', 
        component: () => import('../modules/admin/pages/UsersPage.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      { 
        path: 'restaurants', 
        component: () => import('../modules/admin/pages/RestaurantsPage.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      { 
        path: 'riders', 
        component: () => import('../modules/admin/pages/RidersPage.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      { 
        path: 'orders', 
        component: () => import('../modules/admin/pages/OrdersMonitor.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
      },
      { 
        path: 'payments', 
        component: () => import('../modules/admin/pages/PaymentsPage.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
      },
    ],
  },

  // Restaurant Owner Routes
  {
    path: '/restaurant',
    component: MainLayout, // swap later with RestaurantLayout if you create one
    children: [
      { 
        path: '', 
        component: () => import('../modules/restaurant/pages/RestaurantDashboard.vue'),
        meta: { requiresAuth: true, requiresRestaurant: true }
      },
      { 
        path: 'menu', 
        component: () => import('../modules/restaurant/pages/MenuManager.vue'),
        meta: { requiresAuth: true, requiresRestaurant: true }
      },
      { 
        path: 'orders', 
        component: () => import('../modules/restaurant/pages/OrdersPage.vue'),
        meta: { requiresAuth: true, requiresRestaurant: true }
      },
      { 
        path: 'earnings', 
        component: () => import('../modules/restaurant/pages/EarningsPage.vue'),
        meta: { requiresAuth: true, requiresRestaurant: true }
      },
      { 
        path: 'promotions', 
        component: () => import('../modules/restaurant/pages/PromotionsPage.vue'),
        meta: { requiresAuth: true, requiresRestaurant: true }
      },
    ],
  },

  // Rider Routes
  {
    path: '/rider',
    component: MainLayout, // swap later with RiderLayout if needed
    children: [
      { 
        path: '', 
        component: () => import('../modules/rider/pages/RiderDashboard.vue'),
        meta: { requiresAuth: true, requiresRider: true }
      },
      { 
        path: 'deliveries', 
        component: () => import('../modules/rider/pages/OrderAssignment.vue'),
        meta: { requiresAuth: true, requiresRider: true }
      },
      { 
        path: 'navigation', 
        component: () => import('../modules/rider/pages/NavigationPage.vue'),
        meta: { requiresAuth: true, requiresRider: true }
      },
      { 
        path: 'earnings', 
        component: () => import('../modules/rider/pages/EarningsPage.vue'),
        meta: { requiresAuth: true, requiresRider: true }
      },
    ],
  },

  // Catch-all (404)
  {
    path: '/:catchAll(.*)*',
    component: () => import('../pages/NotFound.vue'),
  },
]