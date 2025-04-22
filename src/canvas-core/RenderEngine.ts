// src/canvas-core/RenderEngine.ts
import { MainContentRenderer } from './renderers/main/MainContentRenderer'
import { ScrollBarRenderer } from './renderers/scrollBar/ScrollBarRenderer'
import { RulerRenderer } from './renderers/ruler/RulerRenderer'

export class RenderEngine {
	private ctx : CanvasRenderingContext2D
	private devicePixelRatio = window.devicePixelRatio || 1
	private mainContentRenderer = new MainContentRenderer()
	private scrollBarRenderer = new ScrollBarRenderer()
	private rulerRenderer = new RulerRenderer()

	constructor(
		private canvas : HTMLCanvasElement
	) {
		this.ctx = canvas.getContext('2d')!
		this.initCanvasSize()
	}

	private initCanvasSize() {
		const rect = this.canvas.getBoundingClientRect()
		this.canvas.width = rect.width * this.devicePixelRatio
		this.canvas.height = rect.height * this.devicePixelRatio
	}
	
	private getViewMetrics() {
		return {
			viewWidth: this.canvas.width / this.devicePixelRatio,
			viewHeight: this.canvas.height / this.devicePixelRatio
		}
	}

	public render() {
		this.clearCanvas()

		this.mainContentRenderer.render(this.ctx, devicePixelRatio)
		this.rulerRenderer.render(this.ctx, devicePixelRatio, this.getViewMetrics())
		this.scrollBarRenderer.render(this.ctx, devicePixelRatio, this.getViewMetrics())
	}

	private clearCanvas() {
		this.ctx.resetTransform()
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

		// 背景色 background-color
		const BACKGROUND_COLOR = '#F5F5F5'
		this.ctx.globalCompositeOperation = 'source-over'
		this.ctx.fillStyle = BACKGROUND_COLOR
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
	}
}