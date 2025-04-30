<template>
	<div class="navbar">
		<div class="leftMenu">
			<n-button text>
				<template #icon>
					<n-icon size="30">
						<img src="./../../assets/icons/menu.svg" alt="menu">
					</n-icon>
				</template>
			</n-button>
			<n-divider vertical></n-divider>
			<div class="zoomButtonPanel">
				<div class="zoomNum">%</div>
				<n-icon size="16">
					<img style="rotate: 0deg;" src="./../../assets/icons/menuArrow.svg" alt="preferencesMenu">
				</n-icon>
			</div>
		</div>

		<div class="rightMenu">
			<n-dropdown trigger="click" :options="languageOptions" @select="handleLanguageSelect">
				<n-button quaternary type="primary">
					<template #icon>
						<n-icon size="20">
							<img src="src/assets/icons/language.svg" alt="language">
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
	// import { useCanvasStore } from '../../stores/useCanvasStore'

	const {
		locale,
		t
	} = useI18n()

	onMounted(() => {
		const savedLocale = localStorage.getItem('locale')
		if (savedLocale) {
			locale.value = savedLocale
		}
	})

	const languageOptions = [{
			label: t('language.zh'),
			key: 'zh-CN'
		},
		{
			label: t('language.en'),
			key: 'en'
		}
	]

	const currentLanguageLabel = computed(() => {
		return locale.value === 'zh-CN' ? t('language.zh') : t('language.en')
	})

	const handleLanguageSelect = (key) => {
		locale.value = key
		localStorage.setItem('locale', key)
	}
</script>

<style scoped lang="scss">
	.navbar {
		height: 48px;
		padding: 0 8px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		/* 左右分开 */
		border-bottom: 1px solid #eee;

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
					color: #000;
				}
			}
		}

		.rightMenu {
			display: flex;
			align-items: center;

			.language-label {
				margin-left: 4px;
				font-size: 14px;
			}
		}

		.n-button {
			width: auto;
			height: 30px;
			padding: 0 8px;
		}
	}
</style>