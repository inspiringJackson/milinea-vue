// src/fabric-core/tools/wheel-events/PanView.ts
import { useFabricStore } from "../../../stores/useFabricStore"
import { PAN_STEP } from "../../config/constants"
import { Canvas, Point, util } from "fabric"

export function PanView(
	type: 'horizontal' | 'vertical' | 'diagonal' | 'antiDiagonal',
	e: any,
	zoom: number,
	fabricCanvas: Canvas
) {
	const delta = e.deltaY * PAN_STEP * Math.log2(zoom + 1) //* PAN_STEP / zoom
	const vpt = fabricCanvas.viewportTransform.slice()
	switch (type) {
		case 'horizontal':
			vpt[4] -= delta
			break
		case 'vertical':
			vpt[5] -= delta
			break
		case 'diagonal':
			vpt[4] -= delta
			vpt[5] -= delta
			break
		case 'antiDiagonal':
			vpt[4] -= delta
			vpt[5] += delta
			break
	}
	fabricCanvas.setViewportTransform(vpt)
	useFabricStore().renderEngine.update()
}