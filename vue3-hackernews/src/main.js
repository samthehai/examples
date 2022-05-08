import { createApp } from "vue";
import { createStore } from './store'
import { createRouter } from './router'
import App from "./App.vue";

const router = createRouter()
const store = createStore(router)

const app = createApp(App)

app.use(store)
app.use(router)

app.mount("#app");
