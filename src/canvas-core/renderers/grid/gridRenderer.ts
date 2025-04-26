// src/canvas-core/renderers/grid/gridRenderer.ts
import { useCanvasStore } from './../../../stores/useCanvasStore'
import { getRulerStep } from './../../utils/rulerStep'

export class GridRenderer {
	public render(
		ctx: CanvasRenderingContext2D,
		viewSize: { viewWidth: number; viewHeight: number },
	) {
		const store = useCanvasStore()
		const { offsetX, offsetY } = store
		const step = getRulerStep(store.zoom)
		
		ctx.save()
		ctx.resetTransform()
		
		ctx.strokeStyle = '#00000055'
		ctx.lineWidth = 0.5
		
		this.renderGridHorizontalLine(ctx, viewSize, step, offsetX, store.zoom)
		this.renderGridVerticalLine(ctx, viewSize, step, offsetY, store.zoom)
		
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
			const viewX = sceneX * zoom + offsetX // * zoom
			
			ctx.moveTo(viewX, 0)
			ctx.lineTo(viewX, viewSize.viewHeight)
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
			const viewY = sceneY * zoom + offsetY // * zoom
			
			ctx.moveTo(0, viewY)
			ctx.lineTo(viewSize.viewWidth, viewY)
		}
		ctx.stroke()
		ctx.restore()
	}
}