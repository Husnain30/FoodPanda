# 🍔 Food Delivery Clone - Frontend

A modern **Food Delivery Web App Frontend** built with **Vue.js 3 + Quasar Framework**, featuring separate panels for **Customers, Restaurants, Riders, and Admins**.  
This project follows a **modular architecture** with clean separation of concerns and reusable UI components.

---

## 🚀 Features

### 👥 Customers
- Browse restaurants by cuisine, rating, or delivery time
- View menus, add items to cart, and checkout
- Track live orders with rider location on map
- Manage saved addresses & personal profile
- Order history and reviews

### 🏪 Restaurants
- Dashboard with orders, earnings, and analytics
- Manage menu (add/update/remove dishes)
- Handle incoming orders in real-time
- Promotions & offers management

### 🚴 Riders
- Rider dashboard with assigned orders
- Live navigation map for deliveries
- Toggle online/offline status
- Track earnings & delivery history

### 👨‍💼 Admin
- Monitor and manage users, restaurants, and riders
- Global order management
- Payment & earnings reports
- Advanced analytics and system overview

---

## 🛠️ Tech Stack

- **Framework:** [Vue.js 3](https://vuejs.org/) + [Quasar Framework](https://quasar.dev/)  
- **State Management:** Vuex  
- **Routing:** Vue Router  
- **HTTP Client:** Axios (with interceptors)  
- **Styling:** SCSS + Quasar UI Components  

---

## 📂 Project Structure
foodDelivery-clone-frontend/
│
├── public/ # Static files
├── src/
│ ├── assets/ # Images, logos, styles
│ ├── boot/ # Quasar boot files (axios, auth, pusher)
│ ├── components/ # Reusable UI components
│ ├── layouts/ # App layouts (Main, Auth, Admin)
│ ├── modules/ # Role-based panels
│ │ ├── customer/ # Customer-specific pages & components
│ │ ├── restaurant/ # Restaurant-specific pages & components
│ │ ├── rider/ # Rider-specific pages & components
│ │ └── admin/ # Admin-specific pages & components
│ ├── pages/ # Generic pages (Home, About, Contact, 404)
│ ├── router/ # Vue Router setup
│ ├── store/ # Vuex store (auth, customer, restaurant, rider, admin)
│ ├── utils/ # Helpers, constants, validators
│ ├── App.vue # Root component
│ └── main.js # App entry point
└── test/ # Unit & e2e tests


