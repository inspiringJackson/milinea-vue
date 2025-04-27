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
	
	public getIsPanning() {
		return this.isPanning
	}

	public setIsPanning(isPanning : boolean) {
		this.isPanning = isPanning
	}
	
	public getLastPos() {
		return this.lastPos
	}

	public setLastPos(lastPos : { x : number; y : number }) {
		this.lastPos = lastPos	
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
		// english: limit zoom range (0.02-256)
		const clampedZoom = Math.min(Math.max(zoom, 0.05), 100)

		// 添加缩放限制检测
		// english: add zoom limit detection
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
	
	public hover() {
		this.render()
	}
	
	public enterPathEditMode() {
		this.render()
	}

	public render() {
		this.renderEngine.render()
	}

	private handleWheel(e : WheelEvent) {
		const store = useCanvasStore()
		e.preventDefault()
		const { deltaY, offsetX, offsetY } = e
		if ((store.isZooming || e.ctrlKey ) && !e.shiftKey) {
			if (!store.shiftKey || !e.shiftKey) {
				const point = {
					x: offsetX,
					y: offsetY
				}
				
				const zoomFactor = deltaY > 0 ? 0.9 : 1.1
				const newZoom = useCanvasStore().zoom * zoomFactor
				
				this.zoom(newZoom, point)
			}
		} else {
			const dx = deltaY * store.panSpeed / store.zoom
			const dy = deltaY * store.panSpeed / store.zoom
			if (store.shiftKey || e.shiftKey) {
				if ((store.altKey && !store.ctrlKey) || 
					(e.altKey && !e.ctrlKey)) { // if (store.xKey && !store.sKey) {
					// ↖↘
					this.pan(-dx, -dy)
				} else if ((!store.altKey && store.ctrlKey) || 
							(!e.altKey && e.ctrlKey)) { //(!store.xKey && store.sKey) {
					// ↙↗
					this.pan(dx, -dy)
				} else {
					// ←→
					this.pan(-dx, 0)
				}
			} else {
				// 垂直平移
				// horizontal pan
				this.pan(0, -dy)
			}
		}
	}
}