// src/canvas-core/renderers/main/MainContentRenderer.ts(
import { useCanvasStore } from './../../../stores/useCanvasStore'

export class MainContentRenderer {
	public render(ctx : CanvasRenderingContext2D, devicePixelRatio : number) {
		const store = useCanvasStore()
		ctx.resetTransform()

		// 添加缩放限制保护
		const safeZoom = Math.min(Math.max(store.zoom, 0.05), 100)

		// 应用缩放和位移
		ctx.translate(store.offsetX, store.offsetY)
		ctx.scale(safeZoom * devicePixelRatio, safeZoom * devicePixelRatio)
		
		// 绘制测试内容（后续可替换为正式内容）
		ctx.fillStyle = '#2196f3'
		ctx.fillRect(0, 0, 200, 150)
	}
}