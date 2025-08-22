<template>
  <q-page padding>
    <!-- Header -->
    <div class="row q-mb-md">
      <div class="col">
        <h4 class="text-h4">Manage Payments</h4>
      </div>
      <div class="col-auto">
        <q-btn color="primary" label="Add Payment" @click="openAddDialog" />
      </div>
    </div>

    <!-- Payments Table -->
    <q-table
      :rows="payments"
      :columns="columns"
      row-key="id"
      flat
      bordered
      v-model:pagination="pagination"
    >
      <template v-slot:body-cell-status="props">
        <q-td>
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
          <q-input
            v-model="newPayment.date"
            type="date"
            label="Date"
            outlined
          />
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
import { ref } from "vue";

export default {
  name: "PaymentsPage",
  setup() {
    const payments = ref([
      {
        id: 1,
        orderId: "ORD123",
        customer: "Ali Khan",
        amount: 1200,
        status: "Paid",
        date: "2025-08-01",
      },
      {
        id: 2,
        orderId: "ORD124",
        customer: "Ahmed Raza",
        amount: 800,
        status: "Unpaid",
        date: "2025-08-02",
      },
    ]);

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

    const savePayment = () => {
      if (
        newPayment.value.orderId &&
        newPayment.value.customer &&
        newPayment.value.amount &&
        newPayment.value.date
      ) {
        payments.value.push({
          id: payments.value.length + 1,
          ...newPayment.value,
        });
        newPayment.value = {
          orderId: "",
          customer: "",
          amount: null,
          status: "Unpaid",
          date: "",
        };
        addDialog.value = false;
      }
    };

    const editPayment = (payment) => {
      alert(`Edit Payment for Order: ${payment.orderId}`);
    };

    const deletePayment = (id) => {
      payments.value = payments.value.filter((p) => p.id !== id);
    };

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
    };
  },
};
</script>
