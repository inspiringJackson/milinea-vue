// src/fabric-core/renderers/RenderEngine.ts
import { entries } from "lodash-es"
import { useFabricStore } from "../../stores/useFabricStore"
import { useGlobalStore } from "../../stores/useGlobalStore"
import { createTestShapes4Fabric } from "../../demo/testShapes"
import { Canvas } from "fabric"

export class RenderEngine {
	private isLoaded: boolean = false
	private ctx: CanvasRenderingContext2D
	
	constructor(
		private canvas: HTMLCanvasElement,
		private canvasContainer: HTMLDivElement
	) {
		this.ctx = canvas.getContext("2d")
		this.setupResizeObserver()
	}
	
	private setupResizeObserver() {
		const fabricStore = useFabricStore()
		const resizeObserver = new ResizeObserver(entries => {
			const { width, height } = entries[0].contentRect
			fabricStore.fabricCanvas.setDimensions({ width, height })
			if (!this.isLoaded) {
				this.load()
			}
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
}