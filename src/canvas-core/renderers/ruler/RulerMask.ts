// src/canvas-core/renderers/ruler/RulerMask.ts
function initial(
	ctx: CanvasRenderingContext2D,
	devicePixelRatio: number
) {
	ctx.save()
	ctx.resetTransform()
	ctx.scale(devicePixelRatio, devicePixelRatio)
	ctx.globalCompositeOperation = 'source-over'
}

export function renderBottomMask(
	ctx: CanvasRenderingContext2D,
	devicePixelRatio: number,
	viewSize: {
		viewWidth: number,
		viewHeight: number
	}
) {
	initial(ctx, devicePixelRatio)
	
	const { viewWidth, viewHeight } = viewSize
	const maskColor = '#F5F5F5'
	
	ctx.fillStyle = maskColor
	ctx.fillRect(0, 0, viewWidth, 26)
	ctx.fillStyle = maskColor
	ctx.fillRect(0, 0, 26, viewHeight)
	ctx.restore()
}

export function renderTopMask(
	ctx: CanvasRenderingContext2D,
	devicePixelRatio: number
) {
	initial(ctx, devicePixelRatio)
	
	const maskColor = '#F5F5F5'
	
	// 宽高以水平矩形为准
	// english: mask width and height are based on the horizontal rectangle
	const maskWidth = 50
	const maskHeight = 26
	
	const horizontalGradient = ctx.createLinearGradient(maskWidth, 0, 0, 0)
	horizontalGradient.addColorStop(0, maskColor + '00')
	horizontalGradient.addColorStop(0.5, maskColor + 'FF')
	ctx.fillStyle = horizontalGradient
	ctx.fillRect(0, 0, maskWidth, maskHeight)
	
	const verticalGradient = ctx.createLinearGradient(0, maskWidth, 0, 0)
	verticalGradient.addColorStop(0, maskColor + '00')
	verticalGradient.addColorStop(0.5, maskColor + 'FF')
	ctx.fillStyle = verticalGradient
	ctx.fillRect(0, 0, maskHeight, maskWidth)
	ctx.restore()
}