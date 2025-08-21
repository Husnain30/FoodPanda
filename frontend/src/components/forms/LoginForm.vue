<template>
  <div class="login-page">
    <h2>Login</h2>
    <form @submit.prevent="onSubmit">
      <input v-model="form.email" type="text" placeholder="Email or Username" required />
      <input v-model="form.password" type="password" placeholder="Password" required />

      <!-- Role field -->
      <select v-model="form.role" required>
        <option disabled value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="restaurant">Restaurant</option>
        <option value="rider">Rider</option>
        <option value="customer">Customer</option>
      </select>

      <button type="submit">Login</button>
    </form>
    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const error = ref('')

const form = reactive({
  email: '',
  password: '',
  role: '',
})

const onSubmit = async () => {
  error.value = ''

  try {
    const user = await store.dispatch('auth/login', form)

    switch (user.role) {
      case 'admin':
        router.push('/admin/dashboard')
        break
      case 'restaurant':
        router.push('/restaurant/dashboard')
        break
      case 'rider':
        router.push('/rider/dashboard')
        break
      case 'customer':
        router.push('/restaurants') // 👈 customer landing page
        break
      default:
        router.push('/')
    }
  } catch (err) {
    console.error('Login error:', err)
    error.value = 'Invalid login credentials'
  }
}


</script>
