<template>
  <div class="register-page">
    <h2>Register</h2>
    <form @submit.prevent="onSubmit">
      <input v-model="form.name" placeholder="Name" required />
      <input v-model="form.email" type="email" placeholder="Email" required />
      <input v-model="form.password" type="password" placeholder="Password" required />
      <select v-model="form.role" required>
        <option disabled value="">Select Role</option>
        <option value="customer">Customer</option>
        <option value="restaurant">Restaurant</option>
        <option value="rider">Rider</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Register</button>
    </form>
    <p v-if="error" style="color:red">{{ error }}</p>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"

const store = useStore()
const router = useRouter()
const error = ref("")

const form = reactive({
  name: "",
  email: "",
  password: "",
  role: ""
})

const onSubmit = async () => {
  error.value = ""
  try {
    await store.dispatch("auth/register", form)
    router.push("/auth/login")
  } catch (err) {
    error.value = err
  }
}
</script>
