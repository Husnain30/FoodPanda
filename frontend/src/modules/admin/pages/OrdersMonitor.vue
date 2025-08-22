<template>
  <q-page padding>
    <!-- Header -->
    <div class="row q-mb-md">
      <div class="col">
        <h4 class="text-h5">Orders Monitor</h4>
      </div>
      <div class="col-auto">
        <q-input
          dense
          filled
          v-model="filter"
          placeholder="Search orders..."
          debounce="300"
          class="q-ml-sm"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>

    <!-- Orders Table -->
    <q-table
      title="All Orders"
      :rows="filteredOrders"
      :columns="columns"
      row-key="id"
      :filter="filter"
      flat
      bordered
      :pagination="{ rowsPerPage: 10 }"
    >
      <!-- Custom Status Chip -->
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-chip
            :color="statusColor(props.row.status)"
            text-color="white"
            dense
          >
            {{ props.row.status }}
          </q-chip>
        </q-td>
      </template>

      <!-- Action Buttons -->
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            size="sm"
            color="positive"
            flat
            label="Approve"
            @click="updateStatus(props.row.id, 'approved')"
            v-if="props.row.status === 'pending'"
          />
          <q-btn
            size="sm"
            color="negative"
            flat
            label="Reject"
            @click="updateStatus(props.row.id, 'rejected')"
            v-if="props.row.status === 'pending'"
          />
          <q-btn
            size="sm"
            color="primary"
            flat
            label="Mark Delivered"
            @click="updateStatus(props.row.id, 'delivered')"
            v-if="props.row.status === 'approved'"
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { computed, ref, onMounted } from "vue"
import { useStore } from "vuex"

export default {
  name: "OrdersMonitor",
  setup() {
    const store = useStore()
    const filter = ref("")

    const orders = computed(() => store.getters["admin/orders"])

    const columns = [
      { name: "id", label: "ID", field: "id", align: "left" },
      { name: "user", label: "User", field: "user", align: "left" },
      { name: "restaurant", label: "Restaurant", field: "restaurant", align: "left" },
      { name: "amount", label: "Amount", field: "amount", align: "left" },
      { name: "date", label: "Date", field: "date", align: "left" },
      { name: "status", label: "Status", field: "status", align: "left" },
      { name: "actions", label: "Actions", align: "center" },
    ]

    onMounted(() => {
      store.dispatch("admin/fetchOrders")
    })

    const filteredOrders = computed(() => {
      if (!filter.value) return orders.value
      return orders.value.filter(order =>
        Object.values(order).some(val =>
          String(val).toLowerCase().includes(filter.value.toLowerCase())
        )
      )
    })

    const statusColor = (status) => {
      switch (status) {
        case "pending":
          return "orange"
        case "approved":
          return "blue"
        case "delivered":
          return "green"
        case "rejected":
          return "red"
        default:
          return "grey"
      }
    }

    const updateStatus = (id, newStatus) => {
      store.dispatch("admin/updateOrderStatus", { id, status: newStatus })
    }

    return {
      filter,
      orders,
      columns,
      filteredOrders,
      statusColor,
      updateStatus,
    }
  },
}
</script>
