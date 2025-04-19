import {
	createApp
} from 'vue'
import App from './App.vue'
import en from './locales/en.json'
import zhCN from './locales/zh-CN.json'
import {
	createI18n
} from 'vue-i18n'

const i18n = createI18n({
	legacy: false,
	locale: 'zh-CN',
	fallbackLocale: 'en',
	messages: {
		'en': en,
		'zh-CN': zhCN
	}
})

const app = createApp(App)

app.use(i18n)

app.mount('#app')