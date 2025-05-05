import paper from 'paper'
import { 
	PAPER_BACKGROUND_COLOR,
	BOUNDING_BOX_STROKE_COLOR,
	BOUNDING_BOX_HOVER_STROKE_WIDTH,
	BOUNDING_BOX_SELECTED_STROKE_WIDTH
} from '../config/constants'
import { usePaperStore } from '../stores/usePaperStore'

export function createTestShapes(scope : paper.PaperScope) {
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
	group.children.forEach(shape => {
		const bounds = shape.bounds
		const hitArea = new paper.Path.Rectangle({
			selected: false,
			selectedColor: BOUNDING_BOX_STROKE_COLOR,
			point: bounds.topLeft,
			size: bounds.size,
			fillColor: PAPER_BACKGROUND_COLOR + '01',
			strokeColor: null,
			parent: shape
		})

		hitArea.on('mouseenter', function () {
			if (!this.selected) {
				this.strokeColor = BOUNDING_BOX_STROKE_COLOR
				this.strokeWidth = BOUNDING_BOX_HOVER_STROKE_WIDTH / usePaperStore().zoomScale
			}
			usePaperStore().renderEngine.renderRuler()
		})

		hitArea.on('mouseleave', function () {
			if (!this.selected) {
				this.strokeColor = null
				this.strokeWidth = 0
			}
			usePaperStore().renderEngine.renderRuler()
		})
		
		hitArea.on('mousedown', function() {
			if (!this.selected) {
				this.selected = true
				usePaperStore().renderEngine.renderRuler()
				console.log('Selected bounds:', bounds)
			}
		})
	})
	
	group.pivot = new scope.Point(0, 0)
}