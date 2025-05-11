<template>
	<n-config-provider :theme-overrides="themeOverrides">
		<n-input-number :value="modelValue" @update:value="handleValueUpdate" :default-value="defaultValue" :min="min"
			:max="max" :step="step" :size="size" :show-button="false">
			<template #prefix v-if="hasPrefix">
				<n-tooltip placement="bottom" trigger="hover">
					<template #trigger>
						<n-icon size="28" class="icon" @mousedown="handleDragStart">
							<img :src="prefixIcon" class="prefix-icon" :alt="prefixHint" />
						</n-icon>
					</template>
					{{prefixHint}}
				</n-tooltip>
			</template>
			<template #suffix v-if="hasSuffix">
				{{ suffix }}
			</template>
		</n-input-number>
	</n-config-provider>

</template>

<script setup lang="ts">
	import { defineProps, defineEmits, computed, ref } from 'vue'
	import { useGlobalStore } from '../../../../stores/useGlobalStore'

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
		min: {
			type: Number,
			default: undefined,
		},
		max: {
			type: Number,
			default: undefined,
		},
		step: {
			type: Number,
			default: 1
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
		hasPrefix: Boolean,
		hasSuffix: Boolean
	})

	const emit = defineEmits(['update:modelValue'])

	const handleValueUpdate = (value : number | null) => {
		emit('update:modelValue', value ?? undefined)
	}

	const dragStartX = ref(0)
	const isDragging = ref(false)
	const lastDeltaX = ref(0)

	const handleDragStart = (e : MouseEvent) => {
		e.preventDefault()
		dragStartX.value = e.clientX
		isDragging.value = true

		window.addEventListener('mousemove', handleDragMove)
		window.addEventListener('mouseup', handleDragEnd)
	}

	const handleDragMove = (e : MouseEvent) => {
		if (!isDragging.value) return

		const deltaX = e.clientX - dragStartX.value
		const sensitivity = 1

		if (Math.abs(deltaX - lastDeltaX.value) >= sensitivity) {
			const newValue = (props.modelValue || 0) + (deltaX > 0 ? 1 : -1)

			if (props.max !== undefined && newValue > props.max) return
			if (props.min !== undefined && newValue < props.min) return

			handleValueUpdate(newValue)
			lastDeltaX.value = deltaX
			dragStartX.value = e.clientX
		}
	}

	const handleDragEnd = () => {
		isDragging.value = false
		lastDeltaX.value = 0
		window.removeEventListener('mousemove', handleDragMove)
		window.removeEventListener('mouseup', handleDragEnd)
	}
</script>

<style scoped lang="scss">
	.icon {
		filter: var(--base-icon-filter);
		cursor: ew-resize;
	}
</style>