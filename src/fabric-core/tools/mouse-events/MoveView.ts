// src/fabric-core/tools/mouse-events/MoveView.ts
import { useFabricStore } from "../../../stores/useFabricStore"
import { Canvas, Point } from "fabric"

export function MoveView(
	e: any,
	fabricCanvas: Canvas,
	moveStart: Point
) : Point {
	const vpt = fabricCanvas.viewportTransform.slice()
	const x = e.clientX - moveStart.x
	const y = e.clientY - moveStart.y
	vpt[4] += x
	vpt[5] += y
	fabricCanvas.setViewportTransform(vpt)
	useFabricStore().renderEngine.update()
	return new Point(e.clientX, e.clientY)
}