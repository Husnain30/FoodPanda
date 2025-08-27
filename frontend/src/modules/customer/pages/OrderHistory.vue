<template>
  <q-page padding class="order-history-page">
    <h1 class="page-title"> Order History</h1>

    <q-card v-for="n in 3" :key="n" class="q-mb-md shadow-card q-pa-md order-card">
      <div class="order-info">
        <span class="order-id"><strong>Order #{{ 1000+n }}</strong></span>
        <q-badge color="white" text-color="primary" class="status-badge">
          Delivered
        </q-badge>
      </div>

      <div class="order-details">
        <p><strong>Total:</strong> ${{ (25*n).toFixed(2) }}</p>
        <p><strong>Date:</strong> {{ new Date().toLocaleDateString() }}</p>
      </div>

      <q-btn flat rounded class="reorder-btn" label="Reorder" icon="refresh" />
    </q-card>
  </q-page>
</template>

<style scoped>
/* Page Title */
.page-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 30px;
  color: black;
  text-align: center;
  
}

/* Order Cards */
.order-card {
  border-radius: 18px;

  color: black;
  transition: all 0.3s ease;
}
.order-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 18px rgba(106, 17, 203, 0.4),
              0 10px 22px rgba(37, 117, 252, 0.4);
}

/* Order Info */
.order-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.order-id {
  font-size: 18px;
}
.status-badge {
  border-radius: 10px;
  font-weight: 600;
  padding: 6px 10px;
  background: black;
  color: #2575fc !important;
}

/* Details */
.order-details {
  font-size: 15px;
  margin-bottom: 12px;
  color: black;
}
.order-details p {
  margin: 2px 0;
}

/* Reorder Button */
.reorder-btn {
  background: #fff !important;
  color: #2575fc !important;
  font-weight: 600;
  text-transform: none;
  border-radius: 10px;
  padding: 8px 16px;
  transition: all 0.3s ease;
}
.reorder-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(255,255,255,0.3);
}
</style>
