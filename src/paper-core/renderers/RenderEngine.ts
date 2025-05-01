// src/paper-core/renderers/RenderEngine.ts
import { RulerRenderer } from "./ruler/RulerRenderer"
import { createTestShapes } from "../../demo/testShapes"
import { usePaperStore } from "../../stores/usePaperStore"
import paper from "paper"

import { PAPER_BACKGROUND_COLOR } from "../../config/constants"

export class RenderEngine {
	private ctx : CanvasRenderingContext2D
	private rulerRenderer = new RulerRenderer()
	private lastRenderTime = 0
	private throttleInterval = 10
	private deltaThreshold = 3

	constructor(
		private canvas : HTMLCanvasElement,
	) {
		this.ctx = canvas.getContext('2d')
		this.setupResizeObserver()
	}

	private setupResizeObserver() {
		const paperStore = usePaperStore()
		const resizeObserver = new ResizeObserver(entries => {
			const { width, height } = entries[0].contentRect
			paperStore.scope.view.viewSize = new paper.Size(width, height)
			this.render()
		})
		resizeObserver.observe(this.canvas)
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
				this.rulerRenderer.render(this.ctx, this.getViewMetrics())
			})
		}
	}
}