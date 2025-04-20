// src/canvas-core/utils/coordinate.ts
export function screenToCanvas(
	point : { x : number; y : number },
	offset : { x : number; y : number },
	zoom : number
) {
	return {
		x: (point.x - offset.x) / zoom,
		y: (point.y - offset.y) / zoom
	}
}

export function canvasToScreen(
	point : { x : number; y : number },
	offset : { x : number; y : number },
	zoom : number
) {
	return {
		x: point.x * zoom + offset.x,
		y: point.y * zoom + offset.y
	}
}