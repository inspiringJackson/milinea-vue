<template>
	<n-menu :options="menuOptions" :theme-overrides="menuStyleOverrides" :default-value="defaultKey"
		@update:value="handleUpdateValue" :root-indent="parseInt(10)" />
</template>

<script setup lang="ts">
	import { h, ref, onMounted, watch } from 'vue'
	import { MenuOption, NIcon } from 'naive-ui'
	// import { useCanvasStore } from '../../../stores/useCanvasStore'

	const menuOptions = ref<MenuOption[]>([])
	const defaultKey = ref('')
	// const { pages, canvasManager } = useCanvasStore()
	// const store = useCanvasStore()

	const generateMenuOptions = (pages : Array<{ id : string; name : string; isOpening : boolean; layers : [] }>) => {
		return pages.map(page => ({
			label: () => h('div', {
				class: 'option-content',
				style: {
					height: '32px',
					width: '100%',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center'
				}
			}, [
				h('span', { class: 'menu-label' }, page.name),
				page.isOpening ? h(NIcon, { size: 16 }, () =>
					h('img', { src: 'src/assets/icons/check.svg', class: 'icon' })
				) : null
			]),
			key: page.id,
		}))
	}

	// watch(() => pages, (newPages) => {
	// 	if (newPages?.length) {
	// 		defaultKey.value = newPages[0].id
	// 		menuOptions.value = generateMenuOptions(newPages)
	// 	}
	// }, { immediate: true, deep: true })


	// const menuStyleOverrides = {
	// 	itemHeight: '32px'
	// }

	// const handleUpdateValue = (key : string) => {
	// 	pages.forEach((page) => {
	// 		page.isOpening = page.id === key
	// 		if (page.isOpening) {
	// 			store.layers = page.layers
	// 		}
	// 	})
	// 	store.canvasManager.render()
	// }
</script>

<style scoped lang="scss">
	.n-menu {
		height: 100%;

		.option-content {
			.icon {
				display: block;
				width: 16px;
				height: 16px;
			}
		}
	}
</style>