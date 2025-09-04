<template>
  <q-page class="q-pa-md">
    <!-- Loading -->
    <div v-if="loading" class="text-center q-mt-md">
      <q-spinner color="primary" size="40px" />
      <p>Loading order details...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-negative text-center q-mt-md">
      {{ error }}
    </div>

    <!-- Order Details -->
    <div v-else-if="order" class="q-mt-md">
      <q-card class="q-pa-md shadow-3">
        <q-card-section>
          <div class="text-h6">Order #{{ order.id }}</div>
          <div><strong>Status:</strong> {{ order.status }}</div>
          <div><strong>Total:</strong> {{ order.total_price }} PKR</div>
          <div><strong>Rider Fee:</strong> {{ order.rider_fee }} PKR</div>
          <div>
            <small>Placed: {{ new Date(order.created_at).toLocaleString() }}</small>
          </div>
          <div>
            <small>Updated: {{ new Date(order.updated_at).toLocaleString() }}</small>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="text-subtitle1 q-mb-sm">Items</div>
          <q-list v-if="order.items && order.items.length" bordered separator>
            <q-item v-for="item in order.items" :key="item.id">
              <q-item-section>
                <div>{{ item.name }}</div>
                <small>Qty: {{ item.quantity }}</small>
              </q-item-section>
              <q-item-section side>
                <div>{{ item.price }} PKR</div>
              </q-item-section>
            </q-item>
          </q-list>
          <div v-else class="text-grey text-italic">
            No items available
          </div>
        </q-card-section>
      </q-card>

      <!-- Stepper for status tracking -->
      <q-stepper
        v-model="step"
        vertical
        animated
        flat
        color="primary"
        class="q-mt-lg"
      >
        <q-step name="1" title="Accepted" icon="check_circle" :done="step > 1" />
        <q-step name="2" title="Preparing" icon="restaurant" :done="step > 2" />
        <q-step name="3" title="On the Way" icon="delivery_dining" :done="step > 3" />
        <q-step name="4" title="Delivered" icon="done_all" />
      </q-stepper>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "OrderTracking",
  data() {
    return {
      step: 1,
    };
  },
  computed: {
    ...mapGetters("customer", [
      "currentOrder",
      "customerLoading",
      "customerError",
    ]),
    order() {
      return this.currentOrder;
    },
    loading() {
      return this.customerLoading;
    },
    error() {
      return this.customerError;
    },
  },
  watch: {
    order: {
      handler(order) {
        if (!order) return;
        // Map backend status to stepper value
        switch (order.status) {
          case "accepted":
            this.step = 1;
            break;
          case "preparing":
            this.step = 2;
            break;
          case "on_the_way":
            this.step = 3;
            break;
          case "delivered":
            this.step = 4;
            break;
          default:
            this.step = 1;
        }
      },
      immediate: true,
    },
  },
  created() {
    const orderId = this.$route.params.id;
    this.trackOrder(orderId);
  },
  methods: {
    ...mapActions("customer", ["trackOrder"]),
  },
};
</script>


