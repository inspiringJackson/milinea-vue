// src/canvas-core/RenderEngine.ts
import { useCanvasStore } from '../stores/useCanvasStore'

export class RenderEngine {
	private ctx : CanvasRenderingContext2D
	private devicePixelRatio = window.devicePixelRatio || 1

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

	public render() {
		this.clearCanvas()
		this.renderRuler()
		this.renderMainContent()
		this.renderScrollbar()
	}

	private clearCanvas() {
		this.ctx.resetTransform()
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
	}

	private renderRuler() {
		const store = useCanvasStore()
		const { offsetX, offsetY, zoom } = store
		const ctx = this.ctx

		ctx.save()
		ctx.resetTransform()
		ctx.scale(this.devicePixelRatio, this.devicePixelRatio)

		// 获取可视区域尺寸（逻辑像素）
		const viewWidth = this.canvas.width / this.devicePixelRatio
		const viewHeight = this.canvas.height / this.devicePixelRatio

		// 标尺样式
		ctx.strokeStyle = '#666'
		ctx.lineWidth = 1

		// 水平标尺（修正方向）
		ctx.beginPath()
		const rulerStep = 50 * zoom; // 动态刻度步长
		const startX = (offsetX * zoom) % rulerStep; // 修正模运算基数
		for (let x = startX - rulerStep; x < viewWidth + rulerStep; x += rulerStep) {
			ctx.moveTo(x, 0)
			ctx.lineTo(x, 20)
		}
		ctx.stroke()

		// 垂直标尺（修正方向）
		ctx.beginPath()
		const startY = (offsetY * zoom) % rulerStep;
		for (let y = startY - rulerStep; y < viewHeight + rulerStep; y += rulerStep) {
			ctx.moveTo(0, y)
			ctx.lineTo(20, y)
		}
		ctx.stroke()

		ctx.restore()
	}

	private renderMainContent() {
		const store = useCanvasStore()
		const ctx = this.ctx

		ctx.resetTransform()

		// 添加缩放限制保护
		const safeZoom = Math.min(Math.max(store.zoom, 0.01), 100)
		ctx.scale(safeZoom * this.devicePixelRatio, safeZoom * this.devicePixelRatio)
		ctx.translate(store.offsetX, store.offsetY)

		// 绘制测试内容
		ctx.fillStyle = '#2196f3'
		ctx.fillRect(100, 100, 200, 150)
	}

	private renderScrollbar() {
		const store = useCanvasStore()
		const ctx = this.ctx

		// 保存主内容变换状态
		ctx.save()
		ctx.resetTransform()
		ctx.scale(this.devicePixelRatio, this.devicePixelRatio)

		const viewWidth = this.canvas.width / this.devicePixelRatio
		const viewHeight = this.canvas.height / this.devicePixelRatio

		// 水平滚动条
		ctx.fillStyle = '#ddd'
		ctx.fillRect(0, viewHeight - 16, viewWidth, 16)
		ctx.fillStyle = '#999'
		ctx.fillRect(
			(-store.offsetX / store.zoom) * (viewWidth / store.zoom),
			viewHeight - 16,
			viewWidth / store.zoom,
			16
		)

		// 恢复主内容变换
		ctx.restore()
	}
}