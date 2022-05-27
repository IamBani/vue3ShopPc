import { createApp } from "vue";
import { createPinia } from "pinia";
import element from "@/plugins/element/index";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from "./App.vue";
import router from "./router";
import "normalize.css";
import "./styles/common.less"

import './assets/font/iconfont.css'
import './assets/font/iconfont.js'

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)
const app = createApp(App);


app.use(element)
app.use(pinia);
app.use(router).mount("#app");
