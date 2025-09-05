<template>
  <q-page padding>
    <div class="q-pa-md">
      <!-- Header -->
      <div class="row justify-between items-center q-mb-md">
        <h4 class="text-black text-bold">Assigned Orders</h4>
        <q-btn
          color="primary"
          label="Refresh"
          @click="loadOrders"
          :loading="loading"
          rounded
          unelevated
          icon="refresh"
        />
      </div>

      <!-- Error Banner -->
      <q-banner v-if="error" class="bg-red text-white q-mb-md shadow-2">
        {{ error }}
      </q-banner>

      <!-- Orders List -->
      <div class="orders-grid">
        <q-card
          v-for="order in orders"
          :key="order.id"
          class="order-card shadow-3"
        >
          <q-card-section>
            <div class="row justify-between items-center">
              <div>
                <div class="text-h6">Order #{{ order.id }}</div>
                <div class="text-caption text-grey">
                  {{ new Date(order.created_at).toLocaleString() }}
                </div>
              </div>
              <q-badge
                :color="order.status === 'delivered' ? 'green' : 'orange'"
                align="middle"
              >
                {{ order.status }}
              </q-badge>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <div class="q-mb-xs">
              <strong>Total Price:</strong> Rs. {{ order.total_price }}
            </div>
            <div>
              <strong>Rider Fee:</strong> Rs. {{ order.rider_fee }}
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn
              v-if="order.status !== 'delivered'"
              color="green"
              label="Mark Delivered"
              @click="markDelivered(order.id)"
              :loading="loading"
              rounded
              glossy
              icon="check"
            />
          </q-card-actions>
        </q-card>
      </div>

      <!-- No Orders Message -->
      <div
        v-if="!loading && orders.length === 0"
        class="text-grey text-center q-mt-xl"
      >
        🚫 No orders assigned yet.
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

<style scoped>
.orders-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.order-card {
  border-radius: 12px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.order-card:hover {
  transform: translateY(-4px);
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15);
}
</style>



