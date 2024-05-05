import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import cartData from './cartData'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.provide('cartData', cartData)

app.mount('#app')
