// src/paper-core/renderers/RenderEngine.ts
import { RulerRenderer } from "./ruler/RulerRenderer"
import { GridRenderer } from "./grid/GridRenderer"
import { createTestShapes } from "../../demo/testShapes"
import { usePaperStore } from "../../stores/usePaperStore"
import paper from "paper"

import { PAPER_BACKGROUND_COLOR, GRID_LAYER_SCALE } from "../../config/constants"

export class RenderEngine {
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
			this.bottomCanvas.width = width
			this.bottomCanvas.height = height
			this.topCanvas.width = width
			this.topCanvas.height = height
			this.render()
		})
		resizeObserver.observe(this.canvas)
		resizeObserver.observe(this.bottomCanvas)
	}

	private getViewMetrics() {
		return {
			viewWidth: this.canvas.width,
			viewHeight: this.canvas.height
		}
	}

	public render() {
		const paperStore = usePaperStore()
		createTestShapes(paperStore.scope)
		paperStore.scope.view.update()
		if (paperStore.zoomScale < GRID_LAYER_SCALE) {
			this.gridRenderer.render(this.bottomCtx, this.getViewMetrics())
		} else {
			this.gridRenderer.render(this.ctx, this.getViewMetrics())
		}
		this.rulerRenderer.render(this.ctx, this.getViewMetrics())
	}


	public renderRuler(delta ?: paper.Point) {
		const now = performance.now()
		const paperStore = usePaperStore()
		const isDeltaLarge = delta && delta.length >= this.deltaThreshold
		const isTimeElapsed = now - this.lastRenderTime >= this.throttleInterval

		if (isDeltaLarge || isTimeElapsed) {
			this.lastRenderTime = now
			requestAnimationFrame(() => {
				paperStore.scope.view.update()
				if (paperStore.zoomScale < GRID_LAYER_SCALE) {
					this.gridRenderer.render(this.bottomCtx, this.getViewMetrics())
				} else {
					this.bottomCtx.clearRect(0, 0, this.canvas.width, this.canvas.height)
					this.gridRenderer.render(this.ctx, this.getViewMetrics())
				}
				this.rulerRenderer.render(this.ctx, this.getViewMetrics())
			})
		}
	}
}