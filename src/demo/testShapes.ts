import paper from 'paper'

export function createTestShapes(scope: paper.PaperScope) {
	// 创建矩形
	const rect = new scope.Path.Rectangle({
		point: [0, 0],
		size: [200, 150],
		fillColor: '#e74c3c',
		strokeColor: 'black',
		strokeWidth: 2
	})

	// 创建圆形
	const circle = new scope.Path.Circle({
		center: [400, 300],
		radius: 80,
		fillColor: '#3498db',
		strokeColor: 'black',
		strokeWidth: 2
	})

	// 创建星形
	const star = new scope.Path.Star({
		center: [600, 200],
		points: 5,
		radius1: 50,
		radius2: 100,
		fillColor: '#f1c40f',
		strokeColor: 'black',
		strokeWidth: 2
	})

	// 将图形组合方便后续操作
	const group = new scope.Group([rect, circle, star])
	group.pivot = new scope.Point(0, 0)
}