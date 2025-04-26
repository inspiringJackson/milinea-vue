// src/canvas-core/renderers/main/PathEditingRenderer.ts

import { useCanvasStore } from "../../../stores/useCanvasStore"

export class PathEditingRenderer {
	
	private store = useCanvasStore()
	
	public render(
		ctx: CanvasRenderingContext2D,
	) {
		ctx.resetTransform()
		ctx.translate(this.store.offsetX, this.store.offsetY)
		ctx.strokeStyle = "#18a058"
		ctx.fillStyle = "white"
		ctx.lineWidth = 1
		ctx.beginPath()
		const { logicalX, logicalY } = this.store
		const radius = 4
		ctx.arc(logicalX, logicalY, radius, 0, Math.PI * 2)
		ctx.fill()
		ctx.stroke()
	}
}