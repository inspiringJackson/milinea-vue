<template>
	<n-config-provider :theme-overrides="themeOverrides">
		<n-tabs type="segment" size="small" animated @update:value="$emit('update:modelValue', $event)">
			<n-tab-pane :name="button.id" v-for="(button, index) in buttons" :key="button.id">
				<template #tab>
					<n-tooltip placement="bottom" trigger="hover">
						<template #trigger>
							<n-icon size="22" class="icon"
								:style="{ filter: modelValue === button.id ? 'var(--filter)' : 'var(--base-icon-filter)' }">
								<img :src="button.iconUrl" :alt="button.name" />
							</n-icon>
						</template>
						{{button.name}}
					</n-tooltip>
				</template>
			</n-tab-pane>
		</n-tabs>
	</n-config-provider>
</template>

<script setup lang="ts">
	import { defineProps, defineEmits } from 'vue'

	const themeOverrides = {
		Tabs: {
			tabPaddingSmallSegment: "0 0",
			tabPaddingMediumSegment: "0 0",
			tabPaddingLargeSegment: "0 0"
		}
	}

	const props = defineProps({
		buttons: {
			type: Array as () => Array<{ id : number, name : string, iconUrl : string }>,
			default: () => []
		},
		modelValue: {
			type: Number,
			default: 0
		}
	})

	const emit = defineEmits(['update:modelValue'])
</script>

<style scoped lang="scss">
	.icon {
		filter: var(--base-icon-filter);
	}
</style>