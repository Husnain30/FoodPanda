<template>
  <q-card class="q-pa-md">
    <q-card-section>
      <div class="text-h6">Users List</div>
    </q-card-section>

    <q-table
      title="Users"
      :rows="rows"
      :columns="columns"
      row-key="id"
      flat
      bordered
    >
      <template v-slot:body-cell-actions="props">
        <q-td align="center">
          <q-btn dense flat round icon="edit" color="primary" @click="editUser(props.row)" />
          <q-btn dense flat round icon="delete" color="negative" @click="deleteUser(props.row)" />
        </q-td>
      </template>
    </q-table>
  </q-card>
</template>

<script>
export default {
  name: "UserTable",
  data() {
    return {
      columns: [
        { name: "id", label: "ID", field: "id", align: "left", sortable: true },
        { name: "name", label: "Name", field: "name", align: "left", sortable: true },
        { name: "email", label: "Email", field: "email", align: "left", sortable: true },
        { name: "role", label: "Role", field: "role", align: "left" },
        { name: "actions", label: "Actions", field: "actions", align: "center" },
      ],
      rows: [
        { id: 1, name: "Ali Khan", email: "ali@example.com", role: "Customer" },
        { id: 2, name: "Sara Ahmed", email: "sara@example.com", role: "Restaurant Owner" },
        { id: 3, name: "Usman Tariq", email: "usman@example.com", role: "Rider" },
      ],
    };
  },
  methods: {
    editUser(user) {
      this.$q.notify({ type: "info", message: `Edit User: ${user.name}` });
    },
    deleteUser(user) {
      this.$q.notify({ type: "negative", message: `Deleted User: ${user.name}` });
      this.rows = this.rows.filter(u => u.id !== user.id);
    },
  },
};
</script>
