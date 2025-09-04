<template>
  <q-page class="q-pa-md orders-page">

    <!-- Page Header -->
    <div class="page-header q-mb-md">
      <div class="text-h5">Your Orders</div>
    </div>

    <!-- Loader -->
    <div v-if="loading" class="row justify-center q-mt-lg">
      <q-spinner-dots size="40px" color="primary" />
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-negative text-center q-mt-lg">
      {{ error }}
    </div>

    <!-- Orders List -->
    <div v-else>
      <q-card
        v-for="order in orders"
        :key="order.id"
        class="q-mb-md shadow-2"
      >
        <q-card-section>
          <div class="text-h6">Order #{{ order.id }}</div>
          <div class="text-caption text-grey">
            Status:
            <q-badge :color="statusColor(order.status)" class="q-ml-xs">
              {{ order.status }}
            </q-badge>
          </div>
          <div class="text-caption">
            Placed on: {{ formatDate(order.created_at) }}
          </div>
        </q-card-section>

        <q-separator />

        <!-- Order Items -->
        <q-list dense>
          <q-item v-for="item in order.items" :key="item.id">
            <q-item-section>
              <q-item-label>{{ item.name }}</q-item-label>
              <q-item-label caption>
                {{ item.quantity }} × {{ item.price }} PKR
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <div class="text-weight-bold">
                {{ item.quantity * item.price }} PKR
              </div>
            </q-item-section>
          </q-item>
        </q-list>

        <q-separator />

        <!-- Footer -->
        <q-card-actions align="right">
          <div class="text-subtitle1 text-primary">
            Total: {{ calculateTotal(order.items) }} PKR
          </div>
        </q-card-actions>
      </q-card>

      <!-- No Orders -->
      <div v-if="!orders.length" class="text-center q-mt-lg">
        <q-icon name="shopping_bag" size="40px" color="grey" />
        <div class="text-grey q-mt-sm">You have no past orders</div>
      </div>
    </div>

  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "OrdersPage",

  computed: {
    ...mapState("customer", ["orders", "loading", "error"]),
  },

  methods: {
    ...mapActions("customer", ["fetchOrders"]),

    calculateTotal(items) {
      if (!items) return 0;
      return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },

    statusColor(status) {
      switch (status) {
        case "pending":
          return "orange";
        case "completed":
          return "green";
        case "cancelled":
          return "red";
        default:
          return "grey";
      }
    },

    formatDate(dateStr) {
      if (!dateStr) return "-";
      const date = new Date(dateStr);
      return date.toLocaleString();
    },
  },

  mounted() {
    this.fetchOrders();
  },
};
</script>

<style scoped>
.orders-page {
  max-width: 800px;
  margin: 0 auto;
}
</style>



