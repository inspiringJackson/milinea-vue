<template>
	<n-config-provider :theme-overrides="themeOverrides">
		<n-input :value="modelValue" @update:value="handleValueUpdate" type="text" :default-value="defaultValue"
			:size="size">
			<template #prefix>
				<div class="colorBox" :alt="currentColor" @click="handleShowPanel">
					<div class="colorBlock" :style="{background: currentColor}"></div>
				</div>
			</template>
			<template #suffix v-if="hasSuffix">
				{{ suffix }}
			</template>
		</n-input>
		<DraggablePanel ref="panelRef" :title="t('fill.title')">
			<ButtonsRadioGroup v-model="selectedTabButtonId" :buttons="tabButtons"></ButtonsRadioGroup>
			<v-color-picker canvas-height="200" width="200" hide-inputs @update:modelValue="handleColorChange">

			</v-color-picker>
		</DraggablePanel>
	</n-config-provider>
	<!-- <iframe v-if="showIframe" src="https://example.com" class="custom-iframe"></iframe> -->
</template>

<script setup lang="ts">
	import { defineProps, defineEmits, computed, ref, watch } from 'vue'
	import { useI18n } from 'vue-i18n'
	import { VColorPicker } from 'vuetify/components/VColorPicker'
	import { useGlobalStore } from '../../../../stores/useGlobalStore'
	import ButtonsRadioGroup from './ButtonsRadioGroup.vue'
	import DraggablePanel from './DraggablePanel.vue'

	const store = useGlobalStore()
	const { t } = useI18n()

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
			type: String,
			default: undefined
		},
		defaultValue: {
			type: String,
			default: null,
		},
		size: {
			type: String,
			default: 'small',
			validator: (value : string) => ['tiny', 'small', 'medium', 'large'].includes(value)
		},
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

	const panelRef = ref<InstanceType<typeof DraggablePanel>>()

	const handleShowPanel = () => {
		panelRef.value?.show();
	}


	const tabButtons = computed(() => ([
		{ id: 0, name: t('fill.solidMode'), iconUrl: "src/assets/icons/text.svg" },
		{ id: 1, name: t('fill.gradientMode'), iconUrl: "src/assets/icons/text.svg" },
		{ id: 2, name: t('fill.patternMode'), iconUrl: "src/assets/icons/text.svg" },
		{ id: 3, name: t('fill.imageMode'), iconUrl: "src/assets/icons/text.svg" },
	]))
	const selectedTabButtonId = ref(0)
	watch(selectedTabButtonId, (newValue, oldValue) => {
		if (newValue !== oldValue) {
			console.log(newValue)
		}
	})

	let currentColor = ref('#000000')

	const handleColorChange = (value : string) => {
		emit('update:modelValue', value ?? undefined)
		currentColor.value = value
	}
</script>

<style scoped lang="scss">
	.colorBox {
		width: 16px;
		height: 16px;
		padding: 6px;

		.colorBlock {
			width: 100%;
			height: 100%;
			border-radius: 2px;
			cursor: pointer;
		}
	}
</style>

<style>
	.v-color-picker__controls {
		padding: 7px;
	}

	.v-color-picker-preview {
		display: flex;
		flex-wrap: wrap;
	}

	.v-color-picker-preview__eye-dropper {
		order: 1;
	}

	.v-color-picker-preview__dot {
		display: none;
		order: 2;
	}

	.v-color-picker-preview__sliders {
		order: 0;
		width: 100%;
	}

	.v-slider.v-input--horizontal>.v-input__control {
		min-height: 20px;
		display: flex;
		align-items: center;
	}

	.v-slider.v-input--horizontal .v-slider-track {
		height: 14px;
	}

	.v-slider.v-input--horizontal .v-slider-track__background {
		height: 14px;
	}

	.v-slider.v-input--horizontal .v-slider-thumb {
		/* inset-inline-start: calc(var(--v-slider-thumb-position) * 0.93); /*200*x=186*/ 
	}

	.v-slider-thumb__ripple {
		display: none;
	}

	.v-slider-thumb--focused .v-slider-thumb__surface::before {
		display: none;
	}
</style>