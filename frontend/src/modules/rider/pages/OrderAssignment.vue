<template>
  <q-page padding>
    <div class="q-pa-md">
      <!-- Header -->
      <div class="row justify-between items-center">
        <h4>Assigned Orders</h4>
        <q-btn
          color="primary"
          label="Refresh"
          @click="loadOrders"
          :loading="loading"
        />
      </div>

      <!-- Error Banner -->
      <q-banner v-if="error" class="bg-red text-white q-mt-md">
        {{ error }}
      </q-banner>

      <!-- Orders List -->
      <q-list bordered class="q-mt-md">
        <q-item v-for="order in orders" :key="order.id" clickable>
          <q-item-section>
            <q-item-label><strong>Order #{{ order.id }}</strong></q-item-label>
            <q-item-label caption>
              {{ order.customer_name }} - {{ order.address }}
            </q-item-label>
            <q-item-label caption>Status: {{ order.status }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-btn
              v-if="order.status !== 'delivered'"
              color="green"
              label="Mark Delivered"
              @click="markDelivered(order.id)"
              :loading="loading"
            />
          </q-item-section>
        </q-item>
      </q-list>

      <!-- No Orders Message -->
      <div v-if="!loading && orders.length === 0" class="text-grey q-mt-lg">
        No orders assigned yet.
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "OrderAssignment",
  computed: {
    ...mapGetters("rider", ["riderOrders", "riderLoading", "riderError"]),
    orders() {
      return this.riderOrders;
    },
    loading() {
      return this.riderLoading;
    },
    error() {
      return this.riderError;
    },
  },
  methods: {
    ...mapActions("rider", ["fetchOrders", "updateOrderStatus"]),
    async loadOrders() {
      await this.fetchOrders();
    },
    async markDelivered(id) {
      await this.updateOrderStatus({ id, status: "delivered" });
    },
  },
  mounted() {
    this.loadOrders();
  },
};
</script>

