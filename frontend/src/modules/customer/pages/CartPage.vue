<template>
  <q-page padding>
    <h1 class="page-title">🛒 Your Cart</h1>
    <q-card class="q-pa-md shadow-card">
      <q-list bordered separator>
        <q-item v-for="n in 3" :key="n">
          <q-item-section>
            <div class="item-name">Dish {{ n }}</div>
            <div class="item-price text-grey-7">$ {{ (10 * n).toFixed(2) }}</div>
          </q-item-section>
          <q-item-section side>
            <q-btn flat color="negative" icon="delete" />
          </q-item-section>
        </q-item>
      </q-list>
      <div class="total-section q-mt-md">
        <div>Total: <strong>$60.00</strong></div>
        <q-btn color="primary" label="Proceed to Checkout" class="q-ml-md" to="/customer/checkout" />
      </div>
    </q-card>
  </q-page>
</template>

<style scoped>
.page-title { font-size: 26px; margin-bottom: 15px; }
.shadow-card { border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
.item-name { font-weight: 600; }
.item-price { font-size: 14px; }
.total-section { display: flex; justify-content: flex-end; align-items: center; font-size: 18px; }
</style>
