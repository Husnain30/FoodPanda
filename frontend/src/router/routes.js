// src/router/routes.js

// import MainLayout from '../layouts/MainLayout.vue'
// import AuthLayout from '../layouts/AuthLayout.vue'
// import RiderLayout from '../layouts/RiderLayout.vue'
// import CustomerLayout from '../layouts/CustomerLayout.vue'


// export default [
//   // Public / Customer Routes
//  {
//     path: '/',
//     component: MainLayout,
//     children: [
//       { path: '', component: () => import('../pages/HomePage.vue') },
//       { path: 'about', component: () => import('../pages/AboutPage.vue') },
//       { path: 'contact', component: () => import('../pages/ContactPage.vue') },
//     ]
//   },

// {
//   path: '/customer',
//   component: CustomerLayout,
//   children: [
//     { path: '', redirect: '/restaurants' }, // 👈 after login, default redirect to /restaurants

//     // Restaurants listing
//     { path: '/restaurants', component: () => import('../modules/customer/pages/BrowseRestaurants.vue') },

//     // Single restaurant menu
//     { path: '/restaurants/:id/menu', component: () => import('../modules/customer/pages/MenuPage.vue') },

//     // Cart and Checkout
//     { path: '/cart', component: () => import('../modules/customer/pages/CartPage.vue') },
//     { path: '/checkout', component: () => import('../modules/customer/pages/CheckoutPage.vue') },

//     // Orders
//     { path: '/orders', component: () => import('../modules/customer/pages/OrderHistory.vue') },
//     { path: '/orders/:id', component: () => import('../modules/customer/pages/OrderTracking.vue') },

//     // Reviews
//     { path: '/reviews', component: () => import('../modules/customer/pages/ReviewPage.vue') },
//   ]
// },



//   // Auth Routes (Login/Register use AuthLayout + forms inside)
//   {
//     path: '/auth',
//     component: AuthLayout,
//     children: [
//       { path: 'login', component: () => import('../components/forms/LoginForm.vue') },
//       { path: 'register', component: () => import('../components/forms/RegisterForm.vue') },
//     ],
//   },



// // Admin Routes
// {
//     path: '/admin',
//     component: () => import('../layouts/AdminLayout.vue'), // parent layout
//     children: [
//       {
//         path: 'dashboard',
//         name: 'AdminDashboard',
//         component: () => import('../modules/admin/pages/AdminDashboard.vue')
//       },
//       {
//         path: 'users',
//         name: 'AdminUsers',
//         component: () => import('../modules/admin/pages/UsersPage.vue')
//       },
//       {
//         path: 'restaurants',
//         name: 'AdminRestaurants',
//         component: () => import('../modules/admin/pages/RestaurantsPage.vue')
//       },
//       {
//         path: 'riders',
//         name: 'AdminRiders',
//         component: () => import('../modules/admin/pages/RidersPage.vue')
//       },
//       {
//         path: 'orders',
//         name: 'AdminOrders',
//         component: () => import('../modules/admin/pages/OrdersMonitor.vue')
//       },
//       {
//         path: 'payments',
//         name: 'AdminPayments',
//         component: () => import('../modules/admin/pages/PaymentsPage.vue')
//       },
//     ],
//   },

  // Restaurant Owner Routes
// {
//     path: '/restaurant',
//     component: () => import('../layouts/RestaurantLayout.vue'),
//     children: [
//       {
//         path: 'dashboard',
//         component: () => import('../modules/restaurant/pages/RestaurantDashboard.vue')
//       },
//       {
//         path: 'menu',
//         component: () => import('../modules/restaurant/pages/MenuManager.vue')
//       },
//       {
//         path: 'orders',
//         component: () => import('../modules/restaurant/pages/OrdersPage.vue')
//       },
//       {
//         path: 'earnings',
//         component: () => import('../modules/restaurant/pages/EarningsPage.vue')
//       },
//       {
//         path: 'promotions',
//         component: () => import('../modules/restaurant/pages/PromotionsPage.vue')
//       }
//     ]
//   },

// {
//   path: '/restaurant',
//   component: () => import('../layouts/RestaurantLayout.vue'),
//   children: [
//     {
//       path: 'dashboard',
//       name: 'RestaurantDashboard',
//       component: () => import('../modules/restaurant/pages/RestaurantDashboard.vue')
//     },
//    {
//   path: 'menu',  // Remove the leading slash and /restaurant part
//   name: 'MenuManager',
//   component: () => import('../modules/restaurant/pages/MenuManager.vue')
// },
//     {
//       path: 'orders',
//       name: 'OrdersPage',
//       component: () => import('../modules/restaurant/pages/OrdersPage.vue')
//     },
//     {
//       path: 'earnings',
//       name: 'EarningsPage',
//       component: () => import('../modules/restaurant/pages/EarningsPage.vue')
//     },
//     {
//       path: 'promotions',
//       name: 'PromotionsPage',
//       component: () => import('../modules/restaurant/pages/PromotionsPage.vue')
//     },
//     {
//       path: '',
//       redirect: { name: 'RestaurantDashboard' }
//     }
//   ]
// }
// ,

//   // Rider Routes
//     {
//     path: '/riders',
//     component: RiderLayout,
//     children: [
//       { path: '', component: () => import('../modules/rider/pages/RiderDashboard.vue') },
//       { path: 'orders', component: () => import('../modules/rider/pages/OrderAssignment.vue') },
//       { path: 'navigation', component: () => import('../modules/rider/pages/NavigationPage.vue') },
//       { path: 'earnings', component: () => import('../modules/rider/pages/EarningsPage.vue') },
//     ],
//   },

//   // Catch-all (404)
//   {
//     path: '/:catchAll(.*)*',
//     component: () => import('../pages/NotFound.vue'),
//   },
// ]


// src/router/routes.js

import MainLayout from '../layouts/MainLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import RiderLayout from '../layouts/RiderLayout.vue'
import CustomerLayout from '../layouts/CustomerLayout.vue'

export default [
  // Public / Customer Routes
  {
    path: '/',
    component: MainLayout,
    meta: {
      requiresAuth: false,
      allowedRoles: ['guest', 'customer', 'admin', 'restaurant', 'rider']
    },
    children: [
      {
        path: '',
        component: () => import('../pages/HomePage.vue'),
        meta: {
          title: 'Home - Food Delivery',
          requiresAuth: false
        }
      },
      {
        path: 'about',
        component: () => import('../pages/AboutPage.vue'),
        meta: {
          title: 'About Us - Food Delivery',
          requiresAuth: false
        }
      },
      {
        path: 'contact',
        component: () => import('../pages/ContactPage.vue'),
        meta: {
          title: 'Contact Us - Food Delivery',
          requiresAuth: false
        }
      },
    ]
  },

  // Customer Dashboard Routes
  {
    path: '/customer',
    component: CustomerLayout,
    meta: {
      requiresAuth: true,
      allowedRoles: ['customer'],
      redirectTo: '/auth/login'
    },
    children: [
      {
        path: '',
        redirect: '/restaurants',
        meta: { requiresAuth: true }
      },

      // Restaurants listing
      {
        path: '/restaurants',
        component: () => import('../modules/customer/pages/BrowseRestaurants.vue'),
        meta: {
          title: 'Browse Restaurants',
          requiresAuth: true,
          allowedRoles: ['customer']
        }
      },

      // Single restaurant menu
      {
        path: '/restaurants/:id/menu',
        component: () => import('../modules/customer/pages/MenuPage.vue'),
        meta: {
          title: 'Restaurant Menu',
          requiresAuth: true,
          allowedRoles: ['customer']
        }
      },

      // Cart and Checkout
      {
        path: '/cart',
        component: () => import('../modules/customer/pages/CartPage.vue'),
        meta: {
          title: 'Shopping Cart',
          requiresAuth: true,
          allowedRoles: ['customer']
        }
      },
      {
        path: '/checkout',
        component: () => import('../modules/customer/pages/CheckoutPage.vue'),
        meta: {
          title: 'Checkout',
          requiresAuth: true,
          allowedRoles: ['customer']
        }
      },

      // Orders
      {
        path: '/orders',
        component: () => import('../modules/customer/pages/OrderHistory.vue'),
        meta: {
          title: 'Order History',
          requiresAuth: true,
          allowedRoles: ['customer']
        }
      },
      {
        path: '/orders/:id',
        component: () => import('../modules/customer/pages/OrderTracking.vue'),
        meta: {
          title: 'Track Order',
          requiresAuth: true,
          allowedRoles: ['customer']
        }
      },

      // Reviews
      {
        path: '/reviews',
        component: () => import('../modules/customer/pages/ReviewPage.vue'),
        meta: {
          title: 'My Reviews',
          requiresAuth: true,
          allowedRoles: ['customer']
        }
      },
    ]
  },

  // Auth Routes (Login/Register use AuthLayout + forms inside)
  {
    path: '/auth',
    component: AuthLayout,
    meta: {
      requiresAuth: false,
      hideForAuth: true // Hide these routes if user is already authenticated
    },
    children: [
      {
        path: 'login',
        component: () => import('../components/forms/LoginForm.vue'),
        meta: {
          title: 'Login - Food Delivery',
          requiresAuth: false,
          hideForAuth: true
        }
      },
      {
        path: 'register',
        component: () => import('../components/forms/RegisterForm.vue'),
        meta: {
          title: 'Register - Food Delivery',
          requiresAuth: false,
          hideForAuth: true
        }
      },
    ],
  },

  // Admin Routes
  {
    path: '/admin',
    component: () => import('../layouts/AdminLayout.vue'),
    meta: {
      requiresAuth: true,
      allowedRoles: ['admin'],
      redirectTo: '/auth/login'
    },
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('../modules/admin/pages/AdminDashboard.vue'),
        meta: {
          title: 'Admin Dashboard',
          requiresAuth: true,
          allowedRoles: ['admin']
        }
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: () => import('../modules/admin/pages/UsersPage.vue'),
        meta: {
          title: 'Manage Users',
          requiresAuth: true,
          allowedRoles: ['admin']
        }
      },
      {
        path: 'restaurants',
        name: 'AdminRestaurants',
        component: () => import('../modules/admin/pages/RestaurantsPage.vue'),
        meta: {
          title: 'Manage Restaurants',
          requiresAuth: true,
          allowedRoles: ['admin']
        }
      },
      {
        path: 'riders',
        name: 'AdminRiders',
        component: () => import('../modules/admin/pages/RidersPage.vue'),
        meta: {
          title: 'Manage Riders',
          requiresAuth: true,
          allowedRoles: ['admin']
        }
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: () => import('../modules/admin/pages/OrdersMonitor.vue'),
        meta: {
          title: 'Orders Monitor',
          requiresAuth: true,
          allowedRoles: ['admin']
        }
      },
      {
        path: 'payments',
        name: 'AdminPayments',
        component: () => import('../modules/admin/pages/PaymentsPage.vue'),
        meta: {
          title: 'Payments Management',
          requiresAuth: true,
          allowedRoles: ['admin']
        }
      },
      {
        path: '',
        redirect: { name: 'AdminDashboard' },
        meta: { requiresAuth: true }
      }
    ],
  },

  // Restaurant Owner Routes
  {
    path: '/restaurant',
    component: () => import('../layouts/RestaurantLayout.vue'),
    meta: {
      requiresAuth: true,
      allowedRoles: ['restaurant'],
      redirectTo: '/auth/login'
    },
    children: [
      {
        path: 'dashboard',
        name: 'RestaurantDashboard',
        component: () => import('../modules/restaurant/pages/RestaurantDashboard.vue'),
        meta: {
          title: 'Restaurant Dashboard',
          requiresAuth: true,
          allowedRoles: ['restaurant']
        }
      },
      {
        path: 'menu',
        name: 'MenuManager',
        component: () => import('../modules/restaurant/pages/MenuManager.vue'),
        meta: {
          title: 'Menu Management',
          requiresAuth: true,
          allowedRoles: ['restaurant']
        }
      },
      {
        path: 'orders',
        name: 'OrdersPage',
        component: () => import('../modules/restaurant/pages/OrdersPage.vue'),
        meta: {
          title: 'Restaurant Orders',
          requiresAuth: true,
          allowedRoles: ['restaurant']
        }
      },
      {
        path: 'earnings',
        name: 'EarningsPage',
        component: () => import('../modules/restaurant/pages/EarningsPage.vue'),
        meta: {
          title: 'Earnings Report',
          requiresAuth: true,
          allowedRoles: ['restaurant']
        }
      },
      {
        path: 'promotions',
        name: 'PromotionsPage',
        component: () => import('../modules/restaurant/pages/PromotionsPage.vue'),
        meta: {
          title: 'Promotions Management',
          requiresAuth: true,
          allowedRoles: ['restaurant']
        }
      },
      {
        path: '',
        redirect: { name: 'RestaurantDashboard' },
        meta: { requiresAuth: true }
      }
    ]
  },

  // Rider Routes
  {
    path: '/riders',
    component: RiderLayout,
    meta: {
      requiresAuth: true,
      allowedRoles: ['rider'],
      redirectTo: '/auth/login'
    },
    children: [
      {
        path: '',
        component: () => import('../modules/rider/pages/RiderDashboard.vue'),
        meta: {
          title: 'Rider Dashboard',
          requiresAuth: true,
          allowedRoles: ['rider']
        }
      },
      {
        path: 'orders',
        component: () => import('../modules/rider/pages/OrderAssignment.vue'),
        meta: {
          title: 'Order Assignments',
          requiresAuth: true,
          allowedRoles: ['rider']
        }
      },
      {
        path: 'navigation',
        component: () => import('../modules/rider/pages/NavigationPage.vue'),
        meta: {
          title: 'Navigation',
          requiresAuth: true,
          allowedRoles: ['rider']
        }
      },
      {
        path: 'earnings',
        component: () => import('../modules/rider/pages/EarningsPage.vue'),
        meta: {
          title: 'Rider Earnings',
          requiresAuth: true,
          allowedRoles: ['rider']
        }
      },
    ],
  },

  // Catch-all (404)
  {
    path: '/:catchAll(.*)*',
    component: () => import('../pages/NotFound.vue'),
    meta: {
      title: 'Page Not Found',
      requiresAuth: false
    }
  },
]
