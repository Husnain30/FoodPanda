<template>
  <q-page padding>
    <!-- Header -->
    <div class="row q-mb-md">
      <div class="col">
        <h4 class="text-h4">Manage Payments</h4>
      </div>
      <div class="col-auto">
        <q-btn color="primary" label="Add Payment" @click="openAddDialog" />
        <q-btn
          color="secondary"
          icon="refresh"
          label="Refresh"
          class="q-ml-sm"
          @click="refreshPayments"
        />
      </div>
    </div>

    <!-- Payments Table -->
    <q-table
      :rows="payments"
      :columns="columns"
      row-key="id"
      flat
      bordered
      :loading="loading"
      v-model:pagination="pagination"
    >
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge
            :color="props.row.status === 'Paid' ? 'green' : 'red'"
            align="center"
          >
            {{ props.row.status }}
          </q-badge>
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td align="center">
          <q-btn
            flat
            dense
            round
            color="primary"
            icon="edit"
            @click="editPayment(props.row)"
          />
          <q-btn
            flat
            dense
            round
            color="negative"
            icon="delete"
            @click="deletePayment(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>

    <!-- Add Payment Dialog -->
    <q-dialog v-model="addDialog">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Add Payment</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="newPayment.orderId" label="Order ID" outlined />
          <q-input v-model="newPayment.customer" label="Customer" outlined />
          <q-input
            v-model.number="newPayment.amount"
            type="number"
            label="Amount"
            outlined
          />
          <q-select
            v-model="newPayment.status"
            :options="['Paid', 'Unpaid']"
            label="Status"
            outlined
          />
          <q-input v-model="newPayment.date" type="date" label="Date" outlined />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn color="primary" label="Save" @click="savePayment" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  name: "PaymentsPage",
  setup() {
    const store = useStore();
    const loading = ref(false);

    // Get payments from store
    const payments = computed(() => {
      const rawPayments = store.getters["admin/payments"] || [];
      return rawPayments.map((p) => ({
        id: p.id,
        orderId: p.order?.id || "Unknown",
        customer: p.customer?.name || "Unknown",
        amount: p.amount,
        status: p.status === "paid" ? "Paid" : "Unpaid",
        date: new Date(p.created_at).toLocaleDateString(),
      }));
    });

    const columns = [
      { name: "orderId", label: "Order ID", field: "orderId", align: "left" },
      { name: "customer", label: "Customer", field: "customer", align: "left" },
      { name: "amount", label: "Amount", field: "amount", align: "left" },
      { name: "status", label: "Status", field: "status", align: "center" },
      { name: "date", label: "Date", field: "date", align: "left" },
      { name: "actions", label: "Actions", field: "actions", align: "center" },
    ];

    const pagination = ref({ page: 1, rowsPerPage: 5 });

    const addDialog = ref(false);
    const newPayment = ref({
      orderId: "",
      customer: "",
      amount: null,
      status: "Unpaid",
      date: "",
    });

    const openAddDialog = () => {
      addDialog.value = true;
    };

    const savePayment = async () => {
      try {
        await store.dispatch("admin/createPayment", newPayment.value);
        addDialog.value = false;
        newPayment.value = {
          orderId: "",
          customer: "",
          amount: null,
          status: "Unpaid",
          date: "",
        };
      } catch (error) {
        console.error("Error saving payment:", error);
      }
    };

    const editPayment = (payment) => {
      alert(`Edit Payment for Order: ${payment.orderId}`);
    };

    const deletePayment = async (id) => {
      try {
        await store.dispatch("admin/deletePayment", id);
      } catch (error) {
        console.error("Error deleting payment:", error);
      }
    };

    const refreshPayments = async () => {
      loading.value = true;
      try {
        await store.dispatch("admin/fetchPayments");
      } catch (error) {
        console.error("Error refreshing payments:", error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      refreshPayments();
    });

    return {
      payments,
      columns,
      pagination,
      addDialog,
      newPayment,
      openAddDialog,
      savePayment,
      editPayment,
      deletePayment,
      refreshPayments,
      loading,
    };
  },
};
</script>