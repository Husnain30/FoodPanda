<template>
  <q-page padding>
    <!-- Header -->
    <div class="row q-mb-md">
      <div class="col">
        <h4 class="text-h4">Manage Restaurants</h4>
      </div>
      <div class="col-auto">
        <q-btn color="primary" label="Add Restaurant" @click="openAddDialog" />
        <q-btn
          color="secondary"
          icon="refresh"
          label="Refresh"
          class="q-ml-sm"
          @click="refreshRestaurants"
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
          <q-badge :color="props.row.is_verified ? 'green' : 'red'">
            {{ props.row.is_verified ? 'Verified' : 'Pending' }}
          </q-badge>
        </q-td>
      </template>

      <template v-slot:body-cell-timing="props">
        <q-td>
          {{ props.row.opening_time }} - {{ props.row.closing_time }}
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
            @click="editRestaurant(props.row)"
          />
          <q-btn
            flat
            dense
            round
            color="negative"
            icon="delete"
            @click="confirmDelete(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>

    <!-- Add Restaurant Dialog -->
    <q-dialog v-model="addDialog" persistent>
      <q-card style="min-width: 500px">
        <q-card-section>
          <div class="text-h6">Add New Restaurant</div>
        </q-card-section>

        <q-card-section>
          <div class="row q-gutter-md">
            <div class="col-12">
              <q-input 
                v-model="newRestaurant.name" 
                label="Restaurant Name *" 
                outlined 
                :rules="[val => !!val || 'Name is required']"
              />
            </div>
            
            <div class="col-12 col-md-5">
              <q-input 
                v-model="newRestaurant.email" 
                label="Email *" 
                type="email"
                outlined 
                :rules="[
                  val => !!val || 'Email is required',
                  val => /.+@.+\..+/.test(val) || 'Email must be valid'
                ]"
              />
            </div>
            
            <div class="col-12 col-md-5">
              <q-input 
                v-model="newRestaurant.phone" 
                label="Phone *" 
                outlined 
                :rules="[val => !!val || 'Phone is required']"
              />
            </div>
            
            <div class="col-12">
              <q-input 
                v-model="newRestaurant.password" 
                label="Password *" 
                type="password"
                outlined 
                :rules="[
                  val => !!val || 'Password is required',
                  val => val.length >= 6 || 'Password must be at least 6 characters'
                ]"
              />
            </div>
            <div class="col-12">
  <q-input 
    v-model="newRestaurant.role" 
    label="Role" 
    outlined 
    readonly
    :rules="[val => !!val || 'Role is required']"
  />
</div>
            
            <div class="col-12">
              <q-input 
                v-model="newRestaurant.address" 
                label="Address *" 
                outlined 
                :rules="[val => !!val || 'Address is required']"
              />
            </div>
            
            <div class="col-12 col-md-5">
              <q-input 
                v-model="newRestaurant.cuisine_type" 
                label="Cuisine Type" 
                outlined 
              />
            </div>
            
            <div class="col-12 col-md-5">
              <q-input 
                v-model="newRestaurant.delivery_radius" 
                label="Delivery Radius (km)" 
                type="number"
                outlined 
              />
            </div>
            
            <div class="col-12 col-md-5">
              <q-input 
                v-model="newRestaurant.opening_time" 
                label="Opening Time" 
                type="time"
                outlined 
              />
            </div>
            
            <div class="col-12 col-md-5">
              <q-input 
                v-model="newRestaurant.closing_time" 
                label="Closing Time" 
                type="time"
                outlined 
              />
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
          <span class="q-ml-sm">Are you sure you want to delete this restaurant?</span>
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
  </q-page>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

export default {
  name: "RestaurantsPage",
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
        label: "Restaurant Name", 
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
      rowsPerPage: 10,
      sortBy: 'name',
      descending: false
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
  closing_time: "22:00",
  role: "restaurant"  // Add this line
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
    closing_time: "22:00",
    role: "restaurant"  // Add this line
  };
    };

   // Replace your saveRestaurant function with this:
const saveRestaurant = async () => {
  // Basic validation
  if (!newRestaurant.value.name || !newRestaurant.value.email || 
      !newRestaurant.value.phone || !newRestaurant.value.password || 
      !newRestaurant.value.address) {
    $q.notify({
      color: 'negative',
      message: 'Please fill all required fields',
      icon: 'warning'
    });
    return;
  }

  saving.value = true;
  try {
    // Use the users/register endpoint instead of admin/registerRestaurant
    await store.dispatch("admin/registerUser", newRestaurant.value);
    addDialog.value = false;
    resetForm();
    
    $q.notify({
      color: 'positive',
      message: 'Restaurant registered successfully',
      icon: 'check'
    });
    
    await refreshRestaurants();
  } catch (error) {
    console.error("Error registering restaurant:", error);
    $q.notify({
      color: 'negative',
      message: 'Failed to register restaurant',
      icon: 'error'
    });
  } finally {
    saving.value = false;
  }
};

    const editRestaurant = (restaurant) => {
      $q.notify({
        color: 'info',
        message: `Edit feature for ${restaurant.name} coming soon`,
        icon: 'info'
      });
    };

    const confirmDelete = (id) => {
      restaurantToDelete.value = id;
      deleteDialog.value = true;
    };

    const deleteRestaurant = async () => {
      if (!restaurantToDelete.value) return;
      
      deleting.value = true;
      try {
        await store.dispatch("admin/deleteRestaurant", restaurantToDelete.value);
        deleteDialog.value = false;
        restaurantToDelete.value = null;
        
        $q.notify({
          color: 'positive',
          message: 'Restaurant deleted successfully',
          icon: 'check'
        });
        
        await refreshRestaurants();
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

    const refreshRestaurants = async () => {
      loading.value = true;
      try {
        await store.dispatch("admin/fetchRestaurants");
      } catch (error) {
        console.error("Error refreshing restaurants:", error);
        $q.notify({
          color: 'negative',
          message: 'Failed to load restaurants',
          icon: 'error'
        });
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      refreshRestaurants();
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
      openAddDialog,
      saveRestaurant,
      editRestaurant,
      confirmDelete,
      deleteRestaurant,
      refreshRestaurants,
      resetForm,
    };
  },
};
</script>

<style scoped>
.q-table th {
  font-weight: bold;
}
</style>