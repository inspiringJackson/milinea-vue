// src/canvas-core/CanvasManager.ts
import { RenderEngine } from './RenderEngine'
import { useCanvasStore } from '../stores/useCanvasStore'
import { screenToCanvas } from './utils/coordinate'

export class CanvasManager {
	private renderEngine : RenderEngine
	private isPanning = false
	private lastPos = { x: 0, y: 0 }
	public canvas : HTMLCanvasElement

	constructor(
		private container : HTMLElement,
		canvasElement : HTMLCanvasElement
	) {
		this.canvas = canvasElement
		this.renderEngine = new RenderEngine(this.canvas)
		this.setupEventListeners()
	}

	private setupEventListeners() {
		this.canvas.addEventListener('wheel', this.handleWheel.bind(this))
	}

	public pan(dx : number, dy : number) {
		const store = useCanvasStore()
		store.offsetX += dx
		store.offsetY += dy
		this.render()
	}

	public zoom(zoom : number, center ?: { x : number; y : number }) {
		// console.log(zoom, center)
		const store = useCanvasStore()
		const prevZoom = store.zoom
		// 应用缩放范围限制（0.02-256）
		const clampedZoom = Math.min(Math.max(zoom, 0.05), 100)
		// console.log(clampedZoom)

		// 添加缩放限制检测
		if (clampedZoom === store.zoom) return

		if (center) {
			// const scaleFactor = (prevZoom - clampedZoom) / clampedZoom
			// store.offsetX += (center.x * scaleFactor)
			// store.offsetY += (center.y * scaleFactor)
			store.offsetX = center.x - (center.x - store.offsetX) * clampedZoom / prevZoom
			store.offsetY = center.y - (center.y - store.offsetY) * clampedZoom / prevZoom
		}
		console.log(store.offsetX, store.offsetY)
		store.zoom = clampedZoom
		this.render()
	}

	public render() {
		this.renderEngine.render()
	}

	private handleWheel(e : WheelEvent) {
		e.preventDefault()
		const { clientX, clientY, deltaY } = e
		const rect = this.canvas.getBoundingClientRect()
		const point = {
			x: clientX - rect.left,
			y: clientY - rect.top
		}
		// console.log(point)

		// // 将屏幕坐标转换为画布逻辑坐标
		// const logicalPoint = screenToCanvas(
		// 	point,
		// 	this.container,
		// 	useCanvasStore().zoom,
		// 	useCanvasStore().offsetX,
		// 	useCanvasStore().offsetY
		// )

		// 计算缩放方向（放大或缩小）
		const zoomFactor = deltaY > 0 ? 0.9 : 1.1
		const newZoom = useCanvasStore().zoom * zoomFactor

		this.zoom(newZoom, point)
	}
}