# Foodpanda - Multi-Panel Food Delivery Platform

A comprehensive food delivery platform built with Vue.js and Quasar Framework, featuring separate panels for customers, restaurants, riders, and administrators.

## Project Overview

Foodpanda is a multi-panel food delivery application that connects customers with restaurants and delivery riders. The platform includes:

- *Customer Panel*: Web interface for browsing restaurants, placing orders, and tracking deliveries
- *Restaurant Panel*: Management interface for restaurants to handle menus, orders, and earnings
- *Rider Panel*: Mobile app interface for delivery riders to manage assignments and earnings
- *Admin Panel*: Super admin dashboard for platform management and analytics
- *Payments & Transactions*: Integrated payment system (to be implemented)

## Features by Panel

### 1. Customer Panel (Web)

End-user interface for browsing restaurants & placing orders.

#### Features:
- User registration/login (OTP, social login)
- Profile & address book
- Browse restaurants by location/cuisine
- Restaurant menu with categories & items
- Cart & checkout
- Live order tracking (preparing → picked → delivered)
- Order history & re-order
- Ratings & reviews
- Chat system with rider

#### Frontend Components:
- AuthForms.vue (login/register/OTP)
- AddressSelector.vue (map + saved addresses)
- RestaurantList.vue (filter by cuisine, rating, delivery time)
- MenuPage.vue (menu items, add to cart)
- CartPage.vue & CheckoutForm.vue
- OrderTracking.vue (live status, rider location on map)
- OrderHistory.vue
- ReviewForm.vue

#### Frontend Tasks:
- Build location-based restaurant listing
- Cart management with addons/options
- Smooth checkout experience
- Ratings/reviews UI

#### Backend Endpoints:
- POST /api/users/register
- POST /api/users/login
- GET /api/restaurants?location
- GET /api/restaurants/:id/menu
- POST /api/orders
- GET /api/orders/:id (tracking info)
- POST /api/reviews

#### Backend Tasks:
- User schema (users, addresses, payments)
- Restaurant schema (menus, timings, cuisine type, delivery areas)
- Cart/order schema (items, addons, prices)
- Review system

### 2. Restaurant Panel

For restaurants to manage menu, orders, and earnings.

#### Features:
- Restaurant registration & verification
- Menu management (CRUD for items, categories, addons)
- Order management (view → accept → prepare → ready for pickup)
- Earnings dashboard (sales, commissions, payouts)
- Promotions & discounts

#### Frontend Components:
- RestaurantDashboard.vue
- MenuManager.vue (CRUD for items & categories)
- OrdersTable.vue
- EarningsChart.vue
- PromotionsForm.vue

#### Frontend Tasks:
- Menu CRUD with images
- Order status update buttons (Accept, Preparing, Ready)
- Earnings stats

#### Backend Endpoints:
- POST /api/restaurants/register
- POST /api/menu
- PATCH /api/menu/:id
- GET /api/orders/restaurant/:id
- GET /api/restaurants/:id/stats

#### Backend Tasks:
- Restaurant schema (menus, timings, delivery radius)
- Order assignment to restaurant
- Status update workflow
- Commission & payout calculations

### 3. Rider Panel (Delivery App)

For delivery riders to accept & deliver orders.

#### Features:
- Rider registration
- Go Online/Offline toggle
- Live order assignments (nearest available rider)
- Pickup & delivery instructions
- Live navigation map
- Earnings tracking (daily, weekly)

#### Frontend Components:
- RiderLogin.vue
- OrderAssignment.vue (new order pop-up)
- OrderStatusUpdate.vue (Picked → Delivered)
- NavigationMap.vue (integrated maps API)
- EarningsPage.vue

#### Frontend Tasks:
- Live order notification system
- Update order status
- Real-time map tracking for delivery
- Rider earnings history

#### Backend Endpoints:
- POST /api/riders/register
- POST /api/riders/status (online/offline)
- GET /api/orders/rider/:id
- PATCH /api/orders/:id (status updates)
- GET /api/riders/:id/earnings

#### Backend Tasks:
- Rider schema (verification, availability)
- Live order assignment algorithm (nearest rider)
- Location tracking with WebSockets
- Rider earnings & payouts

### 4. Admin Panel

Super admin panel to manage the whole platform.

#### Features:
- User, restaurant, rider management
- Approve/reject restaurants & riders
- Global order monitoring
- Payments & commissions management
- Dispute & refund handling

#### Frontend Components:
- AdminDashboard.vue
- UsersTable.vue
- RestaurantsTable.vue
- RidersTable.vue
- OrdersMonitor.vue
- PaymentsManager.vue

#### Frontend Tasks:
- Approvals & verification workflow
- Order monitoring with filters

#### Backend Endpoints:
- GET /api/admin/users
- GET /api/admin/restaurants
- GET /api/admin/riders
- GET /api/admin/orders
- GET /api/admin/analytics

#### Backend Tasks:
- Role-based access (Admin/Restaurant/Rider/User)
- Commission system (platform fee per order)
- Refund & dispute management
- Aggregated analytics queries

### 5. Payments & Transactions

Integrated payment system for handling transactions, refunds, and financial operations. (To be implemented at the end)

## Install the dependencies

bash
yarn
# or
npm install


### Start the app in development mode (hot-code reloading, error reporting, etc.)

bash
quasar dev


### Lint the files

bash
yarn lint
# or
npm run lint


### Format the files

bash
yarn format
# or
npm run format


### Build the app for production

bash
quasar build


### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).