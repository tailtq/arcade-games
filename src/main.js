import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Set global window variables
window.EJS_AdSize = ["800px", "500px"]
window.baseURL = '/arcade-games'
window.emulatorJSPath = 'libraries/emulatorjs/4.2.3'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
