<template>
  <q-card class="q-pa-lg shadow-3 login-card">
    <q-card-section>
      <div class="text-h6 text-center text-primary">Log In</div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <q-form @submit.prevent="onSubmit" class="q-gutter-md">

        <!-- Email -->
        <q-input v-model="form.email" type="email" label="Email" outlined dense required />

        <!-- Password -->
        <q-input v-model="form.password" type="password" label="Password" outlined dense required />

        <!-- Role -->
        <q-select
          v-model="form.role"
          :options="roles"
          label="Login as"
          outlined dense required
        />

        <q-btn type="submit" label="Log In" color="primary" class="full-width q-mt-md" />
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      form: {
        email: "",
        password: "",
        role: null,
      },
      roles: [
        { label: "Customer", value: "customer" },
        { label: "Restaurant Owner", value: "restaurant" },
        { label: "Rider", value: "rider" },
        { label: "Admin", value: "admin" },
      ],
    };
  },
  methods: {
    onSubmit() {
      console.log("Login form submitted:", this.form);
      // TODO: Call API with axios (src/boot/axios.js)
      this.$emit("logged-in", this.form);
    },
  },
};
</script>

<style scoped>
.login-card {
  max-width: 400px;
  margin: auto;
  border-radius: 12px;
}
</style>
