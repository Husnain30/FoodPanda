// src/main.js
import { createApp } from 'vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import App from './App.vue'
import router from './router'
import store from './store' // Make sure this path is correct

const app = createApp(App)

app.use(Quasar, quasarUserOptions)
app.use(router)
app.use(store) // This should be after Quasar but before mounting

app.mount('#app')