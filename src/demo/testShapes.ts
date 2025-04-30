import paper from 'paper'

export function createTestShapes() {
	// 创建矩形
	const rect = new paper.Path.Rectangle({
		point: [0, 0],
		size: [200, 150],
		fillColor: '#e74c3c',
		strokeColor: 'black',
		strokeWidth: 2
	})

	// 创建圆形
	const circle = new paper.Path.Circle({
		center: [400, 300],
		radius: 80,
		fillColor: '#3498db',
		strokeColor: 'black',
		strokeWidth: 2
	})

	// 创建星形
	const star = new paper.Path.Star({
		center: [600, 200],
		points: 5,
		radius1: 50,
		radius2: 100,
		fillColor: '#f1c40f',
		strokeColor: 'black',
		strokeWidth: 2
	})

	// 将图形组合方便后续操作
	const group = new paper.Group([rect, circle, star])
	group.pivot = new paper.Point(0, 0)
}