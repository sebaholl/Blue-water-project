import './assets/main.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import { createHead } from '@unhead/vue/client'

import en from './locales/en.json'
import da from './locales/da.json'

const savedLocale = localStorage.getItem('bws-locale') || 'en' // app loads this file runs

const i18n = createI18n({
  legacy: false, // which language to start with 
  locale: savedLocale,
  fallbackLocale: 'en', //  fall back to english
  messages: { en, da }, // two dictionaries 
})

const app = createApp(App)

const head = createHead()

app.use(head)

app.use(router)
app.use(i18n) // installs it into the whole app

app.mount('#app')
