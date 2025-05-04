// src/pape-core/renderers/ruler/RulerMaskRenderer.ts
import {
	PAPER_BACKGROUND_COLOR,
	RULER_MAIN_TICK_HEIGHT,
	RULER_TEXT_FONT_SIZE,
	RULER_TOP_MASK_WIDTH
} from '../../../config/constants'

function initial(
	ctx: CanvasRenderingContext2D
) {
	ctx.save()
	ctx.resetTransform()

	ctx.globalCompositeOperation = 'source-over'
}

export function renderBottomMask(
	ctx: CanvasRenderingContext2D,
	viewSize: {
		viewWidth: number,
		viewHeight: number
	}
) {
	initial(ctx)
	
	const { viewWidth, viewHeight } = viewSize
	
	ctx.fillStyle = PAPER_BACKGROUND_COLOR
	ctx.fillRect(0, 0, viewWidth, RULER_MAIN_TICK_HEIGHT + RULER_TEXT_FONT_SIZE + 1)
	ctx.fillStyle = PAPER_BACKGROUND_COLOR
	ctx.fillRect(0, 0, RULER_MAIN_TICK_HEIGHT + RULER_TEXT_FONT_SIZE + 1, viewHeight)
	ctx.restore()
}

export function renderTopMask(
	ctx: CanvasRenderingContext2D
) {
	initial(ctx)
	
	// 宽高以水平矩形为准
	// english: mask width and height are based on the horizontal rectangle
	
	const horizontalGradient = ctx.createLinearGradient(RULER_TOP_MASK_WIDTH, 0, 0, 0)
	horizontalGradient.addColorStop(0, PAPER_BACKGROUND_COLOR + '00')
	horizontalGradient.addColorStop(0.5, PAPER_BACKGROUND_COLOR + 'FF')
	ctx.fillStyle = horizontalGradient
	ctx.fillRect(0, 0, RULER_TOP_MASK_WIDTH, RULER_MAIN_TICK_HEIGHT + RULER_TEXT_FONT_SIZE + 1)
	
	const verticalGradient = ctx.createLinearGradient(0, RULER_TOP_MASK_WIDTH, 0, 0)
	verticalGradient.addColorStop(0, PAPER_BACKGROUND_COLOR + '00')
	verticalGradient.addColorStop(0.5, PAPER_BACKGROUND_COLOR + 'FF')
	ctx.fillStyle = verticalGradient
	ctx.fillRect(0, 0, RULER_MAIN_TICK_HEIGHT + RULER_TEXT_FONT_SIZE + 1, RULER_TOP_MASK_WIDTH)
	ctx.restore()
}