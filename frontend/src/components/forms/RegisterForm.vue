<template>
  <q-card class="q-pa-lg shadow-3 register-card">
    <q-card-section>
      <div class="text-h6 text-center text-primary">Sign Up</div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <q-form @submit.prevent="onSubmit" class="q-gutter-md">

        <!-- Name -->
        <q-input v-model="form.name" label="Full Name" outlined dense required />

        <!-- Email -->
        <q-input v-model="form.email" type="email" label="Email" outlined dense required />

        <!-- Password -->
        <q-input v-model="form.password" type="password" label="Password" outlined dense required />

        <!-- Role Selection -->
        <q-select
          v-model="form.role"
          :options="roles"
          label="Sign up as"
          outlined dense required
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section avatar>
                <img :src="scope.opt.icon" alt="role-icon" width="24" height="24" />
              </q-item-section>
              <q-item-section>{{ scope.opt.label }}</q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-btn type="submit" label="Create Account" color="primary" class="full-width q-mt-md" />
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "RegisterForm",
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        role: null,
      },
      roles: [
        { label: "Customer", value: "customer", icon: "/src/assets/logos/customer-icon.svg" },
        { label: "Restaurant Owner", value: "restaurant", icon: "/src/assets/logos/restaurant-icon.svg" },
        { label: "Rider", value: "rider", icon: "/src/assets/logos/rider-icon.svg" },
        { label: "Admin", value: "admin", icon: "/src/assets/logos/admin-icon.svg" },
      ],
    };
  },
  methods: {
    onSubmit() {
      console.log("Register form submitted:", this.form);
      // TODO: Call API with axios (src/boot/axios.js)
      this.$emit("registered", this.form);
    },
  },
};
</script>

<style scoped>
.register-card {
  max-width: 400px;
  margin: auto;
  border-radius: 12px;
}
</style>
