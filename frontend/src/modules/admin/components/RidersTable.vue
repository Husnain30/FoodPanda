<template>
  <div>
    <!-- Header with Add button -->
    <div class="row q-mb-md">
      <div class="col">
        <h5 class="text-h5">Riders Table</h5>
      </div>
      <div class="col-auto">
        <q-btn color="primary" label="Add Rider" @click="openAddRiderDialog" />
      </div>
    </div>

    <!-- Riders Table -->
    <q-table
      :rows="riders"
      :columns="columns"
      row-key="id"
      flat
      bordered
      :loading="loading"
      v-model:pagination="pagination"
    >
      <template v-slot:body-cell-status="props">
        <q-td>
          <q-badge :color="props.row.status === 'active' ? 'green' : 'red'">
            {{ props.row.status }}
          </q-badge>
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td align="center">
          <q-btn
            flat dense round color="primary" icon="edit"
            @click="editRider(props.row)"
          />
          <q-btn
            flat dense round color="negative" icon="delete"
            @click="deleteRider(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>

    <!-- Add Rider Dialog -->
    <q-dialog v-model="addRiderDialog">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Add Rider</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="newRider.name" label="Name" outlined />
          <q-input v-model="newRider.email" label="Email" outlined />
          <q-input v-model="newRider.phone" label="Phone" outlined />
          <q-select
            v-model="newRider.status"
            :options="['active', 'inactive']"
            label="Status"
            outlined
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn color="primary" label="Save" @click="saveRider" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  name: "RiderTable",
  setup() {
    const store = useStore();
    const loading = ref(false);

    // Get riders from store
    const riders = computed(() => {
      const rawRiders = store.getters["admin/riders"] || [];
      return rawRiders.map((r) => ({
        id: r.id,
        name: r.name || "Unknown",
        email: r.email || "N/A", 
        phone: r.phone || "N/A",
        status: r.status || r.is_active ? 'active' : 'inactive',
      }));
    });

    const columns = [
      { name: "name", label: "Name", field: "name", align: "left" },
      { name: "email", label: "Email", field: "email", align: "left" },
      { name: "phone", label: "Phone", field: "phone", align: "left" },
      { name: "status", label: "Status", field: "status", align: "center" },
      { name: "actions", label: "Actions", align: "center" },
    ];

    const pagination = ref({ page: 1, rowsPerPage: 5 });
    const addRiderDialog = ref(false);

    const newRider = ref({
      name: "",
      email: "",
      phone: "",
      status: "active"
    });

    const openAddRiderDialog = () => {
      addRiderDialog.value = true;
    };

    const saveRider = async () => {
      if (newRider.value.name && newRider.value.email && newRider.value.phone) {
        try {
          loading.value = true;
          // API call through store action
          await store.dispatch("admin/createRider", newRider.value);
          
          // Reset form
          newRider.value = { name: "", email: "", phone: "", status: "active" };
          addRiderDialog.value = false;
          
          // Refresh data
          await fetchRiders();
        } catch (error) {
          console.error("Error saving rider:", error);
        } finally {
          loading.value = false;
        }
      }
    };

    const editRider = (rider) => {
      alert(`Edit Rider: ${rider.name}`);
    };

    const deleteRider = async (id) => {
      try {
        loading.value = true;
        await store.dispatch("admin/deleteRider", id);
        await fetchRiders(); // Refresh after delete
      } catch (error) {
        console.error("Error deleting rider:", error);
      } finally {
        loading.value = false;
      }
    };

    const fetchRiders = async () => {
      loading.value = true;
      try {
        await store.dispatch("admin/fetchRiders");
      } catch (error) {
        console.error("Error fetching riders:", error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchRiders();
    });

    return {
      riders,
      columns,
      pagination,
      addRiderDialog,
      newRider,
      loading,
      openAddRiderDialog,
      saveRider,
      editRider,
      deleteRider
    };
  },
};
</script>