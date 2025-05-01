// src/paper-core/renderers/RenderEngine.ts
import { RulerRenderer } from "./ruler/RulerRenderer"
import { createTestShapes } from "../../demo/testShapes"
import { usePaperStore } from "../../stores/usePaperStore"
import paper from "paper"

import { PAPER_BACKGROUND_COLOR } from "../../config/constants"

export class RenderEngine {
	private ctx : CanvasRenderingContext2D
	private rulerRenderer = new RulerRenderer()
	private lastRenderTime = 0 // 记录上次渲染时间
	private throttleInterval = 16 // 节流间隔（ms，约60fps）
	private deltaThreshold = 5

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

	public render() {

		createTestShapes()
		this.rulerRenderer.render()

	}

	public renderRuler(delta?: paper.Point) {
		const now = performance.now()
				const isDeltaLarge = delta && delta.length >= this.deltaThreshold
				const isTimeElapsed = now - this.lastRenderTime >= this.throttleInterval
		
				if (isDeltaLarge || isTimeElapsed) {
					this.rulerRenderer.render()
					this.lastRenderTime = now
				}
	}
}