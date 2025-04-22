// src/canvas-core/renderers/ruler/RulerRenderer.ts
import { useCanvasStore } from './../../../stores/useCanvasStore'
import { getRulerStep } from './../../utils/rulerStep'
import { renderBottomMask, renderTopMask } from './RulerMask'

export class RulerRenderer {
	public render(
		ctx: CanvasRenderingContext2D, 
		devicePixelRatio : number,
		viewSize : {viewWidth : number, viewHeight : number}
	) {
		renderBottomMask(ctx, devicePixelRatio, viewSize)
		
		const store = useCanvasStore()
		const { offsetX, offsetY } = store
		const step = getRulerStep(store.zoom)
		
		ctx.save()
		ctx.resetTransform()
		ctx.scale(devicePixelRatio, devicePixelRatio)
		
		ctx.strokeStyle = '#444'
		ctx.fillStyle = '#aaa'
		const fontSize = 10
		ctx.font = `${fontSize}px Arial` // '10px Arial'
		ctx.lineWidth = 0.5
		
		// 水平标尺绘制
		this.renderHorizontalRuler(ctx, viewSize, step, offsetX, store.zoom)
		
		// 垂直标尺绘制
		this.renderVerticalRuler(ctx, viewSize, step, offsetY, store.zoom)
		
		ctx.restore()
		
		renderTopMask(ctx, devicePixelRatio)
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
		for (let sceneX = startSceneX; sceneX <= visibleEnd + offsetX * zoom; sceneX += step) {
			const viewX = sceneX * zoom + offsetX // * zoom
	
			// 高缩放级别处理逻辑
			// zoom >= 100: use 10px height ruler scale
			if (zoom === 100) {
				// 统一使用10px高度的刻度线
				//english: use 10px height ruler scale
				ctx.moveTo(viewX, 0)
				ctx.lineTo(viewX, 10)
			} else {
				// 常规主副刻度逻辑
				// english: normal main and sub ruler logic
				const isMain = (sceneX / step) % 5 === 0
				const height = isMain ? 15 : 10
				ctx.moveTo(viewX, 0)
				ctx.lineTo(viewX, height)
			}
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
		for (let sceneY = startSceneY; sceneY <= visibleEnd + offsetY * zoom; sceneY += step) {
			const viewY = sceneY * zoom + offsetY
	
			if (zoom === 100) {
				ctx.moveTo(0, viewY)
				ctx.lineTo(10, viewY)
			} else {
				const isMain = (sceneY / step) % 5 === 0
				const width = isMain ? 15 : 10
				ctx.moveTo(0, viewY)
				ctx.lineTo(width, viewY)
			}
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
			ctx.translate(21, viewPos)
			ctx.rotate(-Math.PI / 2)
		} else {
			ctx.translate(viewPos, 21)
		}
		
		ctx.fillText(`${scenePos}`, 0, 0)
		ctx.restore()
	}
}