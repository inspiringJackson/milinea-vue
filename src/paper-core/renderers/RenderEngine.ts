// src/paper-core/renderers/RenderEngine.ts
import { RulerRenderer } from "./ruler/RulerRenderer"
import { GridRenderer } from "./grid/GridRenderer"
import { createTestShapes } from "../../demo/testShapes"
import { usePaperStore } from "../../stores/usePaperStore"
import { useGlobalStore } from "../../stores/useGlobalStore"
import paper from "paper"

import { PAPER_BACKGROUND_COLOR, GRID_LAYER_SCALE } from "../config/constants"

export class RenderEngine {
	private loaded = false
	private ctx : CanvasRenderingContext2D
	private bottomCtx : CanvasRenderingContext2D
	private topCtx : CanvasRenderingContext2D
	private rulerRenderer = new RulerRenderer()
	private gridRenderer = new GridRenderer()
	private lastRenderTime = 0
	private throttleInterval = 10
	private deltaThreshold = 10

	constructor(
		private canvas : HTMLCanvasElement,
		private bottomCanvas : HTMLCanvasElement,
		private topCanvas : HTMLCanvasElement,
	) {
		this.ctx = canvas.getContext('2d')
		this.bottomCtx = bottomCanvas.getContext('2d')
		this.topCtx = topCanvas.getContext('2d')
		this.setupResizeObserver()
	}

	private setupResizeObserver() {
		const paperStore = usePaperStore()
		const resizeObserver = new ResizeObserver(entries => {
			const { width, height } = entries[0].contentRect
			paperStore.scope.view.viewSize = new paper.Size(width, height)
			
			const dpr = paperStore.devicePixelRatio
			this.bottomCanvas.width = width * dpr
			this.bottomCanvas.height = height * dpr
			this.topCanvas.width = width * dpr
			this.topCanvas.height = height * dpr
			
			this.bottomCanvas.style.width = `${width}px`
			this.bottomCanvas.style.height = `${height}px`
			this.topCanvas.style.width = `${width}px`
			this.topCanvas.style.height = `${height}px`
			
			if (!this.loaded) {
				this.render()
			}
			this.updateRender()

		})
		resizeObserver.observe(this.canvas)
		// resizeObserver.observe(this.bottomCanvas)
	}

	private getViewMetrics() {
		const paperStore = usePaperStore()
		return {
			viewWidth: this.canvas.width,
			viewHeight: this.canvas.height,
			dpr: paperStore.devicePixelRatio
		}
	}

	public render() {
		if (!this.loaded) {
			const paperStore = usePaperStore()
			createTestShapes(paperStore.scope)
			useGlobalStore().init()
			this.updateRender()
		}
	}
	
	// public handleDPRChange() {
	// 	const paperStore = usePaperStore()
	// 	const dpr = paperStore.devicePixelRatio
	// }

	public updateRender(delta ?: paper.Point) {
		const now = performance.now()
		const paperStore = usePaperStore()
		const isDeltaLarge = delta && delta.length >= this.deltaThreshold
		const isTimeElapsed = now - this.lastRenderTime >= this.throttleInterval
		const dpr = paperStore.devicePixelRatio

		if (isDeltaLarge || isTimeElapsed || !this.loaded) {
			this.lastRenderTime = now
			paperStore.scope.view.update()

			this.bottomCtx.resetTransform()
			this.topCtx.resetTransform()
			this.bottomCtx.scale(dpr, dpr)
			this.topCtx.scale(dpr, dpr)
			
			const viewMetrics = this.getViewMetrics()
			
			if (paperStore.zoomScale < GRID_LAYER_SCALE) {
				this.topCtx.clearRect(0, 0, viewMetrics.viewWidth, viewMetrics.viewHeight)
				this.gridRenderer.render(this.bottomCtx, viewMetrics)
			} else {
				this.bottomCtx.clearRect(0, 0, viewMetrics.viewWidth, viewMetrics.viewHeight)
				this.gridRenderer.render(this.topCtx, viewMetrics)
			}
			this.rulerRenderer.render(this.topCtx, viewMetrics)
			this.loaded = true
		}
	}
}