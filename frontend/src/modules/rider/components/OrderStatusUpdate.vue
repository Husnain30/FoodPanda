<template>
  <q-card class="q-pa-md q-mb-md">
    <div class="text-h6 q-mb-md">Assigned Orders</div>

    <q-card
      v-for="order in orders"
      :key="order.id"
      class="q-pa-md q-mb-sm"
    >
      <div class="row items-center justify-between">
        <div>
          <div><strong>Order #{{ order.id }}</strong></div>
          <div>Status: {{ order.status }}</div>
        </div>
        <q-btn-dropdown
          color="primary"
          label="Update Status"
          dense
          size="sm"
        >
          <q-list>
            <q-item
              v-for="s in statuses"
              :key="s"
              clickable
              v-close-popup
              @click="changeStatus(order.id, s)"
            >
              <q-item-section>{{ s }}</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </q-card>

    <!-- Loader -->
    <div v-if="loading" class="text-center q-mt-md">
      <q-spinner color="primary" size="30px" />
      <p>Updating orders...</p>
    </div>
  </q-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "OrderStatusUpdate",
  data() {
    return {
      statuses: ["picked_up", "on_the_way", "delivered"],
    };
  },
  computed: {
    ...mapGetters("rider", ["riderOrders", "riderLoading"]),
    orders() {
      return this.riderOrders;
    },
    loading() {
      return this.riderLoading;
    },
  },
  methods: {
    ...mapActions("rider", ["fetchOrders", "updateOrderStatus"]),
    async changeStatus(id, status) {
      await this.updateOrderStatus({ id, status });
    },
  },
  created() {
    this.fetchOrders();
  },
};
</script>

