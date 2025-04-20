<!-- src/components/CanvasBoard.vue -->
<template>
	<div class="canvas-container" ref="container">
		<canvas ref="canvas" class="main-canvas" 
		@mousedown="onMouseDown" 
		@mousemove="onMouseMove" 
		@mouseup="onMouseUp"
		@wheel="onWheel"></canvas>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted } from 'vue'
	import { useCanvasStore } from '../stores/useCanvasStore'
	import { CanvasManager } from '../canvas-core/CanvasManager'

	const container = ref<HTMLElement>()
	const canvas = ref<HTMLCanvasElement>()

	let canvasManager : CanvasManager

	const { init, handleMouseEvent, handleWheelEvent } = useCanvasStore()

	onMounted(() => {
		if (!container.value || !canvas.value) return

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
</script>

<style>
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