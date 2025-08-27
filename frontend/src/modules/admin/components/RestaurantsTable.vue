<template>
  <div>
    <!-- Header -->
    <div class="row q-mb-md">
      <div class="col">
        <h5 class="text-h5">Restaurants List</h5>
      </div>
      <div class="col-auto">
        <q-btn color="primary" label="Add Restaurant" @click="openAddDialog" />
        <q-btn
          color="secondary"
          icon="refresh"
          label="Refresh"
          class="q-ml-sm"
          @click="fetchRestaurants"
        />
      </div>
    </div>

    <!-- Restaurants Table -->
    <q-table
      :rows="restaurants"
      :columns="columns"
      row-key="id"
      flat
      bordered
      :loading="loading"
      v-model:pagination="pagination"
    >
      <template v-slot:body-cell-status="props">
        <q-td>
          <q-badge :color="props.row.is_verified ? 'green' : 'orange'">
            {{ props.row.is_verified ? 'Verified' : 'Pending' }}
          </q-badge>
        </q-td>
      </template>

      <template v-slot:body-cell-timing="props">
        <q-td>
          <div class="text-caption">
            {{ formatTime(props.row.opening_time) }} - {{ formatTime(props.row.closing_time) }}
          </div>
        </q-td>
      </template>
       
      <template v-slot:body-cell-actions="props">
        <q-td align="center">
          <q-btn
            flat dense round color="primary" icon="edit"
            @click="editRestaurant(props.row)"
            size="sm"
          />
          <q-btn
            flat dense round color="negative" icon="delete"
            @click="confirmDelete(props.row)"
            size="sm"
            class="q-ml-xs"
          />
        </q-td>
      </template>
    </q-table>

    <!-- Add Restaurant Dialog -->
    <q-dialog v-model="addDialog" persistent>
      <q-card style="min-width: 450px">
        <q-card-section>
          <div class="text-h6">Add New Restaurant</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="column q-gutter-md">
            <q-input 
              v-model="newRestaurant.name" 
              label="Restaurant Name *" 
              outlined 
              dense
            />
            
            <div class="row q-gutter-md">
              <div class="col">
                <q-input 
                  v-model="newRestaurant.email" 
                  label="Email *" 
                  type="email"
                  outlined 
                  dense
                />
              </div>
              <div class="col">
                <q-input 
                  v-model="newRestaurant.phone" 
                  label="Phone *" 
                  outlined 
                  dense
                />
              </div>
            </div>
            
            <q-input 
              v-model="newRestaurant.password" 
              label="Password *" 
              type="password"
              outlined 
              dense
            />
            
            <q-input 
              v-model="newRestaurant.address" 
              label="Address *" 
              outlined 
              dense
            />
            
            <div class="row q-gutter-md">
              <div class="col">
                <q-input 
                  v-model="newRestaurant.cuisine_type" 
                  label="Cuisine Type" 
                  outlined 
                  dense
                />
              </div>
              <div class="col">
                <q-input 
                  v-model="newRestaurant.delivery_radius" 
                  label="Delivery Radius (km)" 
                  type="number"
                  outlined 
                  dense
                />
              </div>
            </div>
            
            <div class="row q-gutter-md">
              <div class="col">
                <q-input 
                  v-model="newRestaurant.opening_time" 
                  label="Opening Time" 
                  type="time"
                  outlined 
                  dense
                />
              </div>
              <div class="col">
                <q-input 
                  v-model="newRestaurant.closing_time" 
                  label="Closing Time" 
                  type="time"
                  outlined 
                  dense
                />
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup @click="resetForm" />
          <q-btn 
            color="primary" 
            label="Save" 
            @click="saveRestaurant" 
            :loading="saving"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Delete Confirmation Dialog -->
    <q-dialog v-model="deleteDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="negative" text-color="white" />
          <span class="q-ml-sm">
            Are you sure you want to delete "{{ restaurantToDelete?.name }}"?
          </span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn 
            flat 
            label="Delete" 
            color="negative" 
            @click="deleteRestaurant"
            :loading="deleting"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

export default {
  name: "RestaurantsTable",
  setup() {
    const store = useStore();
    const $q = useQuasar();
    const loading = ref(false);
    const saving = ref(false);
    const deleting = ref(false);
    const deleteDialog = ref(false);
    const restaurantToDelete = ref(null);

    // Get restaurants from store
    const restaurants = computed(() => {
      return store.getters["admin/restaurants"] || [];
    });

    const columns = [
      { 
        name: "name", 
        label: "Name", 
        field: "name", 
        align: "left",
        sortable: true
      },
      { 
        name: "email", 
        label: "Email", 
        field: "email", 
        align: "left"
      },
      { 
        name: "phone", 
        label: "Phone", 
        field: "phone", 
        align: "left"
      },
      { 
        name: "address", 
        label: "Address", 
        field: "address", 
        align: "left"
      },
      { 
        name: "cuisine_type", 
        label: "Cuisine", 
        field: "cuisine_type", 
        align: "center"
      },
      { 
        name: "timing", 
        label: "Timing", 
        align: "center"
      },
      { 
        name: "status", 
        label: "Status", 
        align: "center"
      },
      { 
        name: "actions", 
        label: "Actions", 
        align: "center"
      },
    ];

    const pagination = ref({ 
      page: 1, 
      rowsPerPage: 8
    });

    const addDialog = ref(false);
    const newRestaurant = ref({
      name: "",
      email: "",
      phone: "",
      password: "",
      address: "",
      cuisine_type: "",
      delivery_radius: "10",
      opening_time: "09:00",
      closing_time: "22:00"
    });

    const openAddDialog = () => {
      resetForm();
      addDialog.value = true;
    };

    const resetForm = () => {
      newRestaurant.value = {
        name: "",
        email: "",
        phone: "",
        password: "",
        address: "",
        cuisine_type: "",
        delivery_radius: "10",
        opening_time: "09:00",
        closing_time: "22:00"
      };
    };

    const saveRestaurant = async () => {
      // Validate required fields
      if (!newRestaurant.value.name?.trim()) {
        $q.notify({
          color: 'negative',
          message: 'Restaurant name is required',
          icon: 'warning'
        });
        return;
      }

      if (!newRestaurant.value.email?.trim()) {
        $q.notify({
          color: 'negative',
          message: 'Email is required',
          icon: 'warning'
        });
        return;
      }

      if (!newRestaurant.value.phone?.trim()) {
        $q.notify({
          color: 'negative',
          message: 'Phone is required',
          icon: 'warning'
        });
        return;
      }

      if (!newRestaurant.value.password?.trim()) {
        $q.notify({
          color: 'negative',
          message: 'Password is required',
          icon: 'warning'
        });
        return;
      }

      if (newRestaurant.value.password.length < 6) {
        $q.notify({
          color: 'negative',
          message: 'Password must be at least 6 characters',
          icon: 'warning'
        });
        return;
      }

      if (!newRestaurant.value.address?.trim()) {
        $q.notify({
          color: 'negative',
          message: 'Address is required',
          icon: 'warning'
        });
        return;
      }

      saving.value = true;
      try {
        await store.dispatch("admin/registerRestaurant", newRestaurant.value);
        addDialog.value = false;
        resetForm();
        
        $q.notify({
          color: 'positive',
          message: 'Restaurant registered successfully',
          icon: 'check'
        });
        
        // Refresh data
        await fetchRestaurants();
      } catch (error) {
        console.error("Error registering restaurant:", error);
        $q.notify({
          color: 'negative',
          message: error.message || 'Failed to register restaurant',
          icon: 'error'
        });
      } finally {
        saving.value = false;
      }
    };

    const editRestaurant = (restaurant) => {
      $q.notify({
        color: 'info',
        message: `Edit functionality for "${restaurant.name}" will be implemented soon`,
        icon: 'info'
      });
    };

    const confirmDelete = (restaurant) => {
      restaurantToDelete.value = restaurant;
      deleteDialog.value = true;
    };

    const deleteRestaurant = async () => {
      if (!restaurantToDelete.value) return;
      
      deleting.value = true;
      try {
        await store.dispatch("admin/deleteRestaurant", restaurantToDelete.value.id);
        deleteDialog.value = false;
        restaurantToDelete.value = null;
        
        $q.notify({
          color: 'positive',
          message: 'Restaurant deleted successfully',
          icon: 'check'
        });
        
        // Refresh after delete
        await fetchRestaurants();
      } catch (error) {
        console.error("Error deleting restaurant:", error);
        $q.notify({
          color: 'negative',
          message: 'Failed to delete restaurant',
          icon: 'error'
        });
      } finally {
        deleting.value = false;
      }
    };

    const fetchRestaurants = async () => {
      loading.value = true;
      try {
        await store.dispatch("admin/fetchRestaurants");
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        $q.notify({
          color: 'negative',
          message: 'Failed to load restaurants',
          icon: 'error'
        });
      } finally {
        loading.value = false;
      }
    };

    const formatTime = (timeStr) => {
      if (!timeStr) return 'N/A';
      
      // Handle HH:MM:SS format
      const timeParts = timeStr.split(':');
      if (timeParts.length >= 2) {
        const hours = parseInt(timeParts[0]);
        const minutes = timeParts[1];
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        return `${displayHours}:${minutes} ${ampm}`;
      }
      
      return timeStr;
    };

    onMounted(() => {
      fetchRestaurants();
    });

    return {
      restaurants, 
      columns, 
      pagination,
      addDialog, 
      newRestaurant,
      loading,
      saving,
      deleting,
      deleteDialog,
      restaurantToDelete,
      openAddDialog, 
      saveRestaurant,
      editRestaurant, 
      confirmDelete,
      deleteRestaurant,
      fetchRestaurants,
      resetForm,
      formatTime
    };
  },
};
</script>

<style scoped>
.q-table th {
  font-weight: bold;
}

.text-caption {
  font-size: 0.75rem;
}
</style>