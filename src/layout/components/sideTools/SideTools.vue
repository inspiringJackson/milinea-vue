<template>
	<div class="side-tools">
		<ToolButton v-for="(group, index) in tools" :key="index" :tool-group="group"
			:active="activeTool.groupIndex === index && activeTool.toolIndex === currentSelectedTool[index]"
			@tool-change="handleToolChange(index, $event)" />
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import ToolButton from './ToolButton.vue'
	import { useI18n } from 'vue-i18n'

	const { t } = useI18n()

	interface Tool {
		src : string
		i18nKey : string
	}

	const tools : Tool[][] = [
		[
			{ src: 'src/assets/icons/mousePointer.svg', i18nKey: 'tools.selection' },
			{ src: 'src/assets/icons/move.svg', i18nKey: 'tools.moveView' }
		],
		[
			{ src: 'src/assets/icons/rectangle.svg', i18nKey: 'tools.rectangle' },
			{ src: 'src/assets/icons/diagonal.svg', i18nKey: 'tools.diagonal' },
			{ src: 'src/assets/icons/ellipse.svg', i18nKey: 'tools.ellipse' },
			{ src: 'src/assets/icons/triangle.svg', i18nKey: 'tools.triangle' },
			{ src: 'src/assets/icons/picture.svg', i18nKey: 'tools.picture' }
		],
		[
			{ src: 'src/assets/icons/calligraphyPen.svg', i18nKey: 'tools.calligraphyPen' },
			{ src: 'src/assets/icons/pen.svg', i18nKey: 'tools.pen' }
		],
		[
			{ src: 'src/assets/icons/text.svg', i18nKey: 'tools.text' }
		],
		[
			{ src: 'src/assets/icons/slice.svg', i18nKey: 'tools.slice' }
		]
	]

	// 记录当前选中的工具组和工具索引
	const activeTool = ref({
		groupIndex: 0,
		toolIndex: 0
	})

	// 记录每个工具组当前选择的工具索引
	const currentSelectedTool = ref<number[]>(tools.map(() => 0))

	const handleToolChange = (groupIndex : number, toolIndex : number) => {
		currentSelectedTool.value[groupIndex] = toolIndex
		activeTool.value = { groupIndex, toolIndex }
		// 这里可以添加工具切换的实际逻辑
	}
</script>

<style scoped lang="scss">
	.side-tools {
		position: absolute;
		height: calc(100% - 45px);
		width: 32px;
		padding: 8px;
		display: flex;
		flex-direction: column;
		gap: 12px;
		background-color: var(--n-color);
		border-right: 1px solid #eee;
	}
</style>