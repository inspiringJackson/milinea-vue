import { Canvas, Rect, Circle } from 'fabric'

export function createTestShapes4Fabric(canvas : Canvas) {
	const rect = new Rect({
		objectCaching: false, // 关闭缓存，否则放大会模糊，english: Disable caching to avoid blurry effect when zooming in.
		left: 0,
		top: 0,
		width: 200,
		height: 150,
		fill: '#e74c3c',
	})
	
	const circle = new Circle({
		objectCaching: false,
		left: 400,
		top: 300,
		radius: 80,
		fill: '#3498db',
	})
	
	canvas.add(rect)
	canvas.add(circle)
	canvas.renderAll()
}