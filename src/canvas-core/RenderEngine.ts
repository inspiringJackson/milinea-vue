// src/canvas-core/RenderEngine.ts
import { MainContentRenderer } from './renderers/main/MainContentRenderer'
import { ScrollBarRenderer } from './renderers/scrollBar/ScrollBarRenderer'
import { RulerRenderer } from './renderers/ruler/RulerRenderer'
import { useCanvasStore } from '../stores/useCanvasStore'
import { ContentInfoRenderer } from './renderers/main/ContentInfoRenderer'

export class RenderEngine {
	private ctx : CanvasRenderingContext2D
	private devicePixelRatio = window.devicePixelRatio || 1
	private mainContentRenderer = new MainContentRenderer()
	private scrollBarRenderer = new ScrollBarRenderer()
	private rulerRenderer = new RulerRenderer()
	private contentInfoRenderer = new ContentInfoRenderer()

	constructor(
		private canvas : HTMLCanvasElement
	) {
		this.ctx = canvas.getContext('2d')!
		this.initCanvasSize()
		this.setupResizeObserver()
	}

	private initCanvasSize() {
		const { width, height } = this.canvas.getBoundingClientRect()
		
		this.canvas.width = Math.floor(width * this.devicePixelRatio)
		this.canvas.height = Math.floor(height * this.devicePixelRatio)
		this.ctx.scale(this.devicePixelRatio, this.devicePixelRatio)
	}
	
	private setupResizeObserver() {
		// 监听 canvas 大小变化
		// 重新设置 canvas 大小并渲染
		// english: listen for canvas size changes and re-render with new size
		const resizeObserver = new ResizeObserver(() => {
			this.initCanvasSize()
			this.render()
		})
		resizeObserver.observe(this.canvas)
	}
	
	private getViewMetrics() {
		return {
			viewWidth: this.canvas.width / this.devicePixelRatio,
			viewHeight: this.canvas.height / this.devicePixelRatio
		}
	}

	public render() {
		const { zoom, offsetX, offsetY } = useCanvasStore();
		this.clearCanvas()

		this.ctx.setTransform(
		    zoom * this.devicePixelRatio, 0,
		    0, zoom * this.devicePixelRatio,
		    offsetX * this.devicePixelRatio,
		    offsetY * this.devicePixelRatio
		)

		this.mainContentRenderer.render(this.ctx)
		this.contentInfoRenderer.render(this.ctx)
		this.rulerRenderer.render(this.ctx, this.getViewMetrics())
		this.scrollBarRenderer.render(this.ctx, this.getViewMetrics())
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