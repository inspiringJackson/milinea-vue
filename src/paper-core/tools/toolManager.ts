// src/paper-core/tools/toolManager.ts
import { usePaperStore } from "../../stores/usePaperStore"
import { ZoomView } from "./wheel-events/ZoomView"
import { MoveView } from "./mouse-events/MoveView"
import { PanView } from "./wheel-events/PanView"
import { ToolModes } from "../../config/enums"
import paper from "paper"

export function initTool() {
	const paperStore = usePaperStore()
	const view = paperStore.scope.view
	paperStore.tool = new paper.Tool()
	
	view.onMouseDown = (event) => {
		
	}
	
	view.onMouseDrag = (event) => {

	}
	
	view.onMouseMove = (event) => {

	}
	
	view.onMouseUp = (event) => {

	}
	
	view.onMouseEnter = (event) => {
		
	}
	
	view.onMouseLeave = (event) => {
		
	}
	
	view.onClick = (event) => {
		
	}
	
	view.onDoubleClick = (event) => {
		
	}
	
	view.element.addEventListener('wheel', (event) => {
		// console.log(event)
		// paperStore.scope.activate()
		event.preventDefault()
		if (event.ctrlKey && !event.shiftKey && !event.altKey) {
			ZoomView(view, event, paperStore.renderEngine)
		} else if (!event.ctrlKey && event.shiftKey && !event.altKey) {
			// ←→
			PanView('horizontal', view, event, paperStore.renderEngine)
		} else if (event.ctrlKey && event.shiftKey && !event.altKey) {
			// ↙↗
			PanView('antiDiagonal', view, event, paperStore.renderEngine)
		} else if (!event.ctrlKey && event.shiftKey && event.altKey) {
			// ↖↘
			PanView('diagonal', view, event, paperStore.renderEngine)
		} else {
			// ↑↓
			PanView('vertical', view, event, paperStore.renderEngine)
		}
	})
	
	
	paperStore.tool.onMouseDown = (event) => {
		const currentTool = paperStore.currentTool
		if (currentTool === ToolModes.HAND_TOOL && event.event.button === 0) {
			MoveView('down', event, view, paperStore.renderEngine)
		}
	}
	
	paperStore.tool.onMouseDrag = (event) => {
		const currentTool = paperStore.currentTool
		if (currentTool === ToolModes.HAND_TOOL && event.event.button === 0) {
			MoveView('drag', event, view, paperStore.renderEngine)
		}
	}
	
	paperStore.tool.onMouseMove = (event) => {
		const currentTool = paperStore.currentTool
		if (currentTool === ToolModes.HAND_TOOL && event.event.button === 0) {
			MoveView('up', event, view, paperStore.renderEngine)
		}
	}
	
	paperStore.tool.onMouseUp = (event) => {
		
	}
	
	paperStore.tool.onKeyDown = (event) => {
		
	}
	
	paperStore.tool.onKeyUp = (event) => {
		
	}
	
}