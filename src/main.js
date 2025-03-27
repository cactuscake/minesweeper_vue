import { createApp, version } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

console.log('[VUE] Version:', version)

const app = createApp(App)

// Проверка перед монтированием
const rootEl = document.getElementById('app')
if (!rootEl) {
  console.error('Root element #app not found!')
  // Создаём элемент, если его нет
  const newEl = document.createElement('div')
  newEl.id = 'app'
  document.body.appendChild(newEl)
}

app.use(createPinia())
app.use(router)

// Отложенное монтирование для debug
setTimeout(() => {
  app.mount('#app')
  console.log('App mounted, DOM:', document.getElementById('app').innerHTML)
}, 100)