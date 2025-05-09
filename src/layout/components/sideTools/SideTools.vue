<template>
	<div class="side-tools">
		<ToolButton v-for="(group, index) in tools" :key="index" :tool-group="group"
			:selected-index="currentSelectedTool[index]"
			:active="activeTool.groupIndex === index && activeTool.toolIndex === currentSelectedTool[index]"
			@tool-change="handleToolChange(index, $event)" />
	</div>
</template>

<script setup lang="ts">
	import { ref, watch } from 'vue'
	import ToolButton from './ToolButton.vue'
	import { useI18n } from 'vue-i18n'
	import { usePaperStore } from '../../../stores/usePaperStore'
	import { onMounted } from 'vue'
	import { ToolModes } from '../../../paper-core/config/enums'

	const { t } = useI18n()

	interface Tool {
		src : string
		i18nKey : string
		mode : ToolModes
		shortCut : string
	}

	const tools : Tool[][] = [
		[
			{ src: 'src/assets/icons/mousePointer.svg', i18nKey: 'tools.selectTool', mode: ToolModes.SELECT, shortCut: 'V' },
			{ src: 'src/assets/icons/move.svg', i18nKey: 'tools.handTool', mode: ToolModes.HAND_TOOL, shortCut: 'H' }
		],
		[
			{ src: 'src/assets/icons/rectangle.svg', i18nKey: 'tools.rectangle', mode: ToolModes.RECTANGLE, shortCut: 'R' },
			{ src: 'src/assets/icons/diagonal.svg', i18nKey: 'tools.diagonal', mode: ToolModes.LINE, shortCut: 'L' },
			{ src: 'src/assets/icons/ellipse.svg', i18nKey: 'tools.ellipse', mode: ToolModes.ELLIPSE, shortCut: 'O' },
			// { src: 'src/assets/icons/triangle.svg', i18nKey: 'tools.triangle' },
			// { src: 'src/assets/icons/picture.svg', i18nKey: 'tools.picture' }
		],
		[
			{ src: 'src/assets/icons/calligraphyPen.svg', i18nKey: 'tools.pen', mode: ToolModes.PEN, shortCut: 'P' },
			{ src: 'src/assets/icons/pen.svg', i18nKey: 'tools.pencil', mode: ToolModes.PENCIL, shortCut: 'M' }
		],
		[
			{ src: 'src/assets/icons/text.svg', i18nKey: 'tools.text', mode: ToolModes.TEXT, shortCut: 'T' }
		],
		[
			{ src: 'src/assets/icons/slice.svg', i18nKey: 'tools.slice', mode: ToolModes.SLICE, shortCut: 'S' }
		]
	]

	// 记录当前选中的工具组和工具索引
	// english: current selected tool group and tool index
	const activeTool = ref({
		groupIndex: 0,
		toolIndex: 0
	})

	// 记录每个工具组当前选择的工具索引
	// english: record the current selected tool index for each tool group
	const currentSelectedTool = ref<number[]>(tools.map(() => 0))

	const handleToolChange = (groupIndex : number, toolIndex : number) => {
		console.log(groupIndex, toolIndex)
		currentSelectedTool.value[groupIndex] = toolIndex
		activeTool.value = { groupIndex, toolIndex }
		usePaperStore().setCurrentTool(tools[groupIndex][toolIndex].mode)
	}

	onMounted(() => {
		// 快捷键切换工具
		// english: shortcut key to switch tools
		const handleKeyDown = (event : KeyboardEvent) => {
			if (event.key === 'v') {
				handleToolChange(0, 0)
			} else if (event.key === 'h') {
				handleToolChange(0, 1)
			} else if (event.key === 'r') {
				handleToolChange(1, 0)
			} else if (event.key === 'l') {
				handleToolChange(1, 1)
			} else if (event.key === 'o') {
				handleToolChange(1, 2)
			} else if (event.key === 'p') {
				handleToolChange(2, 0)
			} else if (event.key === 'm') {
				handleToolChange(2, 1)
			} else if (event.key === 't') {
				handleToolChange(3, 0)
			} else if (event.key === 's') {
				handleToolChange(4, 0)
			}
		}

		document.addEventListener('keydown', handleKeyDown)
	})

	watch(
		() => usePaperStore().currentTool,
		(newTool) => {
			let foundGroupIndex = -1
			let foundToolIndex = -1

			tools.forEach((group, groupIndex) => {
				group.forEach((tool, toolIndex) => {
					if (tool.mode === newTool) {
						foundGroupIndex = groupIndex
						foundToolIndex = toolIndex
					}
				})
			})

			if (foundGroupIndex !== -1 && foundToolIndex !== -1) {
				activeTool.value = {
					groupIndex: foundGroupIndex,
					toolIndex: foundToolIndex
				}
				currentSelectedTool.value[foundGroupIndex] = foundToolIndex
			}
		}
	)
</script>

<style scoped lang="scss">
	.side-tools {
		heigth: 100%;
		width: 32px;
		padding: 8px;
		display: flex;
		padding-top: 30px;
		flex-direction: column;
		gap: 15px;
		background-color: var(--n-color);
		border-right: 1px solid var(--border-color);
		transition: border-right 0.3s, color 0.3s;
	}
</style>