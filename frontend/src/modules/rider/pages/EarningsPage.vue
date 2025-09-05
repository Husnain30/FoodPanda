<template>
  <q-page class="q-pa-md earnings-page">

    <!-- Header -->
    <div class="page-header text-center q-mb-lg">
      <q-icon name="attach_money" size="40px" color="green" />
      <div class="text-h5 text-bold q-mt-sm">My Earnings</div>
      <div class="text-caption text-grey">Track your completed deliveries and earnings</div>
    </div>

    <!-- Summary Cards -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-6 col-md-3">
        <q-card class="summary-card bg-primary text-white">
          <q-card-section class="text-center">
            <div class="text-subtitle1">Total Orders</div>
            <div class="text-h6 text-bold">{{ earnings.total_orders }}</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-6 col-md-3">
        <q-card class="summary-card bg-green text-white">
          <q-card-section class="text-center">
            <div class="text-subtitle1">Total Earnings</div>
            <div class="text-h6 text-bold">Rs. {{ earnings.total_earnings }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Orders List -->
    <q-card class="orders-card shadow-3">
      <q-card-section>
        <div class="text-h6 text-bold q-mb-md">Completed Orders</div>

        <q-list bordered separator>
          <q-item v-for="order in earnings.orders" :key="order.id" class="order-item">
            <q-item-section avatar>
              <q-icon name="receipt_long" color="primary" size="28px" />
            </q-item-section>

            <q-item-section>
              <div class="text-subtitle1">Order #{{ order.id }}</div>
              <div class="text-caption text-grey">
                Status: <span class="text-green text-bold">{{ order.status }}</span>
              </div>
              <div class="text-caption text-grey">
                Created: {{ new Date(order.created_at).toLocaleString() }}
              </div>
            </q-item-section>

            <q-item-section side top>
              <div class="text-bold">Rs. {{ order.total_price }}</div>
              <div class="text-caption text-positive">Rider Fee: {{ order.rider_fee }}</div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "EarningsPage",
  computed: {
    ...mapState("rider", ["earnings", "loading", "error"]),
  },
  created() {
    this.fetchEarnings();
  },
  methods: {
    ...mapActions("rider", ["fetchEarnings"]),
  },
};
</script>

<style scoped>
.earnings-page {
  background: #f9fafb;
}

.page-header {
  padding: 10px 0;
}

.summary-card {
  border-radius: 12px;
  transition: transform 0.2s ease-in-out;
}

.summary-card:hover {
  transform: translateY(-4px);
}

.orders-card {
  border-radius: 12px;
}

.order-item {
  transition: background 0.2s ease-in-out;
}

.order-item:hover {
  background: #f5f5f5;
  border-left: 4px solid #027be3;
}
</style>




