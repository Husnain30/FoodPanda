// src/router/routes.js

import MainLayout from '../layouts/MainLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import RiderLayout from '../layouts/RiderLayout.vue'


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
    component: () => import('../layouts/AdminLayout.vue'), // parent layout
    children: [
      { 
        path: 'dashboard', 
        name: 'AdminDashboard',
        component: () => import('../modules/admin/pages/AdminDashboard.vue')
      },
      { 
        path: 'users', 
        name: 'AdminUsers',
        component: () => import('../modules/admin/pages/UsersPage.vue')
      },
      { 
        path: 'restaurants', 
        name: 'AdminRestaurants',
        component: () => import('../modules/admin/pages/RestaurantsPage.vue')
      },
      { 
        path: 'riders', 
        name: 'AdminRiders',
        component: () => import('../modules/admin/pages/RidersPage.vue')
      },
      { 
        path: 'orders', 
        name: 'AdminOrders',
        component: () => import('../modules/admin/pages/OrdersMonitor.vue')
      },
      { 
        path: 'payments', 
        name: 'AdminPayments',
        component: () => import('../modules/admin/pages/PaymentsPage.vue')
      },
    ],
  },

  // Restaurant Owner Routes
{
    path: '/restaurant',
    component: () => import('../layouts/RestaurantLayout.vue'),
    children: [
      {
        path: 'dashboard',
        component: () => import('../modules/restaurant/pages/RestaurantDashboard.vue')
      },
      {
        path: 'menu',
        component: () => import('../modules/restaurant/pages/MenuManager.vue')
      },
      {
        path: 'orders',
        component: () => import('../modules/restaurant/pages/OrdersPage.vue')
      },
      {
        path: 'earnings',
        component: () => import('../modules/restaurant/pages/EarningsPage.vue')
      },
      {
        path: 'promotions',
        component: () => import('../modules/restaurant/pages/PromotionsPage.vue')
      }
    ]
  },

  // Rider Routes
    {
    path: '/rider',
    component: RiderLayout,
    children: [
      { path: '', component: () => import('../modules/rider/pages/RiderDashboard.vue') },
      { path: 'deliveries', component: () => import('../modules/rider/pages/OrderAssignment.vue') },
      { path: 'navigation', component: () => import('../modules/rider/pages/NavigationPage.vue') },
      { path: 'earnings', component: () => import('../modules/rider/pages/EarningsPage.vue') },
    ],
  },

  // Catch-all (404)
  {
    path: '/:catchAll(.*)*',
    component: () => import('../pages/NotFound.vue'),
  },
]