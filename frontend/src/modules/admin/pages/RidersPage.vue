<template>
  <q-page padding>
    <!-- Header -->
    <div class="row q-mb-md">
      <div class="col">
        <h4 class="text-h4">Manage Riders</h4>
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
      v-model:pagination="pagination"
    >
      <template v-slot:body-cell-actions="props">
        <q-td align="center">
          <q-btn
            flat
            dense
            round
            color="primary"
            icon="edit"
            @click="editRider(props.row)"
          />
          <q-btn
            flat
            dense
            round
            color="negative"
            icon="delete"
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
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn color="primary" label="Save" @click="saveRider" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref } from "vue";

export default {
  name: "RidersPage",
  setup() {
    const riders = ref([
      { id: 1, name: "Ali Khan", email: "ali@example.com", phone: "0300-1234567" },
      { id: 2, name: "Ahmed Raza", email: "ahmed@example.com", phone: "0301-9876543" },
    ]);

    const columns = [
      { name: "name", label: "Name", field: "name", align: "left" },
      { name: "email", label: "Email", field: "email", align: "left" },
      { name: "phone", label: "Phone", field: "phone", align: "left" },
      { name: "actions", label: "Actions", field: "actions", align: "center" },
    ];

    const pagination = ref({ page: 1, rowsPerPage: 5 });

    const addRiderDialog = ref(false);
    const newRider = ref({ name: "", email: "", phone: "" });

    const openAddRiderDialog = () => {
      addRiderDialog.value = true;
    };

    const saveRider = () => {
      if (newRider.value.name && newRider.value.email && newRider.value.phone) {
        riders.value.push({
          id: riders.value.length + 1,
          ...newRider.value,
        });
        newRider.value = { name: "", email: "", phone: "" };
        addRiderDialog.value = false;
      }
    };

    const editRider = (rider) => {
      // abhi simple alert, baad me edit dialog bana sakte ho
      alert(`Edit Rider: ${rider.name}`);
    };

    const deleteRider = (id) => {
      riders.value = riders.value.filter((r) => r.id !== id);
    };

    return {
      riders,
      columns,
      pagination,
      addRiderDialog,
      newRider,
      openAddRiderDialog,
      saveRider,
      editRider,
      deleteRider,
    };
  },
};
</script>
