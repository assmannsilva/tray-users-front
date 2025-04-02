import './styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { vMaska } from 'maska/vue'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.directive('maska', vMaska);
app.mount('#app');
