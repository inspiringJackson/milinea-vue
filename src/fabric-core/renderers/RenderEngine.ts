// src/fabric-core/renderers/RenderEngine.ts
import { entries } from "lodash-es"
import { useFabricStore } from "../../stores/useFabricStore"
import { useGlobalStore } from "../../stores/useGlobalStore"
import { createTestShapes4Fabric } from "../../demo/testShapes"
import { Canvas } from "fabric"
import { RulerRenderer } from "./ruler/RulerRenderer"
import { GridRenderer } from "./grid/GridRenderer"
import { GRID_LAYER_SCALE } from "../config/constants"

export class RenderEngine {
	private isLoaded : boolean = false
	private ctx : CanvasRenderingContext2D
	private bottomCtx : CanvasRenderingContext2D
	private topCtx : CanvasRenderingContext2D
	
	private rulerRenderer = new RulerRenderer()
	private gridRenderer = new GridRenderer()

	constructor(
		private canvas : HTMLCanvasElement,
		private canvasContainer : HTMLDivElement,
		private bottomCanvas : HTMLCanvasElement,
		private topCanvas : HTMLCanvasElement,
	) {
		this.ctx = canvas.getContext("2d")
		this.bottomCtx = bottomCanvas.getContext("2d")
		this.topCtx = topCanvas.getContext("2d")
		this.setupResizeObserver()
	}

	private setupResizeObserver() {
		const fabricStore = useFabricStore()
		let animationFrameId : number

		const resizeObserver = new ResizeObserver(entries => {
			if (animationFrameId) {
				cancelAnimationFrame(animationFrameId)
			}
			animationFrameId = requestAnimationFrame(() => {
				const { width, height } = entries[0].contentRect
				fabricStore.fabricCanvas.setDimensions({ width, height })
				
				this.bottomCanvas.width = width
				this.bottomCanvas.height = height
				this.topCanvas.width = width
				this.topCanvas.height = height
				
				this.bottomCanvas.style.width = `${width}px`
				this.bottomCanvas.style.height = `${height}px`
				this.topCanvas.style.width = `${width}px`
				this.topCanvas.style.height = `${height}px`
				
				if (!this.isLoaded) {
					this.load()
				}
				this.update()
			})
		})
		resizeObserver.observe(this.canvasContainer)
	}

	public load() {
		if (!this.isLoaded) {
			const fabricStore = useFabricStore()
			createTestShapes4Fabric(fabricStore.fabricCanvas)
			useGlobalStore().init()
			this.isLoaded = true
		}
	}
	
	public update() {
		const fabricStore = useFabricStore()
		const fabricCanvas = fabricStore.fabricCanvas
		if (this.bottomCanvas && this.topCanvas) {
			const viewSize = this.getViewMetrics()
			this.bottomCtx.clearRect(0, 0, viewSize.viewWidth, viewSize.viewHeight)
			this.topCtx.clearRect(0, 0, viewSize.viewWidth, viewSize.viewHeight)
			if (fabricCanvas.getZoom() < GRID_LAYER_SCALE) {
				this.gridRenderer.render(this.bottomCtx, viewSize)
			} else {
				this.gridRenderer.render(this.topCtx, viewSize)
			}
			this.rulerRenderer.render(this.topCtx, viewSize)
		}
		fabricCanvas.renderAll()
	}
	
	private getViewMetrics() {
		const fabricStore = useFabricStore()
		const fabricCanvas = fabricStore.fabricCanvas
		return {
			viewWidth: this.canvas.width,
			viewHeight: this.canvas.height
		}
	}
}