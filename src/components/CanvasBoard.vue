<!-- src/components/CanvasBoard.vue -->
<template>
	<div class="canvas-container" ref="container">
		<canvas ref="canvas" class="main-canvas" :class="store.tool" @mousedown="onMouseDown" @mousemove="onMouseMove"
			@mouseup="onMouseUp" @wheel="onWheel" @keydown="onKeydown" @keypress="onKeypress" @keyup="onKeyup"></canvas>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted } from 'vue'
	import { useCanvasStore } from '../stores/useCanvasStore'
	import { CanvasManager } from '../canvas-core/CanvasManager'

	const preloadCursors = () => {
		const cursors = [
			'src/assets/cursors/drag.png',
			'src/assets/cursors/dragging.png',
			'src/assets/cursors/selection.png',
			'src/assets/cursors/draw.png',
			'src/assets/cursors/pen.png',
			'src/assets/cursors/pencil.png'
		];

		cursors.forEach(cursor => {
			const img = new Image();
			img.src = cursor;
		});
	};

	const container = ref<HTMLElement>()
	const canvas = ref<HTMLCanvasElement>()
	const store = useCanvasStore()

	let canvasManager : CanvasManager

	const { init, handleMouseEvent, handleWheelEvent, handleKeyboradEvent } = store

	onMounted(() => {
		if (!container.value || !canvas.value) return

		preloadCursors()

		canvasManager = new CanvasManager(
			container.value,
			canvas.value
		)

		init(canvasManager)
		canvasManager.render()
	})

	const onMouseDown = (e : MouseEvent) => handleMouseEvent('down', e)
	const onMouseMove = (e : MouseEvent) => handleMouseEvent('move', e)
	const onMouseUp = (e : MouseEvent) => handleMouseEvent('up', e)
	const onWheel = (e : WheelEvent) => handleWheelEvent(e) 
	const onKeydown = (e : KeyboardEvent) => handleKeyboradEvent('down', e)
	const onKeypress = (e : KeyboardEvent) => handleKeyboradEvent('press', e)
	const onKeyup = (e : KeyboardEvent) => handleKeyboradEvent('up', e)
</script>

<style scoped lang="scss">
	.main-canvas.moveView {
		cursor: url('../assets/cursors/drag.png') 11 9, default;
	}

	.main-canvas.movingView {
		cursor: url('../assets/cursors/dragging.png') 11 12, default;
	}

	.main-canvas.selection {
		cursor: url('../assets/cursors/selection.png') 4 4, default;
	}

	.main-canvas.rectangle,
	.main-canvas.ellipse,
	.main-canvas.diagonal,
	.main-canvas.text,
	.main-canvas.slice {
		cursor: url('../assets/cursors/draw.png') 15 15, default;
	}

	.main-canvas.calligraphyPen {
		cursor: url('../assets/cursors/pen.png') 5 5, default;
	}

	.main-canvas.pen {
		cursor: url('../assets/cursors/pencil.png') 7 18, default;
	}

	/* 默认样式 */
	.canvas-container {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.main-canvas {
		width: 100%;
		height: 100%;
	}
</style>