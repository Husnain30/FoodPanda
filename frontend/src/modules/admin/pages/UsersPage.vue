<template>
  <q-page padding>
    <!-- Header -->
    <div class="row q-mb-md">
      <div class="col">
        <h4 class="text-h4">Users Management</h4>
      </div>
    </div>

    <!-- Users Table -->
    <UsersTable />
  </q-page>
</template>

<script >

import UsersTable from "../../admin/components/UsersTable.vue"

export default {
  name: "UsersPage",
  components: {
    UsersTable,
  },
};
</script>
