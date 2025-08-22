<template>
  <q-page padding>
    <!-- Header -->
    <div class="row q-mb-md">
      <div class="col">
        <h4 class="text-h4">Manage Restaurants</h4>
      </div>
      <div class="col-auto">
        <q-btn color="primary" label="Add Restaurant" @click="openAddDialog" />
      </div>
    </div>

    <!-- Restaurants Table -->
    <q-table
      :rows="restaurants"
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
            @click="editRestaurant(props.row)"
          />
          <q-btn
            flat
            dense
            round
            color="negative"
            icon="delete"
            @click="deleteRestaurant(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>

    <!-- Add Restaurant Dialog -->
    <q-dialog v-model="addDialog">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Add Restaurant</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="newRestaurant.name" label="Name" outlined />
          <q-input v-model="newRestaurant.owner" label="Owner" outlined />
          <q-input v-model="newRestaurant.location" label="Location" outlined />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn color="primary" label="Save" @click="saveRestaurant" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref } from "vue";

export default {
  name: "RestaurantsPage",
  setup() {
    const restaurants = ref([
      { id: 1, name: "Food Palace", owner: "Ali Khan", location: "Lahore" },
      { id: 2, name: "Pizza World", owner: "Ahmed Raza", location: "Karachi" },
    ]);

    const columns = [
      { name: "name", label: "Name", field: "name", align: "left" },
      { name: "owner", label: "Owner", field: "owner", align: "left" },
      { name: "location", label: "Location", field: "location", align: "left" },
      { name: "actions", label: "Actions", field: "actions", align: "center" },
    ];

    const pagination = ref({ page: 1, rowsPerPage: 5 });

    const addDialog = ref(false);
    const newRestaurant = ref({ name: "", owner: "", location: "" });

    const openAddDialog = () => {
      addDialog.value = true;
    };

    const saveRestaurant = () => {
      if (newRestaurant.value.name && newRestaurant.value.owner && newRestaurant.value.location) {
        restaurants.value.push({
          id: restaurants.value.length + 1,
          ...newRestaurant.value,
        });
        newRestaurant.value = { name: "", owner: "", location: "" };
        addDialog.value = false;
      }
    };

    const editRestaurant = (restaurant) => {
      alert(`Edit Restaurant: ${restaurant.name}`);
    };

    const deleteRestaurant = (id) => {
      restaurants.value = restaurants.value.filter((r) => r.id !== id);
    };

    return {
      restaurants,
      columns,
      pagination,
      addDialog,
      newRestaurant,
      openAddDialog,
      saveRestaurant,
      editRestaurant,
      deleteRestaurant,
    };
  },
};
</script>
