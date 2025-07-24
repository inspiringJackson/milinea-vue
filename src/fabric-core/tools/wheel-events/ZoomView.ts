// src/fabric-core/tools/wheel-events/ZoomView.ts
import { useFabricStore } from "../../../stores/useFabricStore"
import { Canvas, Point, util } from "fabric"
import { MAX_ZOOM_SCALE, MIN_ZOOM_SCALE } from "../../config/constants"

export function ZoomView(
	e : any,
	fabricCanvas : Canvas
) {
	const delta = e.deltaY > 0 ? 0.9 : 1.1
	const currentZoom = fabricCanvas.getZoom()
	const targetZoom = currentZoom * delta
	const clampedZoom = Math.min(Math.max(targetZoom, MIN_ZOOM_SCALE), MAX_ZOOM_SCALE)
	const clampedScale = clampedZoom / currentZoom
	const mousePoint = new Point(e.offsetX, e.offsetY)
	fabricCanvas.zoomToPoint(mousePoint, clampedZoom)
	useFabricStore().renderEngine.update()
}