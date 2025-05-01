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
		// const step = getRulerStep(zoomScale)
		this.rulerLayer.matrix = view.matrix.inverted()
		// view.element.style.background = 'transparent'

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
	) {
		const step = getRulerStep(view.zoom)
		const bounds = view.bounds
		const visibleStart = bounds.x
		const visibleEnd = visibleStart + bounds.width

		const startSceneX = Math.floor(visibleStart / step) * step

		for (let sceneX = startSceneX; sceneX <= visibleEnd; sceneX += step) {
			const isMain = (sceneX / step) % 5 === 0
			const height = (isMain ? RULER_MAIN_TICK_HEIGHT : RULER_SUB_TICK_HEIGHT) / view.zoom

			const path = new paper.Path()
			path.fillColor = null
			path.strokeColor = this.tickColor
			path.strokeWidth = RULER_TICK_STROKE_WIDTH / view.zoom
			path.add(new paper.Point(sceneX, bounds.y))
			path.add(new paper.Point(sceneX, bounds.y + height))

			if (isMain) {
				this.createTextLabel(
					Math.round(sceneX).toString(),
					new paper.Point(sceneX, height + 2),
					bounds.y,
					view.zoom,
					false
				)
			}
		}
	}

	private renderVerticalRuler(
		view : paper.View,
	) {
		const step = getRulerStep(view.zoom)
		const bounds = view.bounds
		const visibleStart = bounds.y
		const visibleEnd = visibleStart + bounds.height

		const startSceneY = Math.floor(visibleStart / step) * step

		for (let sceneY = startSceneY; sceneY <= visibleEnd; sceneY += step) {
			const isMain = (sceneY / step) % 5 === 0
			const width = (isMain ? RULER_MAIN_TICK_HEIGHT : RULER_SUB_TICK_HEIGHT) / view.zoom

			const path = new paper.Path()
			path.fillColor = new paper.Color(0, 0, 0, 0)
			path.strokeColor = this.tickColor
			path.strokeWidth = RULER_TICK_STROKE_WIDTH / view.zoom
			path.add(new paper.Point(bounds.x, sceneY))
			path.add(new paper.Point(bounds.x + width, sceneY))

			if (isMain) {
				this.createTextLabel(
					Math.round(sceneY).toString(),
					new paper.Point(width + 2, sceneY),
					bounds.x,
					view.zoom,
					true
				)
			}
		}
	}

	private createTextLabel(
		label : string,
		position : paper.Point,
		bounds : number,
		zoom : number,
		isVertical : boolean
	) {
		const textItem = new paper.PointText(position)
		textItem.content = label
		textItem.fillColor = this.textColor
		textItem.fontSize = RULER_TEXT_FONT_SIZE / zoom
		textItem.fontFamily = RULER_TEXT_FONT_FAMILY

		if (isVertical) {
			textItem.rotation = -90
			textItem.justification = 'center'
			textItem.position = new paper.Point((RULER_MAIN_TICK_HEIGHT + 8) / zoom + bounds, position.y)
		} else {
			textItem.justification = 'center'
			textItem.position = new paper.Point(position.x, (RULER_MAIN_TICK_HEIGHT + 8) / zoom + bounds)
		}
		
	}
}