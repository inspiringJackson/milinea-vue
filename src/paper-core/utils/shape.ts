// src/paper-core/utils/shape.ts
import paper from 'paper'
import { BOUNDING_BOX_HOVER_STROKE_WIDTH, BOUNDING_BOX_STROKE_COLOR, PAPER_BACKGROUND_COLOR } from '../config/constants'
import { usePaperStore } from '../../stores/usePaperStore'

// 给图形添加悬停、鼠标选中交互
// english: add hover and select interaction to the item
export function addHoverAndSelect(item : paper.Item) {
	const bounds = item.bounds
	item.selectedColor = new paper.Color(BOUNDING_BOX_STROKE_COLOR)
	const hitArea = new paper.Path.Rectangle({
		selected: false,
		selectedColor: BOUNDING_BOX_STROKE_COLOR,
		point: bounds.topLeft,
		size: bounds.size,
		strokeColor: new paper.Color(BOUNDING_BOX_STROKE_COLOR),
		strokeWidth: BOUNDING_BOX_HOVER_STROKE_WIDTH / usePaperStore().zoomScale,
		visible: false,
		parent: item,
		data: {
			isHitArea: true
		}
	})

	item.on('mouseenter', function () {
		if (!bounds.selected && !hitArea.visible) {
			hitArea.visible = true
		}
	})
	
	item.on('mouseleave', function () {
		if (!bounds.selected && hitArea.visible) {
			hitArea.visible = false
		}
	})

	item.on('mousedown', function (e : paper.MouseEvent) {
		const paperStore = usePaperStore()

		if (!e.event.shiftKey) {
			// 非shift按下，取消所有选中
			// english: cancel all selected when not shift key
			paperStore.project.getItems({}).forEach(otherItem => {
				if (otherItem !== this) {
					bounds.selected = false
				}
			})
		}
		
		if (bounds.selected) {
			bounds.selected = false
		} else {
			hitArea.visible = false
			bounds.selected = true
		}
	})
}

