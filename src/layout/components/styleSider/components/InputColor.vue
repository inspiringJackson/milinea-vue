<template>
	<n-config-provider :theme-overrides="themeOverrides">
		<n-input :value="modelValue" @update:value="handleValueUpdate" :default-value="defaultValue" :size="size">
			<template #prefix>
				<n-icon size="28" class="icon" @click="openColorPicker">
					<img :src="prefixIcon" class="prefix-icon" :alt="prefixHint" />
				</n-icon>
			</template>
			<template #suffix v-if="hasSuffix">
				{{ suffix }}
			</template>
		</n-input>
	</n-config-provider>
	<!-- <iframe v-if="showIframe" src="https://example.com" class="custom-iframe"></iframe> -->
</template>

<script setup lang="ts">
	import { defineProps, defineEmits, computed, ref } from 'vue'
	import { useGlobalStore } from '../../../../stores/useGlobalStore'
	import ColorPicker from './ColorPicker.vue'

	const store = useGlobalStore()

	const themeOverrides = computed(() => ({
		Input: {
			paddingTiny: "0 0",
			paddingSmall: "0 0",
			paddingMedium: "0 0",
			paddingLarge: "0 0",
			border: "none",
			borderHover: "none",
			// borderFocus: "none",
			boxShadowFocus: "none",
			caretColor: "none",
			color: store.isDarkMode ? "rgb(48, 48, 51)" : "rgb(247, 247, 250)"
		}
	}))

	const props = defineProps({
		modelValue: {
			type: Number,
			default: undefined
		},
		defaultValue: {
			type: Number,
			default: null,
		},
		size: {
			type: String,
			default: 'small',
			validator: (value : string) => ['tiny', 'small', 'medium', 'large'].includes(value)
		},
		prefixIcon: String,
		prefixHint: String,
		suffix: {
			type: String,
			default: ''
		},
		hasSuffix: Boolean
	})

	const emit = defineEmits(['update:modelValue'])

	const handleValueUpdate = (value : number | null) => {
		emit('update:modelValue', value ?? undefined)
	}

	const openColorPicker = () => {
		console.log('open color picker')
	}
</script>

<style scoped lang="scss">
</style>