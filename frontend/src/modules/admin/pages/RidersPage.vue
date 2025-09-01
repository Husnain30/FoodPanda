<template>
  <q-page padding>
    <!-- Header -->
    <div class="row q-mb-md">
      <div class="col">
        <h4 class="text-h4">Manage Riders</h4>
      </div>
      <div class="col-auto">
        <q-btn color="primary" label="Add Rider" @click="openAddRiderDialog" />
        <q-btn
          color="secondary"
          icon="refresh"
          label="Refresh"
          class="q-ml-sm"
          @click="refreshRiders"
        />
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
    <q-badge :color="getStatusColor(props.row.status)">
      {{ props.row.status }}
    </q-badge>
  </q-td>
</template>

     <template v-slot:body-cell-actions="props">
  <q-td align="center">
    <!-- Existing buttons -->
    <q-btn flat dense round color="primary" icon="edit" @click="editRider(props.row)" />
    <q-btn flat dense round color="negative" icon="delete" @click="deleteRider(props.row.id)" />
    
    <!-- New verify/reject buttons -->
    <q-btn 
      v-if="props.row.status !== 'verified'"
      flat dense round color="positive" icon="verified" 
      @click="verifyRider(props.row.id)" 
    />
    <q-btn 
      v-if="props.row.status !== 'rejected'"
      flat dense round color="warning" icon="block" 
      @click="rejectRider(props.row.id)" 
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
      <!-- Name -->
      <q-input v-model="newRider.name" label="Name" outlined />

      <!-- Email -->
      <q-input v-model="newRider.email" label="Email" outlined />

      <!-- Phone -->
      <q-input v-model="newRider.phone" label="Phone" outlined />

      <!-- Status -->
      <q-select
        v-model="newRider.status"
        :options="['active', 'inactive']"
        label="Status"
        outlined
      />

      <!-- Role (fixed as rider) -->
      <q-input
        v-model="newRider.role"
        label="Role"
        outlined
        disable
      />

      <!-- Password -->
      <q-input
        v-model="newRider.password"
        :type="showPassword ? 'text' : 'password'"
        label="Password"
        outlined
        lazy-rules
        :rules="[val => val && val.length >= 6 || 'Password must be at least 6 characters']"
      >
        <template v-slot:append>
          <q-icon
            :name="showPassword ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="showPassword = !showPassword"
          />
        </template>
      </q-input>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Cancel" v-close-popup />
      <q-btn color="primary" label="Save" @click="saveRider" />
    </q-card-actions>
  </q-card>
</q-dialog>
<!-- Edit Rider Dialog -->
<q-dialog v-model="editRiderDialog">
  <q-card style="min-width: 400px">
    <q-card-section>
      <div class="text-h6">Edit Rider</div>
    </q-card-section>

    <q-card-section>
      <!-- Name -->
      <q-input v-model="editingRider.name" label="Name" outlined />

      <!-- Email -->
      <q-input v-model="editingRider.email" label="Email" outlined />

      <!-- Phone -->
      <q-input v-model="editingRider.phone" label="Phone" outlined />

      <!-- Status -->
      <q-select
        v-model="editingRider.status"
        :options="['active', 'inactive']"
        label="Status"
        outlined
      />

      <!-- Role (fixed as rider) -->
      <q-input
        v-model="editingRider.role"
        label="Role"
        outlined
        disable
      />

      <!-- Password -->
      <q-input
        v-model="editingRider.password"
        :type="showPassword ? 'text' : 'password'"
        label="Password"
        outlined
        hint="Leave blank if you don’t want to change"
      >
        <template v-slot:append>
          <q-icon
            :name="showPassword ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="showPassword = !showPassword"
          />
        </template>
      </q-input>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Cancel" v-close-popup />
      <q-btn color="primary" label="Update" @click="updateRider" />
    </q-card-actions>
  </q-card>
</q-dialog>

  </q-page>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  name: "RidersPage",
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
      { name: "actions", label: "Actions", field: "actions", align: "center" },
    ];

    const pagination = ref({ page: 1, rowsPerPage: 5 });

    const addRiderDialog = ref(false);
    const showPassword = ref(false);
    const editRiderDialog = ref(false);

const newRider = ref({
  name: "",
  email: "",
  phone: "",
  status: "active",
  role: "rider",      // default role
  password: ""        // required by API
});
const editingRider = ref({
  id: null,
  name: "",
  email: "",
  phone: "",
  status: "active",
  role: "rider",
  password: "" // optional while editing
});

  

  const openAddRiderDialog = () => {
  newRider.value = {
    name: "",
    email: "",
    phone: "",
    status: "active",
    role: "rider",
    password: ""
  };
  addRiderDialog.value = true;
};
    const verifyRider = async (riderId) => {
  try {
    await store.dispatch("admin/verifyRider", riderId);
  } catch (error) {
    console.error("Error verifying rider:", error);
  }
};

const rejectRider = async (riderId) => {
  try {
    await store.dispatch("admin/rejectRider", riderId);
  } catch (error) {
    console.error("Error rejecting rider:", error);
  }
};

const getStatusColor = (status) => {
  switch(status) {
    case 'verified': return 'green';
    case 'rejected': return 'red';
    case 'active': return 'blue';
    default: return 'grey';
  }
};


    const saveRider = async () => {
      if (newRider.value.name && newRider.value.email && newRider.value.phone) {
        try {
          await store.dispatch("admin/createRider", newRider.value);
          addRiderDialog.value = false;
          newRider.value = { name: "", email: "", phone: "", status: "active" };
        } catch (error) {
          console.error("Error saving rider:", error);
        }
      }
    };

 const editRider = (rider) => {
  editingRider.value = { ...rider, password: "" }; // reset password so it's optional
  if (!editingRider.value.role) editingRider.value.role = "rider";
  editRiderDialog.value = true;
};

const updateRider = async () => {
  if (!editingRider.value.name || !editingRider.value.email) {
    console.error("Name and email are required");
    return;
  }

  try {
    await store.dispatch("admin/updateRider", {
      id: editingRider.value.id,
      riderData: editingRider.value
    });

    editRiderDialog.value = false;
    editingRider.value = {
      id: null,
      name: "",
      email: "",
      phone: "",
      status: "active",
      role: "rider",
      password: ""
    };

    // Refresh after update
    await refreshRiders();
  } catch (error) {
    console.error("Error updating rider:", error);
  }
};
    const deleteRider = async (id) => {
      try {
        await store.dispatch("admin/deleteRider", id);
      } catch (error) {
        console.error("Error deleting rider:", error);
      }
    };

    const refreshRiders = async () => {
      loading.value = true;
      try {
        await store.dispatch("admin/fetchRiders");
      } catch (error) {
        console.error("Error refreshing riders:", error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      refreshRiders();
    });

   return {
  riders,
  columns,
  pagination,
  addRiderDialog,
  editRiderDialog,
  newRider,
  editingRider,
  loading,
  showPassword,
  openAddRiderDialog,
  saveRider,
  editRider,
  updateRider,
  deleteRider,
  refreshRiders,
  verifyRider,
  rejectRider,
  getStatusColor,
};

  },
};
</script>