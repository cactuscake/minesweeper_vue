import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Отладочная информация
console.log('[DEBUG] Vue app initializing...')
console.log('[DEBUG] Vue version:', createApp.version)

// Проверка элемента перед монтированием
const mountElement = document.getElementById('app')
if (!mountElement) {
  console.error('[ERROR] Element #app not found!')
} else {
  console.log('[DEBUG] Mount element found:', mountElement)
}

// Инициализация Pinia
app.use(createPinia())

// Инициализация роутера
app.use(router)

// Монтирование с обработкой ошибок
try {
  app.mount('#app')
  console.log('[DEBUG] App successfully mounted')
} catch (error) {
  console.error('[ERROR] Mounting failed:', error)
}