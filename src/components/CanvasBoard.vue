<!-- src/components/CanvasBoard.vue -->
<template>
	<div class="canvas-container" ref="container">
		<!-- 		<canvas ref="canvas" class="main-canvas" :class="store.tool" tabindex="0" @mouseenter="onMouseEnter"
			@mouseleave="onMouseLeave" @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp"
			@wheel="onWheel" @keydown="onKeydown" @keypress="onKeypress" @keyup="onKeyup"></canvas> -->
		<canvas ref="canvas" class="main-canvas" resize tabindex="0"></canvas>
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

		paperStore.init(canvas.value)

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
	}

	.main-canvas {
		width: 100%;
		height: 100%;
		background-color: #f5f5f5;
	}

	.main-canvas:focus {
		outline: none;
	}
</style>