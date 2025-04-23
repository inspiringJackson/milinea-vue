// src/canvas-core/renderers/scrollBar/ScrollBarRenderer.ts:
import { useCanvasStore } from './../../../stores/useCanvasStore'

export class ScrollBarRenderer {
	public render(
		ctx : CanvasRenderingContext2D, 
		viewSize : {viewWidth : number, viewHeight : number}
	) {
		const store = useCanvasStore()
		
		// 保存主内容变换状态
		ctx.save()
		ctx.resetTransform()
		
		// 水平滚动条
		ctx.fillStyle = '#ddd'
		ctx.fillRect(0, viewSize.viewHeight - 16, viewSize.viewWidth, 16)
		ctx.fillStyle = '#999'
		ctx.fillRect(
			(-store.offsetX / store.zoom) * (viewSize.viewWidth / store.zoom),
			viewSize.viewHeight - 16,
			viewSize.viewWidth / store.zoom,
			16
		)
		
		// 恢复主内容变换
		ctx.restore()
	}
}