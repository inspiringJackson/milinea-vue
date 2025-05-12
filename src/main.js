import {
	createApp
} from 'vue'
import App from './App.vue'
import en from './locales/en.json'
import zhCN from './locales/zh-CN.json'
import {
	createI18n
} from 'vue-i18n'
import {
	createPinia
} from 'pinia'
import { createVuetify } from 'vuetify'


const i18n = createI18n({
	legacy: false,
	locale: 'zh-CN',
	fallbackLocale: 'en',
	messages: {
		'en': en,
		'zh-CN': zhCN
	}
})

const pinia = createPinia()

const app = createApp(App)

const vuetify = createVuetify()

app.use(i18n)
app.use(pinia)
app.use(vuetify)

app.mount('#app')