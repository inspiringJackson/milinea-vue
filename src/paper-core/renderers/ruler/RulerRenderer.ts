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
		this.rulerLayer = new paper.Layer()
		// this.maskLayer = new paper.Layer()
		this.tickColor = new paper.Color(RULER_TICK_MARK_COLOR)
		this.textColor = new paper.Color(RULER_TEXT_COLOR)
		// this.maskLayer.activate()
	}

	public render(
		viewSize : {
			width : number,
			height : number
		}
	) {
		const store = usePaperStore()
		const { scope } = store
		const view = scope.view
		// const step = getRulerStep(zoomScale)
		this.rulerLayer.applyMatrix = false
		this.rulerLayer.matrix = view.matrix.inverted()

		this.clearRuler()
		this.rulerLayer.activate()

		// this.renderMasks()
		this.renderHorizontalRuler(view)
		this.renderVerticalRuler(view)
	}

	private clearRuler() {
		this.rulerLayer.removeChildren()
		// this.maskLayer.removeChildren()
	}

	private renderHorizontalRuler(
		view : paper.View,
		// viewSize: {
		// 	width: number,
		// 	height: number
		// },
		// step: number,
		// offsetX: number,
		// zoom: number
	) {
		const step = getRulerStep(view.zoom)
		const bounds = view.bounds
		const visibleStart = bounds.x
		const visibleEnd = visibleStart + bounds.width

		const startSceneX = Math.floor(visibleStart / step) * step

		for (let sceneX = startSceneX; sceneX <= visibleEnd; sceneX += step) {
			const isMain = (sceneX / step) % 5 === 0
			const height = isMain ? RULER_MAIN_TICK_HEIGHT : RULER_SUB_TICK_HEIGHT

			const path = new paper.Path()
			path.strokeColor = this.tickColor
			path.strokeWidth = RULER_TICK_STROKE_WIDTH
			path.add(new paper.Point(sceneX, 0))
			path.add(new paper.Point(sceneX, height))

			if (isMain) {
				this.createTextLabel(
					Math.round(sceneX).toString(),
					new paper.Point(sceneX, height + 2),
					false
				)
			}
		}
	}

	private renderVerticalRuler(
		view : paper.View,
		// viewSize: {
		// 	width: number,
		// 	height: number
		// },
		// step: number,
		// offsetY: number,
		// zoom: number
	) {
		const step = getRulerStep(view.zoom)
		const bounds = view.bounds
		const visibleStart = bounds.y
		const visibleEnd = visibleStart + bounds.height

		const startSceneY = Math.floor(visibleStart / step) * step

		for (let sceneY = startSceneY; sceneY <= visibleEnd; sceneY += step) {
			const isMain = (sceneY / step) % 5 === 0
			const width = isMain ? RULER_MAIN_TICK_HEIGHT : RULER_SUB_TICK_HEIGHT

			const path = new paper.Path()
			path.strokeColor = this.tickColor
			path.strokeWidth = RULER_TICK_STROKE_WIDTH
			path.add(new paper.Point(0, sceneY))
			path.add(new paper.Point(width, sceneY))

			if (isMain) {
				this.createTextLabel(
					Math.round(sceneY).toString(),
					new paper.Point(width + 2, sceneY),
					true
				)
			}
		}
	}

	private createTextLabel(
		label : string,
		position : paper.Point,
		isVertical : boolean
	) {
		const textItem = new paper.PointText(position)
		textItem.content = label
		textItem.fillColor = this.textColor
		textItem.fontSize = RULER_TEXT_FONT_SIZE
		textItem.fontFamily = RULER_TEXT_FONT_FAMILY

		if (isVertical) {
			textItem.rotation = -90
			textItem.justification = 'center'
			textItem.position = new paper.Point(RULER_MAIN_TICK_HEIGHT + 2, position.y + RULER_TEXT_FONT_SIZE)
		} else {
			textItem.justification = 'center'
			textItem.position = new paper.Point(position.x, 21)
		}
	}
}