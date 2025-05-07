// src/paper-core/utils/shape.ts
import paper from 'paper'
import { 
	BOUNDING_BOX_STROKE_COLOR, 
	PAPER_BACKGROUND_COLOR,
	BOUNDING_BOX_HOVER_STROKE_WIDTH
} from '../config/constants'
import { ToolModes } from '../config/enums'
import { usePaperStore } from '../../stores/usePaperStore'

// 给图形添加悬停、鼠标选中交互
// english: add hover and select interaction to the item
export function addHoverAndSelect(item : paper.Item) {
	const paperStore = usePaperStore()
	const bounds = item.bounds
	item.selectedColor = new paper.Color(BOUNDING_BOX_STROKE_COLOR)
	const hitArea = new paper.Path.Rectangle({
		selected: false,
		selectedColor: BOUNDING_BOX_STROKE_COLOR,
		point: bounds.topLeft,
		size: bounds.size,
		strokeColor: new paper.Color(BOUNDING_BOX_STROKE_COLOR),
		strokeWidth: BOUNDING_BOX_HOVER_STROKE_WIDTH,
		strokeScaling: false,
		visible: false,
		parent: item,
		data: {
			isHitArea: true
		}
	})

	item.on('mouseenter', function () {
		if (!bounds.selected && !hitArea.visible && paperStore.currentTool === ToolModes.SELECT) {
			hitArea.visible = true
		}
	})
	
	item.on('mouseleave', function () {
		if (!bounds.selected && hitArea.visible && paperStore.currentTool === ToolModes.SELECT) {
			hitArea.visible = false
		}
	})

	item.on('mousedown', function (e : paper.MouseEvent) {
		if (paperStore.currentTool === ToolModes.SELECT && e.event.button === 0) {
			if (!e.event.shiftKey) {
				console.log('clear all selected')
				// 非shift按下，取消所有选中
				// english: cancel all selected when not shift key
				paperStore.project.getItems({}).forEach(otherItem => {
					if (otherItem !== this) {
						otherItem.bounds.selected = false
					}
				})
			}
			
			if (bounds.selected) {
				bounds.selected = false
			} else {
				hitArea.visible = false
				bounds.selected = true
			}
		}
	})
}

