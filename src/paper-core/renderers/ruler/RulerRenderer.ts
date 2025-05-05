// src/paper-core/renderers/ruler/RulerRenderer.ts
import { usePaperStore } from '../../../stores/usePaperStore'
import { getRulerStep } from '../../config/rulerStep'
import { renderBottomMask, renderTopMask } from './RulerMaskRenderer'
// import { renderSelectionHelper } from './RulerSelectionHelper'

import {
	RULER_TICK_MARK_COLOR,
	RULER_TICK_STROKE_WIDTH,
	RULER_TEXT_COLOR,
	RULER_TEXT_FONT_SIZE,
	RULER_MAIN_TICK_HEIGHT,
	RULER_SUB_TICK_HEIGHT,
	RULER_TEXT_FONT_FAMILY
} from '../../config/constants'

export class RulerRenderer {
	public render(
		ctx: CanvasRenderingContext2D, 
		viewSize : {viewWidth : number, viewHeight : number}
	) {
		renderBottomMask(ctx, viewSize)
		const store = usePaperStore()
		const bounds = store.scope.view.bounds
		const offsetX = -bounds.topLeft.x * store.zoomScale
		const offsetY = -bounds.topLeft.y * store.zoomScale
		const step = getRulerStep(store.zoomScale)
		
		ctx.save()
		ctx.resetTransform()
		
		ctx.strokeStyle = RULER_TICK_MARK_COLOR
		ctx.fillStyle = RULER_TEXT_COLOR
		ctx.font = RULER_TEXT_FONT_SIZE + 'px ' + RULER_TEXT_FONT_FAMILY
		ctx.lineWidth = RULER_TICK_STROKE_WIDTH
		
		// 水平标尺绘制
		this.renderHorizontalRuler(ctx, viewSize, step, offsetX, store.zoomScale)
		
		// 垂直标尺绘制
		this.renderVerticalRuler(ctx, viewSize, step, offsetY, store.zoomScale)
		
		
		ctx.restore()
		
		renderTopMask(ctx)
		
		// renderSelectionHelper(ctx)
	}
	
	private renderHorizontalRuler(
		ctx : CanvasRenderingContext2D, 
		viewSize : { viewWidth : number, viewHeight : number }, 
		step : number, 
		offsetX : number, 
		zoom : number
	) {
		ctx.save()
	
		// 计算可见区域的逻辑坐标范围
		// english: calculate the logical coordinate range of the visible area
		const visibleStart = -offsetX / zoom
		const visibleEnd = visibleStart + viewSize.viewWidth / zoom 
		
		// 找到第一个刻度起点
		// english: find the starting point of the first ruler scale
		const startSceneX = Math.floor(visibleStart / step) * step
	
		ctx.beginPath()
		for (let sceneX = startSceneX; sceneX <= visibleEnd; sceneX += step) {
			const viewX = sceneX * zoom + offsetX // * zoom
	
			// 常规主副刻度逻辑
			// english: normal main and sub ruler logic
			const isMain = (sceneX / step) % 5 === 0
			const height = isMain ? RULER_MAIN_TICK_HEIGHT : RULER_SUB_TICK_HEIGHT
			ctx.moveTo(viewX, 0)
			ctx.lineTo(viewX, height)
			
			this.renderText(ctx, viewX, sceneX, false)
		}
		ctx.stroke()
		ctx.restore()
	}
	
	private renderVerticalRuler(
		ctx : CanvasRenderingContext2D, 
		viewSize : { viewWidth : number, viewHeight : number }, 
		step : number, 
		offsetY : number, 
		zoom : number
	) {
		ctx.save()
	
		const visibleStart = -offsetY / zoom
		const visibleEnd = visibleStart + viewSize.viewHeight / zoom
	
		const startSceneY = Math.floor(visibleStart / step) * step
	
		ctx.beginPath()
		for (let sceneY = startSceneY; sceneY <= visibleEnd; sceneY += step) {
			const viewY = sceneY * zoom + offsetY
	
			const isMain = (sceneY / step) % 5 === 0
			const width = isMain ? RULER_MAIN_TICK_HEIGHT : RULER_SUB_TICK_HEIGHT
			ctx.moveTo(0, viewY)
			ctx.lineTo(width, viewY)
				
			this.renderText(ctx, viewY, sceneY, true)
		}
		ctx.stroke()
	
		ctx.restore()
	}

	private renderText(
		ctx : CanvasRenderingContext2D, 
		viewPos : number,
		scenePos : number,
		isVertical : boolean
	) {
		ctx.save()
		ctx.textAlign = 'center'
		ctx.textBaseline = 'middle'
		
		if (isVertical) {
			ctx.translate(RULER_MAIN_TICK_HEIGHT + 6, viewPos)
			ctx.rotate(-Math.PI / 2)
		} else {
			ctx.translate(viewPos, RULER_MAIN_TICK_HEIGHT + 6)
		}
		
		ctx.fillText(`${scenePos}`, 0, 0)
		ctx.restore()
	}
}