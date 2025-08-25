<template>
  <q-card class="q-pa-md">
    <q-card-section>
      <div class="text-h6">Riders List</div>
    </q-card-section>

    <q-table
      title="Riders"
      :rows="rows"
      :columns="columns"
      row-key="id"
      flat
      bordered
    >
      <template v-slot:body-cell-actions="props">
        <q-td align="center">
          <q-btn dense flat round icon="edit" color="primary" @click="editRider(props.row)" />
          <q-btn dense flat round icon="delete" color="negative" @click="deleteRider(props.row)" />
        </q-td>
      </template>
    </q-table>
  </q-card>
</template>

<script>
export default {
  name: "RiderTable",
  data() {
    return {
      columns: [
        { name: "id", label: "ID", field: "id", align: "left", sortable: true },
        { name: "name", label: "Name", field: "name", align: "left", sortable: true },
        { name: "phone", label: "Phone", field: "phone", align: "left" },
        { name: "status", label: "Status", field: "status", align: "left" },
        { name: "actions", label: "Actions", field: "actions", align: "center" },
      ],
      rows: [
        { id: 1, name: "Ali Khan", phone: "0300-1234567", status: "Available" },
        { id: 2, name: "Bilal Ahmed", phone: "0301-9876543", status: "On Delivery" },
        { id: 3, name: "Usman Tariq", phone: "0302-5678912", status: "Offline" },
      ],
    };
  },
  methods: {
    editRider(rider) {
      this.$q.notify({ type: "info", message: `Edit Rider: ${rider.name}` });
    },
    deleteRider(rider) {
      this.$q.notify({ type: "negative", message: `Deleted Rider: ${rider.name}` });
      this.rows = this.rows.filter(r => r.id !== rider.id);
    },
  },
};
</script>
