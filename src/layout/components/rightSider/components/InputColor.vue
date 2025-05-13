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
			<!-- <ButtonsRadioGroup v-model="selectedTabButtonId" :buttons="tabButtons"></ButtonsRadioGroup> -->
			<n-config-provider :theme-overrides="themeOverrides">
				<n-tabs type="segment" size="small" animated @update:value="$emit('update:modelValue', $event)">
					<n-tab-pane :name="button.id" v-for="(button, index) in tabButtons" :key="button.id">
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
						<v-color-picker v-if="button.mode === 'solid'" canvas-height="200" width="200" hide-inputs
							@update:modelValue="handleColorChange" theme="dark"></v-color-picker>
					</n-tab-pane>
				</n-tabs>
			</n-config-provider>
		</DraggablePanel>
	</n-config-provider>
	<!-- <iframe v-if="showIframe" src="https://example.com" class="custom-iframe"></iframe> -->
</template>

<script setup lang="ts">
	import { defineProps, defineEmits, computed, ref, watch, onMounted } from 'vue'
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
		{ id: 0, mode: 'solid', name: t('fill.solidMode'), iconUrl: "src/assets/icons/text.svg" },
		// todo: 以下功能后续再扩展
		// english: the following functionality will be extended later
		// { id: 1, mode: 'gradient', name: t('fill.gradientMode'), iconUrl: "src/assets/icons/text.svg" },
		// { id: 2, mode: 'pattern', name: t('fill.patternMode'), iconUrl: "src/assets/icons/text.svg" },
		{ id: 3, mode: 'image', name: t('fill.imageMode'), iconUrl: "src/assets/icons/text.svg" },
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

	onMounted(() => {

	})
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
	.v-sheet {
		background: var(--vuetify-bg-color);
		transition: background-color 0.2s ease-in-out;
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
		margin-left: ;
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
</style>