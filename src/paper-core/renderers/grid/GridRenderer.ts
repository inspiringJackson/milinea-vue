// src/pape-core/renderers/grid/GridRenderer.ts
import { usePaperStore } from "../../../stores/usePaperStore"
import { getRulerStep } from "../../config/rulerStep"
import {
	GRID_LAYER_SCALE,
	GRID_LINE_COLOR,
	GRID_STROKE_WIDTH
} from '../../config/constants'

export class GridRenderer {
	public render(
		ctx: CanvasRenderingContext2D,
		viewSize: { viewWidth: number; viewHeight: number; dpr?: number },
	) {
		const store = usePaperStore()
		const bounds = store.scope.view.bounds
		const offsetX = -bounds.topLeft.x * store.zoomScale
		const offsetY = -bounds.topLeft.y * store.zoomScale
		const step = getRulerStep(store.zoomScale)
		const dpr = viewSize.dpr || store.devicePixelRatio
		
		ctx.save()
		ctx.resetTransform()
		ctx.scale(dpr, dpr)
		// if (store.zoomScale < 10) {
			// ctx.scale(store.zoomScale, store.zoomScale)
			ctx.clearRect(0, 0, viewSize.viewWidth, viewSize.viewHeight)
		// }
		
		
		ctx.strokeStyle = GRID_LINE_COLOR
		ctx.lineWidth = GRID_STROKE_WIDTH
		
		this.renderGridHorizontalLine(ctx, viewSize, step, offsetX, store.zoomScale)
		this.renderGridVerticalLine(ctx, viewSize, step, offsetY, store.zoomScale)
		
		ctx.restore()
	}
	
	private renderGridHorizontalLine(
		ctx: CanvasRenderingContext2D,
		viewSize: { viewWidth: number; viewHeight: number },
		step: number,
		offsetX: number,
		zoom: number
	) {
		ctx.save()
		const visibleStart = -offsetX / zoom
		const visibleEnd = visibleStart + viewSize.viewWidth / zoom
		const startSceneX = Math.floor(visibleStart / step) * step
		
		ctx.beginPath()
		for (let sceneX = startSceneX; sceneX <= visibleEnd; sceneX += step) {
			const viewX = sceneX * zoom + offsetX
			
			ctx.moveTo(viewX, 0)
			ctx.lineTo(viewX, viewSize.viewHeight )
		}
		ctx.stroke()
		ctx.restore()
	}
	
	private renderGridVerticalLine(
		ctx: CanvasRenderingContext2D,
		viewSize: { viewWidth: number; viewHeight: number },
		step: number,
		offsetY: number,
		zoom: number
	) {
		ctx.save()
		const visibleStart = -offsetY / zoom
		const visibleEnd = visibleStart + viewSize.viewHeight / zoom
		const startSceneY = Math.floor(visibleStart / step) * step
		
		ctx.beginPath()
		for (let sceneY = startSceneY; sceneY <= visibleEnd; sceneY += step) {
			const viewY = sceneY * zoom + offsetY
			
			ctx.moveTo(0, viewY)
			ctx.lineTo(viewSize.viewWidth, viewY)
		}
		ctx.stroke()
		ctx.restore()
	}
}