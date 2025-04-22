// src/canvas-core/utils/coordinate.ts
export function screenToCanvas(
	point : { x : number; y : number },
	container : HTMLElement,
	zoom : number,
	offsetX : number,
	offsetY : number
) : { x : number; y : number } {
	const rect = container.getBoundingClientRect()
	const devicePixelRatio = window.devicePixelRatio || 1
	console.log(rect)
	console.log(window.devicePixelRatio, devicePixelRatio)
	console.log(point)
	console.log(zoom)
	console.log(offsetX)
	console.log(offsetY)
	return {
		x: (point.x / devicePixelRatio - offsetX) / zoom,
		y: (point.y / devicePixelRatio - offsetY) / zoom
	}
}

export function canvasToScreen(
	point : { x : number; y : number },
	container : HTMLElement,
	zoom : number,
	offsetX : number,
	offsetY : number
) : { x : number; y : number } {
	const rect = container.getBoundingClientRect()
	const devicePixelRatio = window.devicePixelRatio || 1

	return {
		x: (point.x * zoom + offsetX) * devicePixelRatio,
		y: (point.y * zoom + offsetY) * devicePixelRatio
	}
}