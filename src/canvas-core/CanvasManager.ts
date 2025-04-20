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
		store.offsetX += dx
		store.offsetY += dy
		this.render()
	}

	public zoom(zoom : number, center ?: { x : number; y : number }) {
		const store = useCanvasStore()
		const prevZoom = store.zoom
		store.zoom = Math.min(Math.max(zoom, 0.01), 200)

		if (center) {
			store.offsetX += (center.x * (prevZoom - store.zoom))
			store.offsetY += (center.y * (prevZoom - store.zoom))
		}

		this.render()
	}

	public render() {
		this.renderEngine.render()
	}

	private handleWheel(e : WheelEvent) {
		e.preventDefault()
		const delta = e.deltaY > 0 ? 0.9 : 1.1
		const rect = this.canvas.getBoundingClientRect()
		const point = {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top
		}
		this.zoom(delta, point)
	}
}