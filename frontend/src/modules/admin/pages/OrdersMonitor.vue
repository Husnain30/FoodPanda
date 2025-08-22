<template>
  <q-page padding>
    <!-- Header -->
    <div class="row q-mb-md items-center">
      <div class="col">
        <h4 class="text-h4">Order Monitor</h4>
      </div>
      <div class="col-auto">
        <q-btn color="primary" icon="refresh" label="Refresh" @click="refreshOrders" />
      </div>
    </div>

    <!-- Orders Table -->
    <q-card>
      <q-card-section>
        <q-table
          :rows="orders"
          :columns="columns"
          row-key="id"
          flat
          bordered
          :loading="loading"
        >
          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <q-badge
                :color="statusColor(props.row.status)"
                align="middle"
              >
                {{ props.row.status }}
              </q-badge>
            </q-td>
          </template>

          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                dense
                flat
                color="primary"
                icon="visibility"
                @click="viewOrder(props.row)"
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>

    <!-- Order Details Dialog -->
    <q-dialog v-model="showDialog">
      <q-card style="min-width:400px">
        <q-card-section>
          <div class="text-h6">Order Details</div>
        </q-card-section>
        <q-card-section>
          <div><b>ID:</b> {{ selectedOrder.id }}</div>
          <div><b>Customer:</b> {{ selectedOrder.customer }}</div>
          <div><b>Restaurant:</b> {{ selectedOrder.restaurant }}</div>
          <div><b>Rider:</b> {{ selectedOrder.rider || 'Unassigned' }}</div>
          <div><b>Status:</b> {{ selectedOrder.status }}</div>
          <div><b>Amount:</b> {{ selectedOrder.amount }}</div>
          <div><b>Created:</b> {{ selectedOrder.createdAt }}</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Close" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { computed, ref, onMounted } from "vue"
import { useStore } from "vuex"

export default {
  name: "OrderMonitor",
  setup() {
    const store = useStore()
    const loading = ref(false)
    const showDialog = ref(false)
    const selectedOrder = ref({})

    const orders = computed(() => store.getters["admin/orders"] || [])

    const columns = [
      { name: "id", label: "Order ID", field: "id", align: "left" },
      { name: "customer", label: "Customer", field: "customer", align: "left" },
      { name: "restaurant", label: "Restaurant", field: "restaurant", align: "left" },
      { name: "rider", label: "Rider", field: "rider", align: "left" },
      { name: "status", label: "Status", field: "status", align: "center" },
      { name: "amount", label: "Amount", field: "amount", align: "right" },
      { name: "createdAt", label: "Created At", field: "createdAt", align: "left" },
      { name: "actions", label: "Actions", field: "actions", align: "center" },
    ]

    const refreshOrders = async () => {
      loading.value = true
      await store.dispatch("admin/fetchOrders")
      loading.value = false
    }

    const statusColor = (status) => {
      switch (status) {
        case "Pending": return "orange"
        case "Accepted": return "blue"
        case "Picked": return "purple"
        case "Delivered": return "green"
        case "Cancelled": return "red"
        default: return "grey"
      }
    }

    const viewOrder = (order) => {
      selectedOrder.value = order
      showDialog.value = true
    }

    onMounted(() => {
      refreshOrders()
    })

    return {
      orders,
      columns,
      loading,
      refreshOrders,
      statusColor,
      viewOrder,
      showDialog,
      selectedOrder,
    }
  },
}
</script>
