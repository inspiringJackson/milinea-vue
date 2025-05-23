<template>
	<n-config-provider :theme-overrides="themeOverrides">
		<n-layout>
			<v-color-picker canvas-height="200" width="200" hide-inputs v-model="color"
				@update:modelValue="handleColorChange"></v-color-picker>
			<div class="color-setting-inputs">
				<n-select v-model:value="colorType" :options="colorTypes" size="tiny" :show-arrow="false"
					:show-checkmark="false" menu-size="tiny" />
				<v-color-picker class="color-input" width="145" hide-sliders hide-canvas v-model="color" :number-input-props="{ controlVariant: 'hidden' }"
					:mode="colorType" control-variant="hidden"></v-color-picker>
			</div>
			<n-divider></n-divider>
		</n-layout>
	</n-config-provider>
</template>

<script setup lang="ts">
	import { computed, ref, watch } from 'vue'
	import { useGlobalStore } from '../../../../stores/useGlobalStore'

	const store = useGlobalStore()

	const themeOverrides = computed(() => ({
		select: {
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
		currentColor: {
			type: String,
			default: ''
		}
	})

	const color = ref(props.currentColor)

	const emit = defineEmits(['update:modelValue'])

	const handleColorChange = (value : string) => {
		emit('update:modelValue', value ?? undefined)
	}

	const colorType = ref('rgba')

	const colorTypes = [
		// {
		// 	label: 'RGB',
		// 	value: 'rgb',
		// 	style: {
		// 		padding: 0,
		// 		textAlign: 'center',
		// 	}

		// },
		// {
		// 	label: 'HSL',
		// 	value: 'hsl',
		// 	style: {
		// 		padding: 0,
		// 		textAlign: 'center',
		// 	}
		// },
		// {
		// 	label: 'HEX',
		// 	value: 'hex',
		// 	style: {
		// 		padding: 0,
		// 		textAlign: 'center',
		// 	}
		// },
		{
			label: 'RGBA',
			value: 'rgba',
			style: {
				padding: 0,
				textAlign: 'center',
			}
		},
		{
			label: 'HSLA',
			value: 'hsla',
			style: {
				padding: 0,
				textAlign: 'center',
			}
		},
		{
			label: 'HEXA',
			value: 'hexa',
			style: {
				padding: 0,
				textAlign: 'center',
			}
		},
	]
</script>

<style scoped lang="scss">
	.color-setting-inputs {
		display: flex;
		align-items: center;

		.n-select {
			width: 55px;
		}
	}
</style>

<style>
	.n-base-selection {
		--n-padding-single: 0 8px;
		border: none;
		background: var(--input-bg-color);
		width: unset;
	}

	.n-base-selection .n-base-suffix {
		display: none;
		right: 4px
	}

	.n-base-selection .n-base-selection-label {
		width: unset;
	}

	.n-base-selection .n-base-selection-label .n-base-selection-input {
		width: unset;
	}
	
	.n-divider:not(.n-divider--vertical) {
		margin: 8px 0;
	}
</style>

<style lang="scss">
	.v-sheet {
		background: var(--vuetify-bg-color);
		transition: background-color 0.2s ease-in-out;
	}
	
	.v-color-picker.v-sheet.v-picker {
		box-shadow: none;
	}
	
	.v-color-picker-canvas {
		border-radius: 4px;
	}

	.v-color-picker__controls {
		padding: 7px 0;
	}

	.v-color-picker-preview {
		display: flex;
		flex-wrap: wrap;
	}

	.v-color-picker-preview__eye-dropper {
		order: 0;
		background-color: #000;
		// margin-left: ;
	}

	.v-color-picker-preview__dot {
		display: none;
		order: 2;
	}

	.v-color-picker-preview__sliders {
		order: 1;
		padding-inline-end: 0;

	}

	.v-slider.v-input--horizontal>.v-input__control {
		min-height: 20px;
		display: flex;
		align-items: center;
	}

	.v-slider-track__background,
	.v-slider-track__fill {
		border-radius: 7px;
	}

	.v-slider.v-input--horizontal .v-slider-track {
		height: 14px;
	}

	.v-slider.v-input--horizontal .v-slider-track__background {
		height: 14px;
	}

	.v-slider-thumb__surface {
		box-sizing: border-box;
		background-color: transparent;
		border: 3px solid #fff;
	}

	.v-slider.v-input--horizontal .v-slider-thumb {
		inset-inline-start: calc(var(--v-slider-thumb-position) * (138 / 152));
		/*152*x=138 */
	}

	.v-slider-thumb__ripple {
		display: none;
	}

	.v-slider-thumb--focused .v-slider-thumb__surface::before {
		display: none;
	}

	.color-input {
		.v-color-picker__controls {
			padding: 0;
		}
	}

	.v-color-picker-edit {
		margin-top: 0;
		justify-content: space-around;
	}

	.v-color-picker-edit__input input {
		margin-bottom: 0;
		background: var(--input-bg-color);
		color: var(--text-color);
		border: none;
		font-size: 12px;
		height: 22px;
	}
	
	.v-color-picker-edit__input:not(:last-child) {
		margin-inline-end: unset;
	}
	
	.color-input input[type=number]::-webkit-inner-spin-button,
	.color-input input[type=number]::-webkit-outer-spin-button {
	  -webkit-appearance: none;
	  margin: 0;
	}

	.v-color-picker-edit__input span {
		display: none;
	}

	.v-btn--icon.v-btn--density-default {
		display: none;
	}
</style>