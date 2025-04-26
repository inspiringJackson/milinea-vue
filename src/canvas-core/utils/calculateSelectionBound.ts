// src/canvas-core/utils/calculateSelectionBound.ts
import { useCanvasStore } from "../../stores/useCanvasStore"

export type BoundingBox = {
	x : number
	y : number
	width : number
	height : number
}

export function calculateSelectionBound() : BoundingBox {
	const store = useCanvasStore()
	const layers = store.selectedLayers
	if (layers.length === 0) return { x: 0, y: 0, width: 0, height: 0 }

	// 如果正在拖拽，使用实时位置计算
	// english: If dragging, use real-time position calculation
	if (store.dragState.isDragging) {
		const xs = layers.flatMap(l => [l.boundingBox.position.x, l.boundingBox.position.x + l.boundingBox.size.width])
		const ys = layers.flatMap(l => [l.boundingBox.position.y, l.boundingBox.position.y + l.boundingBox.size.height])

		return {
			x: Math.min(...xs),
			y: Math.min(...ys),
			width: Math.max(...xs) - Math.min(...xs),
			height: Math.max(...ys) - Math.min(...ys)
		}
	}

	// 否则使用原始位置计算
	// english: Otherwise, use original position calculation
	const xs = layers.flatMap(l => {
		const original = store.dragState.originalPositions.find(o => o.id === l.id)
		const x = original ? original.x : l.boundingBox.position.x
		return [x, x + l.boundingBox.size.width]
	})
	const ys = layers.flatMap(l => {
		const original = store.dragState.originalPositions.find(o => o.id === l.id)
		const y = original ? original.y : l.boundingBox.position.y
		return [y, y + l.boundingBox.size.height]
	})

	return {
		x: Math.min(...xs),
		y: Math.min(...ys),
		width: Math.max(...xs) - Math.min(...xs),
		height: Math.max(...ys) - Math.min(...ys)
	}
}