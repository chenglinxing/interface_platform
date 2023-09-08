import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router"
import pinia from "./store"
import 'normalize.css'
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import "./mock/index"

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(pinia)
app.mount('#app')
