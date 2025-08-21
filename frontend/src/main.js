import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"

const app = createApp(App)

app.use(store)   // ✅ vuex inject hoga
app.use(router)

app.mount("#app")
