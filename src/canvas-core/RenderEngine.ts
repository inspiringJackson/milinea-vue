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

		this.renderMainContent()
		this.rulerBottomMask()

		this.renderRuler()
		this.rulerTopMask()
		this.renderScrollbar()
	}

	private clearCanvas() {
		this.ctx.resetTransform()
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

		// 填充背景色
		this.ctx.globalCompositeOperation = 'source-over'
		this.ctx.fillStyle = "#F5F5F5"  // 新背景色
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
	}

	private rulerBottomMask() {
		const ctx = this.ctx
		ctx.save()
		ctx.resetTransform()
		ctx.scale(this.devicePixelRatio, this.devicePixelRatio)
		const viewSize = {
			viewWidth: this.canvas.width / this.devicePixelRatio,
			viewHeight: this.canvas.height / this.devicePixelRatio
		}
		ctx.globalCompositeOperation = 'source-over'
		ctx.fillStyle = '#F5F5F5'
		ctx.fillRect(0, 0, viewSize.viewWidth, 26)
		ctx.fillStyle = '#F5F5F5'
		ctx.fillRect(0, 0, 26, viewSize.viewHeight)
		ctx.restore()
	}

	private rulerTopMask() {
		const ctx = this.ctx
		ctx.save()
		ctx.resetTransform()
		ctx.scale(this.devicePixelRatio, this.devicePixelRatio)
		const viewSize = {
			viewWidth: this.canvas.width / this.devicePixelRatio,
			viewHeight: this.canvas.height / this.devicePixelRatio
		}
		// 设置混合模式为目标输入（仅显示重叠区域）
		ctx.globalCompositeOperation = 'source-over'

		// 横向渐变遮罩（右下角 50x25）
		const horizontalGradient = ctx.createLinearGradient(50, 0, 0, 0)
		horizontalGradient.addColorStop(0, 'rgba(245,245,245,0)')
		horizontalGradient.addColorStop(0.5, 'rgba(245,245,245,1)')
		ctx.fillStyle = horizontalGradient
		ctx.fillRect(0, 0, 50, 26)

		// 纵向渐变遮罩（右下角 25x50）
		const verticalGradient = ctx.createLinearGradient(0, 50, 0, 0)
		verticalGradient.addColorStop(0, 'rgba(245,245,245,0)')
		verticalGradient.addColorStop(0.5, 'rgba(245,245,245,1)')
		ctx.fillStyle = verticalGradient
		ctx.fillRect(0, 0, 26, 50)
		ctx.restore()
	}

	private getRulerStep(zoomPercent : number) : number {
		// 缩放比例与刻度间距的对应表（按缩放比例降序排列）
		const rulerSteps = [
			{ threshold: 5000, step: 1 },
			{ threshold: 2500, step: 2 },
			{ threshold: 1000, step: 5 },
			{ threshold: 500, step: 10 },
			{ threshold: 200, step: 25 },
			{ threshold: 100, step: 50 },
			{ threshold: 50, step: 100 },
			{ threshold: 20, step: 250 },
			{ threshold: 10, step: 500 },
			{ threshold: 5, step: 1000 },
			{ threshold: 2, step: 2500 },
			{ threshold: 0, step: 5000 } // 默认值
		]

		// 查找第一个满足缩放比例 >= 阈值的步长
		const matched = rulerSteps.find(item => zoomPercent >= item.threshold)
		return matched ? matched.step : 5000
	}

	private renderRuler() {
		const store = useCanvasStore()
		const { offsetX, offsetY } = store
		const ctx = this.ctx
		const zoomPercent = store.zoom * 100
		const step = this.getRulerStep(zoomPercent)

		ctx.save()
		ctx.resetTransform()
		ctx.scale(this.devicePixelRatio, this.devicePixelRatio)

		// 设置通用样式
		ctx.strokeStyle = '#444'
		ctx.fillStyle = '#aaa'
		const fontSize = 10
		ctx.font = `${fontSize}px Arial` // '10px Arial'
		ctx.lineWidth = 0.5

		const viewSize = {
			viewWidth: this.canvas.width / this.devicePixelRatio,
			viewHeight: this.canvas.height / this.devicePixelRatio
		}

		// 水平标尺绘制
		this.renderHorizontalRuler(viewSize, step, offsetX, store.zoom, fontSize - 5)

		// 垂直标尺绘制
		this.renderVerticalRuler(viewSize, step, offsetY, store.zoom)

		ctx.restore()
	}

	private renderHorizontalRuler(viewSize : { viewWidth : number, viewHeight : number }, step : number, offsetX : number, zoom : number, fontSize : number) {
		const ctx = this.ctx
		ctx.save()
		ctx.textBaseline = 'top'
		ctx.textAlign = 'left'
		const zoomPercent = zoom * 100

		// 计算可见区域的逻辑坐标范围
		const visibleStart = -offsetX / zoom
		const visibleEnd = visibleStart + viewSize.viewWidth / zoom

		// 找到第一个刻度起点
		const startSceneX = Math.floor(visibleStart / step) * step

		ctx.beginPath()
		for (let sceneX = startSceneX; sceneX <= visibleEnd + offsetX * zoom; sceneX += step) {
			const viewX = sceneX * zoom + offsetX // * zoom

			// 高缩放级别处理逻辑
			if (zoomPercent === 10000) {
				// 统一使用10px高度的刻度线
				ctx.moveTo(viewX, 0)
				ctx.lineTo(viewX, 10)
			} else {
				// 常规主副刻度逻辑
				const isMain = (sceneX / step) % 5 === 0
				const height = isMain ? 15 : 10
				ctx.moveTo(viewX, 0)
				ctx.lineTo(viewX, height)
			}
			ctx.fillText(`${sceneX}`, viewX - (sceneX.toString().length * fontSize) / 2, 16)
		}
		ctx.stroke()
		ctx.restore()
	}

	private renderVerticalRuler(viewSize : { viewWidth : number, viewHeight : number }, step : number, offsetY : number, zoom : number) {
		const ctx = this.ctx
		ctx.save()
		ctx.textBaseline = 'middle'
		ctx.textAlign = 'left'
		const zoomPercent = zoom * 100

		// 计算可见区域的逻辑坐标范围
		const visibleStart = -offsetY / zoom
		const visibleEnd = visibleStart + viewSize.viewHeight / zoom

		// 找到第一个刻度起点
		const startSceneY = Math.floor(visibleStart / step) * step

		ctx.beginPath()
		for (let sceneY = startSceneY; sceneY <= visibleEnd + offsetY * zoom; sceneY += step) {
			const viewY = sceneY * zoom + offsetY

			// 高缩放级别处理逻辑
			if (zoomPercent === 10000) {
				// 统一使用10px宽度的刻度线
				ctx.moveTo(0, viewY)
				ctx.lineTo(10, viewY)
			} else {
				// 常规主副刻度逻辑
				const isMain = (sceneY / step) % 5 === 0
				const width = isMain ? 15 : 10
				ctx.moveTo(0, viewY)
				ctx.lineTo(width, viewY)
			}
			// 旋转文本的代码
			ctx.save()                            // 保存当前状态
			ctx.translate(21, viewY)              // 移动坐标到原文本位置
			ctx.rotate(-Math.PI / 2)              // 逆时针旋转90度
			ctx.textAlign = 'center'              // 水平居中
			ctx.textBaseline = 'middle'           // 垂直居中
			ctx.fillText(`${sceneY}`, 0, 0)       // 在旋转后的位置绘制文本
			ctx.restore()                         // 恢复状态
		}
		ctx.stroke()

		ctx.restore()
	}

	private renderMainContent() {
		const store = useCanvasStore()
		const ctx = this.ctx

		ctx.resetTransform()

		// 添加缩放限制保护
		const safeZoom = Math.min(Math.max(store.zoom, 0.05), 100)

ctx.translate(store.offsetX, store.offsetY)
		ctx.scale(safeZoom * this.devicePixelRatio, safeZoom * this.devicePixelRatio)
		

		// 绘制测试内容
		ctx.fillStyle = '#2196f3'
		ctx.fillRect(0, 0, 200, 150)
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