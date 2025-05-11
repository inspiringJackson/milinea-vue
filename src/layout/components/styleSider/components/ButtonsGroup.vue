<template>
	<n-config-provider :theme-overrides="themeOverrides">
		<n-button-group size="small">
			<n-tooltip placement="bottom" trigger="hover" v-for="(button, index) in buttons" :key="button.id">
				<template #trigger>
					<n-button type="default" @click="handleClick(button.id)">
						<template #icon>
							<n-icon size="28" class="icon">
								<img :src="button.iconUrl" :alt="button.name" />
							</n-icon>
						</template>
					</n-button>
				</template>
				{{button.name}}
			</n-tooltip>
		</n-button-group>
	</n-config-provider>
</template>

<script setup lang="ts">
	import { defineProps, defineEmits, ref, computed } from 'vue'
	import { useGlobalStore } from '../../../../stores/useGlobalStore'

	const store = useGlobalStore()

	const themeOverrides = computed(() => ({
		Button: {
			paddingTiny: '0 0',
			paddingSmall: '0 0',
			paddingMedium: '0 0',
			paddingLarge: '0 0',
			iconSizeTiny: '28px',
			iconSizeSmall: '28px',
			iconSizeMedium: '28px',
			iconSizeLarge: '28px',
			border: store.isDarkMode ? '1px solid rgb(24, 24, 28)' : '1px solid #fff',
			borderHover: store.isDarkMode ? '1px solid rgb(24, 24, 28)' : '1px solid #fff',
			borderPressed: store.isDarkMode ? '1px solid rgb(24, 24, 28)' : '1px solid #fff',
			borderFocus: store.isDarkMode ? '1px solid rgb(24, 24, 28)' : '1px solid #fff',
			rippleColor: 'none',
			color: store.isDarkMode ? "rgb(48, 48, 51)" : "rgb(247, 247, 250)",
			colorHover: store.isDarkMode ? "rgb(68, 68, 71)" : "rgb(227, 227, 230)",
			colorPressed: store.isDarkMode ? "rgb(48, 48, 51)" : "rgb(247, 247, 250)",
			colorFocus: store.isDarkMode ? "rgb(48, 48, 51)" : "rgb(247, 247, 250)",
		}
	}))

	const props = defineProps({
		buttons: {
			type: Array as () => Array<{ id : number, name : string, iconUrl : string }>,
			default: () => []
		}
	})

	const emit = defineEmits(['buttonClick'])

	const handleClick = (id : number) => {
		emit('buttonClick', id)
	}
</script>

<style scoped lang="scss">
	.icon {
		filter: var(--filter);
	}
</style>