// src/paper-core/renderers/ruler/RulerRenderer.ts
import paper from 'paper'
import { usePaperStore } from '../../../stores/usePaperStore'
import { getRulerStep } from '../../../config/rulerStep'
import {
	RULER_TICK_MARK_COLOR,
	RULER_TEXT_COLOR,
	RULER_TEXT_FONT_SIZE,
	RULER_TEXT_FONT_FAMILY,
	RULER_TICK_STROKE_WIDTH,
	RULER_MAIN_TICK_HEIGHT,
	RULER_SUB_TICK_HEIGHT
} from '../../../config/constants'

export class RulerRenderer {
	private rulerLayer : paper.Layer
	private maskLayer : paper.Layer
	private tickColor : paper.Color
	private textColor : paper.Color

	constructor() {
		const store = usePaperStore()
		const previousLayer = store.scope.project.activeLayer
		this.rulerLayer = new paper.Layer()
		this.rulerLayer.applyMatrix = false
		previousLayer.activate()
		// this.maskLayer = new paper.Layer()
		this.tickColor = new paper.Color(RULER_TICK_MARK_COLOR)
		this.textColor = new paper.Color(RULER_TEXT_COLOR)
		// this.maskLayer.activate()
	}

	public render() {
		const store = usePaperStore()
		const { scope } = store
		const view = scope.view

		this.clearRuler()
		this.rulerLayer.activate()
		this.rulerLayer.matrix = new paper.Matrix().translate(view.bounds.point)
		// this.renderMasks()
		const step = getRulerStep(view.zoom)
		this.renderRuler(view, step, true)
		this.renderRuler(view, step, false)
	}

	private clearRuler() {
		this.rulerLayer.removeChildren()
		// this.maskLayer.removeChildren()
	}

	private renderRuler(view : paper.View, step : number, isHorizontal : boolean) {
		const bounds = view.bounds
		const scaleFactor = 1 / view.zoom

		// Calculate visible range
		const axisStart = isHorizontal ? bounds.x : bounds.y
		const axisLength = isHorizontal ? bounds.width : bounds.height
		const visibleEnd = axisStart + axisLength

		// Calculate starting point aligned to step
		const startScene = Math.floor(axisStart / step) * step

		// Pre-calculate tick sizes and stroke width
		const mainTickSize = RULER_MAIN_TICK_HEIGHT * scaleFactor
		const subTickSize = RULER_SUB_TICK_HEIGHT * scaleFactor
		const strokeWidth = RULER_TICK_STROKE_WIDTH * scaleFactor
		let count = 0
		for (let scene = startScene; scene <= visibleEnd; scene += step) {
			count++
			const isMain = (scene / step) % 5 === 0
			const tickSize = isMain ? mainTickSize : subTickSize

			// Create tick mark
			const path = new paper.Path({
				strokeColor: this.tickColor,
				strokeWidth: strokeWidth,
				segments: isHorizontal
					? [[scene - bounds.x, 0], [scene - bounds.x, tickSize]]
					: [[0, scene - bounds.y], [tickSize, scene - bounds.y]]
			})

			// Add text label for main ticks
			if (isMain) {
				const textOffset = (RULER_MAIN_TICK_HEIGHT + 8) * scaleFactor
				const textPosition = isHorizontal
					? new paper.Point(scene - bounds.x, textOffset)
					: new paper.Point(textOffset, scene - bounds.y)

				this.createTextLabel(
					Math.round(scene).toString(),
					textPosition,
					view.zoom,
					!isHorizontal
				)
			}
		}
		console.log(count)
	}

	private createTextLabel(
		label : string,
		position : paper.Point,
		zoom : number,
		isVertical : boolean
	) {
		new paper.PointText({
			point: position,
			content: label,
			fillColor: this.textColor,
			fontSize: RULER_TEXT_FONT_SIZE / zoom,
			fontFamily: RULER_TEXT_FONT_FAMILY,
			justification: 'center',
			rotation: isVertical ? -90 : 0
		})
	}
}