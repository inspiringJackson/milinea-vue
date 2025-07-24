<!-- src/components/CanvasBoard.vue -->
<template>
	<div class="canvas-container" ref="container">
		<canvas ref="canvas" class="main-canvas" resize style="position: absolute; left: 0; top: 0;z-index: 1;" tabindex="0"></canvas>
	</div>
</template>

<script setup lang="ts">
	import { ref, watch, onMounted, onUnmounted } from 'vue'
	import { useFabricStore } from '../stores/useFabricStore'
	import { ToolModes } from '../fabric-core/config/enums'

	// 导入光标资源
	const cursorDrag = '../src/assets/cursors/drag.png'
	const cursorDragging = '../src/assets/cursors/dragging.png'
	const cursorSelection = '../src/assets/cursors/selection.png'
	const cursorDraw = '../src/assets/cursors/draw.png'
	const cursorPen = '../src/assets/cursors/pen.png'
	const cursorPencil = '../src/assets/cursors/pencil.png'

	const container = ref<HTMLDivElement | null>(null)
	const canvas = ref<HTMLCanvasElement | null>(null)
	let bottomCanvas: HTMLCanvasElement | null = null
	let topCanvas: HTMLCanvasElement | null = null
	const fabricStore = useFabricStore()

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
		
		const currentTool = fabricStore.currentTool

		let cursorStyle = 'auto'

		if (currentTool in CURSOR_MAP) {
			const config = CURSOR_MAP[currentTool as keyof typeof CURSOR_MAP]
			cursorStyle = typeof config === 'function'
				? config(fabricStore.isViewMoving)
				: config
		}

		canvas.value.style.cursor = `${cursorStyle}, auto`
	}

	watch(
		() => [fabricStore.currentTool, fabricStore.isViewMoving],
		() => updateCursor()
	)

	onMounted(() => {
		if (!canvas.value || !container.value) return

		fabricStore.init(container.value, canvas.value) //, bottomCanvas.value, topCanvas.value)
		
		const fabricWrapper = container.value.querySelector('[data-fabric="wrapper"]') as HTMLElement
		const fabricLowerCanvas = container.value.querySelector('.lower-canvas') as HTMLCanvasElement
		const fabricUpperCanvas = container.value.querySelector('.upper-canvas') as HTMLCanvasElement
		
		if (fabricWrapper && fabricLowerCanvas && fabricUpperCanvas) {
			// 对fabric.js默认生成的上下层canvas包裹容器进行解构，并调整canvas顺序使得网格随缩放比动态渲染
			// english: deconstruct the default generated upper and lower canvas containers of fabric.js 
			// and adjust the canvas order to dynamically render the grid according to the zoom ratio
			const customTopCanvas = document.createElement('canvas')
			customTopCanvas.className = 'main-canvas top-canvas'
			Object.assign(customTopCanvas.style, {
				position: 'absolute',
				left: '0',
				top: '0',
				zIndex: '1',
				pointerEvents: 'none',
				width: '100%',
				height: '100%',
			})
			container.value.appendChild(customTopCanvas)
			topCanvas = customTopCanvas
			
			const customBottomCanvas = document.createElement('canvas')
			customBottomCanvas.className = 'main-canvas bottom-canvas'
			Object.assign(customBottomCanvas.style, {
				position: 'absolute',
				left: '0',
				top: '0',
				zIndex: '0',
				pointerEvents: 'none',
				width: '100%',
				height: '100%',
			})
			container.value.appendChild(customBottomCanvas)
			bottomCanvas = customBottomCanvas
			
			fabricWrapper.remove()
			container.value.appendChild(fabricLowerCanvas)
			container.value.appendChild(fabricUpperCanvas)
			fabricLowerCanvas.style.zIndex = '0'
			fabricUpperCanvas.style.zIndex = '1'
			
			fabricStore.loadRulerAndGrid(bottomCanvas, topCanvas)
		}

		updateCursor()
	})

	onUnmounted(() => {
		fabricStore.clearCanvas()
	})
</script>

<style scoped lang="scss">
	.canvas-container {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: var(--canvas-color);
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