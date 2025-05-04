<!-- src/components/CanvasBoard.vue -->
<template>
	<div class="canvas-container" ref="container">
		<canvas ref="bottomCanvas" class="main-canvas" style="z-index: -1;" resize></canvas>
		<canvas ref="canvas" class="main-canvas" resize style="position: absolute; left: 0; top: 0;z-index: 1;" tabindex="0"></canvas>
		<canvas ref="topCanvas" class="main-canvas" style="position: absolute; left: 0; top: 0;z-index: -1;" resize></canvas>
	</div>
</template>

<script setup lang="ts">
	import { ref, watch, onMounted, onUnmounted } from 'vue'
	import paper from 'paper'
	import { usePaperStore } from '../stores/usePaperStore'
	import { ToolModes } from '../config/enums'

	// 导入光标资源
	const cursorDrag = '../src/assets/cursors/drag.png'
	const cursorDragging = '../src/assets/cursors/dragging.png'
	const cursorSelection = '../src/assets/cursors/selection.png'
	const cursorDraw = '../src/assets/cursors/draw.png'
	const cursorPen = '../src/assets/cursors/pen.png'
	const cursorPencil = '../src/assets/cursors/pencil.png'

	const canvas = ref<HTMLCanvasElement | null>(null)
	const bottomCanvas = ref<HTMLCanvasElement | null>(null)
	const topCanvas = ref<HTMLCanvasElement | null>(null)
	const paperStore = usePaperStore()

	// 光标配置映射表
	const CURSOR_MAP = {
		[ToolModes.HAND_TOOL]: (isMoving : boolean) =>
			isMoving ? `url(${cursorDragging}) 11 12` : `url(${cursorDrag}) 11 9`,
		[ToolModes.SELECT]: `url(${cursorSelection}) 4 4`,
		[ToolModes.RECTANGLE]: `url(${cursorDraw}) 15 15`,
		[ToolModes.ELLIPSE]: `url(${cursorDraw}) 15 15`,
		[ToolModes.LINE]: `url(${cursorDraw}) 15 15`,
		[ToolModes.TEXT]: `url(${cursorDraw}) 15 15`,
		[ToolModes.SLICE]: `url(${cursorDraw}) 15 15`,
		[ToolModes.PEN]: `url(${cursorPen}) 5 5`,
		[ToolModes.PENCIL]: `url(${cursorPencil}) 7 18`,
	} as const

	// 更新光标样式
	function updateCursor() {
		if (!canvas.value) return

		const currentTool = paperStore.currentTool
		let cursorStyle = 'auto'

		if (currentTool in CURSOR_MAP) {
			const config = CURSOR_MAP[currentTool as keyof typeof CURSOR_MAP]
			cursorStyle = typeof config === 'function'
				? config(paperStore.isViewMoving)
				: config
		}

		canvas.value.style.cursor = `${cursorStyle}, auto`
	}

	watch(
		() => [paperStore.currentTool, paperStore.isViewMoving],
		() => updateCursor()
	)

	onMounted(() => {
		if (!canvas.value) return

		paperStore.init(canvas.value, bottomCanvas.value, topCanvas.value)

		updateCursor()
	})

	onUnmounted(() => {
		paperStore.clearCanvas()
	})
</script>

<style scoped lang="scss">
	.canvas-container {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: #f5f5f5;
	}

	.main-canvas {
		width: 100%;
		height: 100%;
		background: transparent;
	}

	.main-canvas:focus {
		outline: none;
	}
</style>