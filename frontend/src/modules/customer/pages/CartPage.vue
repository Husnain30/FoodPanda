<template>
  <q-page padding>
    <h1 class="page-title">🛒 Your Cart</h1>

    <q-card class="cart-card q-pa-md">
      <q-list bordered separator>
        <q-item v-for="n in 8" :key="n" class="cart-item">
          <q-item-section>
            <div class="item-name">Dish {{ n }}</div>
            <div class="item-price">$ {{ (10 * n).toFixed(2) }}</div>
          </q-item-section>
          <q-item-section side>
            <q-btn flat class="delete-btn" icon="delete" />
          </q-item-section>
        </q-item>
      </q-list>

      <div class="total-section q-mt-md">
        <div class="total-text">
          Total: <strong>$60.00</strong>
        </div>
        <q-btn 
          class="checkout-btn q-ml-md" 
          label="Proceed to Checkout" 
          to="/customer/checkout" 
        />
      </div>
    </q-card>
  </q-page>
</template>

<style scoped>
/* Title */
.page-title {
  margin-top: 0px;
  font-size: 28px;
  margin-bottom: 20px;
  font-weight: 700;
  color: #333;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

/* Cart Card */
.cart-card {
  border-radius: 18px;
  background: #fff;
  box-shadow: 
    0 6px 14px rgba(106, 17, 203, 0.15), 
    0 8px 20px rgba(37, 117, 252, 0.15);
  transition: transform 0.3s ease;
}
.cart-card:hover {
  transform: translateY(-5px);
}

/* Items */
.cart-item {
  padding: 12px 0;
}
.item-name {
  font-weight: 600;
  font-size: 17px;
  color: #444;
}
.item-price {
  font-size: 15px;
  color: #6a11cb;
  font-weight: 500;
}

/* Delete Button */
.delete-btn {
  color: #ff4757;
  transition: all 0.3s ease;
}
.delete-btn:hover {
  background: rgba(255, 71, 87, 0.1);
  border-radius: 8px;
}

/* Total */
.total-section {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  padding-top: 15px;
  border-top: 2px solid rgba(0,0,0,0.08);
}
.total-text strong {
  color: #2575fc;
}

/* Checkout Button */
.checkout-btn {
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: #fff;
  font-weight: 600;
  border-radius: 12px;
  padding: 10px 20px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(106, 17, 203, 0.25);
}
.checkout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(37, 117, 252, 0.3);
}
</style>

