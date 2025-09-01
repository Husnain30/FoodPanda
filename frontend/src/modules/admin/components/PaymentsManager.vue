<template>
  <div>
    <!-- Header with Add button -->
    <div class="row q-mb-md">
      <div class="col">
        <h5 class="text-h5">Payments Manager</h5>
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
      :loading="loading"
      v-model:pagination="pagination"
    >
      <template v-slot:body-cell-status="props">
        <q-td>
          <q-badge :color="props.row.status === 'Paid' ? 'green' : 'red'">
            {{ props.row.status }}
          </q-badge>
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td align="center">
          <q-btn
            flat dense round color="primary" icon="edit"
            @click="editPayment(props.row)"
          />
          <q-btn
            flat dense round color="negative" icon="delete"
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
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  name: "PaymentsManager",
  setup() {
    const store = useStore();
    const loading = ref(false);

    // Get payments from analytics API
    const payments = computed(() => {
      const analytics = store.getters["admin/analytics"];
      const rawPayments = analytics?.payments || [];
      
      return rawPayments.map((p) => ({
        id: p.id,
        orderId: p.order_id || "N/A",
        customer: p.customer_name || "Unknown",
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
      { name: "actions", label: "Actions", align: "center" },
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
      if (newPayment.value.orderId && newPayment.value.customer && newPayment.value.amount && newPayment.value.date) {
        try {
          loading.value = true;
          // API call would go here
          console.log("Save Payment:", newPayment.value);
          
          // Reset form
          newPayment.value = { orderId: "", customer: "", amount: null, status: "Unpaid", date: "" };
          addDialog.value = false;
          
          // Refresh data
          await fetchAnalytics();
        } catch (error) {
          console.error("Error saving payment:", error);
        } finally {
          loading.value = false;
        }
      }
    };

    const editPayment = (payment) => {
      alert(`Edit Payment for Order: ${payment.orderId}`);
    };

    const deletePayment = async (id) => {
      try {
        loading.value = true;
        // API call would go here
        console.log(`Delete Payment with ID: ${id}`);
        
        // Refresh data after delete
        await fetchAnalytics();
      } catch (error) {
        console.error("Error deleting payment:", error);
      } finally {
        loading.value = false;
      }
    };

    const fetchAnalytics = async () => {
      loading.value = true;
      try {
        await store.dispatch("admin/fetchAnalytics");
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchAnalytics();
    });

    return {
      payments, 
      columns, 
      pagination,
      addDialog, 
      newPayment,
      loading,
      openAddDialog, 
      savePayment,
      editPayment, 
      deletePayment
    };
  },
};
</script>