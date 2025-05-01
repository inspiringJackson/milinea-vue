// src/paper-core/tools/ZoomView.ts
import { MAX_ZOOM_SCALE, MIN_ZOOM_SCALE } from "../../../config/constants"
import { RenderEngine } from "../../renderers/RenderEngine"
import paper from "paper"

export function ZoomView(
	view: paper.View,
	event : WheelEvent,
	renderEngine: RenderEngine
) {
	const delta = event.deltaY > 0 ? 0.9 : 1.1
	const currentZoom = view.zoom
	const targetZoom = currentZoom * delta
	const clampedZoom = Math.min(Math.max(targetZoom, MIN_ZOOM_SCALE), MAX_ZOOM_SCALE)
	const clampedScale = clampedZoom / currentZoom

	const mousePoint = new paper.Point(event.offsetX, event.offsetY)
	const viewPosition = view.viewToProject(mousePoint)

	if (clampedScale !== 1) {
		view.scale(clampedScale, viewPosition)
	}
	renderEngine.render()
}