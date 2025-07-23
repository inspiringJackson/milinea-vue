// src/paper-core/utils/shape.ts
import paper from 'paper'
import { 
	BOUNDING_BOX_STROKE_COLOR, 
	PAPER_BACKGROUND_COLOR,
	BOUNDING_BOX_HOVER_STROKE_WIDTH
} from '../config/constants'
import { ToolModes } from '../config/enums'
import { usePaperStore } from '../../stores/usePaperStore'
import { useHistoryStore } from '../../stores/useHistoryStore'

/**
 * 给图形添加悬停、鼠标选中交互
 * english: add hover and select interaction to the item
 */

export function addHoverAndSelect(item : paper.Item) {
	const paperStore = usePaperStore()
	const historyStore = useHistoryStore()
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
		if (
			!bounds.selected && 
			!hitArea.visible && 
			paperStore.currentTool === ToolModes.SELECT &&
			paperStore.currentMode === "DEFAULT"
		) {
			hitArea.visible = true
		}
	})
	
	item.on('mouseleave', function () {
		if (
			!bounds.selected && 
			hitArea.visible && 
			paperStore.currentTool === ToolModes.SELECT &&
			paperStore.currentMode === "DEFAULT"
		) {
			hitArea.visible = false
		}
	})

	item.onClick = function (e : paper.MouseEvent) {
		const prevSelectedItems = [...paperStore.selectedItems]

		if (
			paperStore.currentTool === ToolModes.SELECT && 
			paperStore.currentMode === "DEFAULT" &&
			e.event.button === 0
		) {
			if (!e.event.shiftKey) {
				// 非shift按下，取消所有选中
				// english: cancel all selected when not shift key
				paperStore.project.getItems({}).forEach(otherItem => {
					if (otherItem !== this) {
						otherItem.bounds.selected = false
					}
				})
				paperStore.selectedItems = [] as paper.Item[]
			}
			
			if (bounds.selected) {
				bounds.selected = false
				paperStore.selectedItems = paperStore.selectedItems.filter(item => item.id !== this.id)
			} else {
				hitArea.visible = false
				bounds.selected = true
				paperStore.selectedItems.push(this)
			}
			
			const selectedItems = paperStore.selectedItems
			historyStore.commitSelectItemChange(prevSelectedItems, selectedItems)
		}
	}
	
	item.onDoubleClick = function (e : paper.MouseEvent) {
		if (paperStore.currentTool === ToolModes.SELECT && paperStore.currentMode === "DEFAULT") {
			// 进入矢量编辑模式
			// english: enter vector editing mode
			paperStore.selectedItems = paperStore.selectedItems.filter(item => item.id !== this.id)
			paperStore.selectedItems = [] as paper.Item[]
			hitArea.visible = false
			bounds.selected = false
			this.selected = true
			
			historyStore.commitModeChange(paperStore.currentMode, "VE", this)
			paperStore.currentMode = "VE"
			paperStore.currentVEItem = this
		}
	}
}

/**
 * 取消所有选择项目
 * english: Cancel all paper items' bounds that selected
 */

export function cancelAllSelectedItems() {
	const paperStore = usePaperStore()
	const historyStore = useHistoryStore()
	const prevSelectedItems = [...paperStore.selectedItems]
	paperStore.project.getItems({}).forEach(item => {
		item.bounds.selected = false
	})
	paperStore.selectedItems = [] as paper.Item[]
	const selectedItems = paperStore.selectedItems
	historyStore.commitSelectItemChange(prevSelectedItems, selectedItems)
}

/**
 * 图形完成绘制后，立刻切回select工具模式，并且图形自动被选中
 * english: After the drawing of the graph is completed, 
 * it immediately switches back to the select tool mode, 
 * and the graph is automatically selected
 */

export function shapeDrawingFinished(item : paper.Item) {
	if (!item) return
	const paperStore = usePaperStore()
	const historyStore = useHistoryStore()
	const prevSelectedItems = [...paperStore.selectedItems]
	paperStore.selectedItems.push(item)
	const selectedItems = paperStore.selectedItems
	historyStore.commitSelectItemChange(prevSelectedItems, selectedItems)
}