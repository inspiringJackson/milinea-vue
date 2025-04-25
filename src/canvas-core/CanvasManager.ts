// src/canvas-core/CanvasManager.ts
import { RenderEngine } from './RenderEngine'
import { useCanvasStore } from '../stores/useCanvasStore'

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
		store.offsetX += dx * store.zoom
		store.offsetY += dy * store.zoom
		this.render()
	}

	public zoom(zoom : number, center ?: { x : number; y : number }) {
		const store = useCanvasStore()
		const prevZoom = store.zoom
		// 应用缩放范围限制（0.02-256）
		const clampedZoom = Math.min(Math.max(zoom, 0.05), 100)
		// console.log(clampedZoom)

		// 添加缩放限制检测
		if (clampedZoom === store.zoom) return

		if (center) {
			store.offsetX = center.x - (center.x - store.offsetX) * clampedZoom / prevZoom
			store.offsetY = center.y - (center.y - store.offsetY) * clampedZoom / prevZoom
		}
		store.zoom = clampedZoom
		this.render()
	}
	
	public select() {
		this.render()
	}

	public render() {
		this.renderEngine.render()
	}

	private handleWheel(e : WheelEvent) {
		e.preventDefault()
		const { deltaY, offsetX, offsetY } = e
		const point = {
			x: offsetX,
			y: offsetY
		}

		// 计算缩放方向（放大或缩小）
		const zoomFactor = deltaY > 0 ? 0.9 : 1.1
		const newZoom = useCanvasStore().zoom * zoomFactor

		this.zoom(newZoom, point)
	}
}