// src/stores/useGlobalStore.ts
import { defineStore } from "pinia"
import { usePaperStore } from "./usePaperStore"

export const useGlobalStore = defineStore("global", {
	state: () => ({
		isDarkMode: false
	}),
	actions: {
		init() {
			const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
			const savedTheme = localStorage.getItem('theme')

			if (savedTheme) {
				this.isDarkMode = savedTheme === 'dark'
			} else {
				this.isDarkMode = systemDark
			}

			this.applyTheme()
		},
		toggleTheme() {
			this.isDarkMode = !this.isDarkMode
			this.applyTheme()
		},
		applyTheme() {
			const theme = this.isDarkMode ? 'dark' : 'light'
			document.documentElement.setAttribute('data-theme', theme)
			usePaperStore().renderEngine.updateRender()
			localStorage.setItem('theme', theme)
		}
	}
})