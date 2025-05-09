<!-- // src/layout/components/Navbar.vue -->
<template>
	<div class="navbar">
		<div class="leftMenu">
			<n-dropdown trigger="click" :options="menuOptions" @select="handleMenuSelect">
				<n-button text>
					<template #icon>
						<n-icon size="30">
							<img src="./../../assets/icons/menu.svg" class="icon" alt="menu">
						</n-icon>
					</template>
				</n-button>
			</n-dropdown>
			<n-divider vertical></n-divider>
			<div class="zoomButtonPanel">
				<div class="zoomNum">{{ Math.round(usePaperStore().zoomScale * 100) }}%</div>
				<n-icon size="16">
					<img style="rotate: 0deg;" src="./../../assets/icons/menuArrow.svg" class="icon"
						alt="preferencesMenu">
				</n-icon>
			</div>
		</div>

		<div class="rightMenu">
			<n-switch v-model:value="isDarkMode" size="medium" @update:value="toggleTheme" class="theme-switch">
				<template #icon>
					{{ themeIcon }}
				</template>
			</n-switch>
			<n-dropdown trigger="click" :options="languageOptions" @select="handleLanguageSelect">
				<n-button quaternary type="primary">
					<template #icon>
						<n-icon size="20">
							<img src="src/assets/icons/language.svg" class="icon" alt="language">
						</n-icon>
					</template>
					<span class="language-label">{{ currentLanguageLabel }}</span>
				</n-button>
			</n-dropdown>
		</div>
	</div>
</template>

<script setup>
	import {
		ref,
		computed,
		onMounted
	} from 'vue'
	import {
		useI18n
	} from 'vue-i18n'
	import {
		usePaperStore
	} from '../../stores/usePaperStore'
	import {
		useGlobalStore
	} from '../../stores/useGlobalStore'
	import { useMessage } from 'naive-ui'

	const {
		locale,
		t
	} = useI18n()

	const props = defineProps({
		theme: {
			type: String,
			default: 'light'
		}
	})

	const globalStore = useGlobalStore()
	const paperStore = usePaperStore()
	const message = useMessage()

	const isDarkMode = computed(() => globalStore.isDarkMode)
	const themeIcon = computed(() => isDarkMode.value ? '🌙' : '☀️')

	onMounted(() => {
		const savedLocale = localStorage.getItem('locale')
		if (savedLocale) {
			locale.value = savedLocale
		}

		const savedTheme = globalStore.theme || 'dark'
		isDarkMode.value = savedTheme === 'dark'
	})

	const languageOptions = computed(() => {
		return [{
				label: t('language.zh'),
				key: 'zh-CN'
			},
			{
				label: t('language.en'),
				key: 'en'
			},
		]
	})

	const menuOptions = computed(() => {
		return [{
			label: t('menu.file'),
			key: 'file',
			children: [{
				label: t('menu-file.placeImage'),
				key: 'placeImage'
			}]
		}, ]
	})

	const currentLanguageLabel = computed(() => {
		return locale.value === 'zh-CN' ? t('language.zh') : t('language.en')
	})

	const handleMenuSelect = async (key) => {
		switch (key) {
			case 'placeImage':
				await openImagePicker()
				break
			default:
				break
		}
	}

	const handleLanguageSelect = (key) => {
		locale.value = key
		localStorage.setItem('locale', key)
	}

	const toggleTheme = () => {
		globalStore.toggleTheme()
	}

	const openImagePicker = () => {
		return new Promise((resolve) => {
			const input = document.createElement('input')
			input.type = 'file'
			input.accept = '.png,.jpg,.jpeg,.svg,.bmp,.webp,.ico'
			input.multiple = false

			input.onchange = (e) => {
				const file = e.target.files[0]
				if (!file) return resolve()

				const validTypes = [
					'image/png', 'image/jpeg', 'image/svg+xml',
					'image/bmp', 'image/webp', 'image/x-icon'
				]

				if (!validTypes.includes(file.type)) {
					message.error(t('error.invalidImageFormat'))
					return resolve()
				}

				// 创建临时URL并处理图片
				const imageUrl = URL.createObjectURL(file)
				paperStore.handleImageUpload(imageUrl, file.name)
				resolve()
			}

			// 触发文件选择
			input.click()
		})
	}
</script>

<style scoped lang="scss">
	.icon {
		filter: var(--filter);
	}

	.navbar {
		height: 48px;
		padding: 0 8px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		/* 左右分开 */
		border-bottom: 1px solid var(--border-color);
		transition: border-bottom 0.3s, color 0.3s;

		.leftMenu {
			display: flex;
			align-items: center;

			.zoomButtonPanel {
				display: flex;
				align-items: center;
				margin-left: 10px;
				cursor: pointer;

				.zoomNum {
					margin-left: 5px;
					font-size: 12px;
					line-height: 16px;
					color: var(--text-color);
				}
			}
		}

		.rightMenu {
			display: flex;
			align-items: center;
			gap: 12px;

			.language-label {
				margin-left: 4px;
				font-size: 14px;
			}

			.theme-switch {
				font-family: 'Helvetica';
				--n-handle-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
			}
		}

		.n-button {
			width: auto;
			height: 30px;
			padding: 0 8px;
		}
	}
</style>