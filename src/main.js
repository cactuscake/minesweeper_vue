import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Импорт основных стилей (если есть)
//import './assets/main.css'

const app = createApp(App)

// Подключение Pinia (для управления состоянием)
app.use(createPinia())

// Подключение Vue Router
app.use(router)

// Монтируем приложение
app.mount('#app')