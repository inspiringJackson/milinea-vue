// src/paper-core/renderers/RenderEngine.ts
import { RulerRenderer } from "./ruler/RulerRenderer"
import { createTestShapes } from "../../demo/testShapes"
import { usePaperStore } from "../../stores/usePaperStore"
import paper from "paper"

export class RenderEngine {
	private ctx : CanvasRenderingContext2D
	private rulerRenderer = new RulerRenderer()
	
	constructor(
		private canvas : HTMLCanvasElement,
	) {
		this.ctx = canvas.getContext('2d')
		this.setupResizeObserver()
	}
	
	private setupResizeObserver() {
		const paperStore = usePaperStore()
		const resizeObserver = new ResizeObserver(entries => {
			const { width, height } = entries[0].contentRect
			paperStore.scope.view.viewSize = new paper.Size(width, height)
			this.render()
		})
		resizeObserver.observe(this.canvas)
	}
	
	public render() {
		createTestShapes()
		this.rulerRenderer.render()
		
	}
}