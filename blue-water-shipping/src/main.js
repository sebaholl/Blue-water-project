import './assets/main.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'

import en from './locales/en.json'
import da from './locales/da.json'

const savedLocale = localStorage.getItem('bws-locale') || 'en'

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: { en, da },
})

const app = createApp(App)

app.use(router)
app.use(i18n)

app.mount('#app')
