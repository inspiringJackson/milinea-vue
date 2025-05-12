<template>
	<n-tooltip placement="right" :show-arrow="false" trigger="hover">
		<template #trigger>
			<n-button class="tool-button" :class="{ 'active': active }" :bordered="false"
				:type="active ? 'primary' : 'default'" @click="handleMainClick">
				<template #icon>
					<div class="icon-container">
						<n-icon size="20" class="main-icon">
							<img :src="currentTool.src" class="icon" :alt="t(currentTool.i18nKey)" />
						</n-icon>
						<n-popselect v-if="toolGroup.length > 1" v-model:value="selectedIndex" placement="right"
							:options="popSelectOptions" trigger="manual" :show="showPopselect"
							@update:value="handleToolSelect" @clickoutside="showPopselect = false">
							<n-icon size="5" class="extension-icon" @click.stop="togglePopselect">
								<img src="@/assets/icons/extension.svg" class="icon" />
							</n-icon>
						</n-popselect>
					</div>
				</template>
			</n-button>
		</template>
		{{ t(currentTool.i18nKey) }}
		<n-tag :bordered="false" type="success" round>
			{{currentTool.shortCut}}
		</n-tag>
	</n-tooltip>
</template>

<script setup lang="ts">
	import { computed, ref, h } from 'vue'
	import { useI18n } from 'vue-i18n'
	import { NIcon, NTag } from 'naive-ui'
	import { watch } from 'vue'

	const { t } = useI18n()

	const props = defineProps({
		toolGroup: {
			type: Array as () => Array<{ src : string; alt : string }>,
			required: true
		},
		active: {
			type: Boolean,
			default: false
		},
		selectedIndex: {
			type: Number,
			default: 0
		}
	})

	const emit = defineEmits(['tool-change'])

	const selectedIndex = ref(props.selectedIndex)
	const showPopselect = ref(false)

	watch(() => props.selectedIndex, (newVal) => {
		selectedIndex.value = newVal
	})

	const currentTool = computed(() => {
		return props.toolGroup[selectedIndex.value]
	})

	const popSelectOptions = computed(() => {
		return props.toolGroup.map((tool, index) => ({
			label: () => h('div', { class: 'option-content' }, [
				h(NIcon, { size: 16, class: 'option-icon' }, () =>
					h('img', { src: tool.src, class: 'icon', alt: t(tool.i18nKey)})
				),
				h('span', { class: 'option-label' }, t(tool.i18nKey)),
				h('div', { class: 'option-hint' }, [
					h(NTag, { round: true, 
					type: 'success', 
					bordered: false,
					style: { minWidth: '2rem' }
					}, () => tool.shortCut)
				])
			]),
			value: index
		}))
	})

	const handleToolSelect = (index : number) => {
		selectedIndex.value = index
		showPopselect.value = false
		emit('tool-change', index)
	}

	const togglePopselect = (e : Event) => {
		e.stopPropagation()
		showPopselect.value = !showPopselect.value
	}

	const handleMainClick = () => {
		emit('tool-change', selectedIndex.value)
	}
</script>

<style scoped lang="scss">
	.tool-button {
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
		transition: all 0.2s ease;
		position: relative;
		cursor: default;

		.icon {
			filter: var(--filter);
			transition: filter 0.2s ease;
			width: 16px;
			height: 16px;
		}

		&.active {
			.icon {
				filter: brightness(0) invert(1) drop-shadow(0 0 0.5px white);
			}
		}
	}

	.icon-container {
		position: relative;
		display: flex;
		justify-content: center;
		width: 20px;
		height: 20px;

		.main-icon {
			z-index: 1;
			transition: all 0.2s ease;

			.icon {
				width: 20px;
				height: 20px;
			}
		}

		.extension-icon {
			position: absolute;
			bottom: -2.5px;
			right: -2.5px;
			z-index: 2;
			width: 8px;
			height: 8px;
			padding: 1.5px;
			box-sizing: border-box;
			cursor: pointer;

			.icon {
				width: 100%;
				height: 100%;
			}

			&:hover {
				transform: scale(1.1);
			}
		}

		.n-popselect {
			position: absolute;
			right: -8px;
			bottom: -8px;
			z-index: 3;
		}
	}
	
	:deep(.n-base-select-option__content) {
		width: 100%;
	}

	:global(.option-content) {
		display: flex;
		align-items: center;
		// justify-content: space-between;
		gap: 8px;
		width: 100%;
	}

	:global(.option-icon) {
		margin-right: 8px;

		.icon {
			width: 16px;
			height: 16px;
			filter: var(--filter);
		}
	}
	
	:global(.option-hint) {
		margin-left: auto;
	}

	:global(.option-label) {
		white-space: nowrap;
	}
</style>

<style>
	.n-base-select-option__content {
		width: 100%;
	}
	
	.n-tag__content {
		width: 100%;
		text-align: center;
	}
</style>