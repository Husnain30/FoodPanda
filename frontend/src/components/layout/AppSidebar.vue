<template>
  <q-drawer
    v-model="localDrawer"
    show-if-above
    bordered
    class="bg-grey-1"
  >
    <q-list padding>
      <!-- User Section -->
      <q-item>
        <q-item-section avatar>
          <q-avatar size="42px">
            <img src="../../assets/logos/customers.svg" alt="">
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-weight-bold">John Doe</q-item-label>
          <q-item-label caption>Customer</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <!-- Navigation -->
      <q-item clickable v-ripple to="/">
        <q-item-section avatar><q-icon name="home" /></q-item-section>
        <q-item-section>Home</q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/restaurants">
        <q-item-section avatar><q-icon name="restaurant" /></q-item-section>
        <q-item-section>Restaurants</q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/orders">
        <q-item-section avatar><q-icon name="receipt_long" /></q-item-section>
        <q-item-section>Orders</q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/profile">
        <q-item-section avatar><q-icon name="person" /></q-item-section>
        <q-item-section>Profile</q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script>
export default {
  name: "AppSidebar",
  props: {
    drawer: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    localDrawer: {
      get() {
        return this.drawer;
      },
      set(val) {
        this.$emit("update:drawer", val);
      }
    }
  }
};
</script>
