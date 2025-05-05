// src/paper-core/tools/toolManager.ts
import { usePaperStore } from "../../stores/usePaperStore"
import { ZoomView } from "./wheel-events/ZoomView"
import { MoveView } from "./mouse-events/MoveView"
import { PanView } from "./wheel-events/PanView"
import { ToolModes } from "../config/enums"
import { GraphicFactory } from "../factories/graphic/GraphicCreator"
import { PenTool } from "./mouse-events/PenTool"
import paper from "paper"

export class ToolManager {
	private paperStore : ReturnType<typeof usePaperStore>
	private graphicFactory : GraphicFactory
	private penTool : PenTool
	private isViewMoving = false

	constructor() {
		this.paperStore = usePaperStore()
		this.graphicFactory = new GraphicFactory()
		this.penTool = new PenTool()
		this.initialize()
	}

	private initialize() {
		this.setupViewEvents()
		this.setupToolEvents()
	}

	private setupViewEvents() {
		const view = this.paperStore.scope!.view

		view.onMouseDown = (event : paper.MouseEvent) => this.handleViewMouseDown(event)
		view.onMouseDrag = (event : paper.MouseEvent) => this.handleViewMouseDrag(event)
		view.onMouseUp = (event : paper.MouseEvent) => this.handleViewMouseUp(event)

		view.element.addEventListener('wheel', (event : WheelEvent) =>
			this.handleWheel(event))
	}

	private setupToolEvents() {
		const tool = new paper.Tool() // this.paperStore.scope.tool!
		// tool.activate()

		// tool.onMouseDown = null
		// tool.onMouseDrag = null
		// tool.onMouseMove = null
		// tool.onMouseUp = null
		// tool.onKeyDown = null

		tool.onMouseDown = (event : paper.ToolEvent) =>
			this.handleToolMouseDown(event, tool)
		tool.onMouseDrag = (event : paper.ToolEvent) =>
			this.handleToolMouseDrag(event, tool)
		tool.onMouseMove = (event : paper.ToolEvent) =>
			this.handleToolMouseMove(event, tool)
		tool.onKeyDown = (event : paper.KeyEvent) =>
			this.handleKeyDown(event, tool)
	}

	private handleViewMouseDown(event : paper.MouseEvent) {
		if (this.paperStore.currentTool === ToolModes.HAND_TOOL) {
			this.isViewMoving = true
			this.paperStore.dragStart = event.point
			this.paperStore.originalCenter = this.paperStore.scope!.view.center.clone()
			MoveView('down', event, this.paperStore.scope!.view, this.paperStore.renderEngine)
		}
	}

	private handleViewMouseDrag(event : paper.MouseEvent) {
		if (this.isViewMoving && this.paperStore.currentTool === ToolModes.HAND_TOOL) {
			MoveView('drag', event, this.paperStore.scope!.view, this.paperStore.renderEngine)
		}
	}

	private handleViewMouseUp(event : paper.MouseEvent) {
		if (this.isViewMoving) {
			this.isViewMoving = false
			MoveView('up', event, this.paperStore.scope!.view, this.paperStore.renderEngine)
		}
	}

	private handleToolMouseDown(event : paper.ToolEvent, tool : paper.Tool) {
		// console.log(event,this.paperStore.currentTool)
		switch (this.paperStore.currentTool) {
			case ToolModes.RECTANGLE:
				this.graphicFactory.createRectangle(tool)
				break
			case ToolModes.ELLIPSE:
				this.graphicFactory.createEllipse(tool)
				break
			case ToolModes.LINE:
				this.graphicFactory.createLine(tool)
				break
			case ToolModes.PEN:
				this.penTool.createPath(tool)
				break
		}
	}

	private handleToolMouseMove(event : paper.ToolEvent, tool : paper.Tool) {
		switch (this.paperStore.currentTool) {
			// case ToolModes.PEN:
			// 	this.penTool.createPath()
			// 	break
		}
	}

	private handleToolMouseDrag(event : paper.ToolEvent, tool : paper.Tool) {
		// 处理工具相关的拖拽逻辑
	}

	private handleKeyDown(event : paper.KeyEvent, tool : paper.Tool) {
		// 处理快捷键逻辑
	}

	private handleWheel(event : WheelEvent) {
		event.preventDefault()
		const view = this.paperStore.scope!.view

		if (event.ctrlKey) {
			ZoomView(view, event, this.paperStore.renderEngine)
		} else {
			const panType = this.getPanType(event)
			PanView(panType, view, event, this.paperStore.renderEngine, this.paperStore.zoomScale)
		}
	}

	private getPanType(event : WheelEvent) : 'horizontal' | 'vertical' | 'diagonal' | 'antiDiagonal' {
		if (event.shiftKey && !event.altKey) return 'horizontal'
		if (event.ctrlKey && event.shiftKey) return 'antiDiagonal'
		if (event.shiftKey && event.altKey) return 'diagonal'
		return 'vertical'
	}

	public switchTool(toolMode : ToolModes) {
		this.paperStore.currentTool = toolMode
		this.graphicFactory.cancelCreation()
	}
}

// export function initTool() {
// 	const paperStore = usePaperStore()
// 	const view = paperStore.scope.view
// 	paperStore.tool = new paper.Tool()

// 	view.onMouseDown = (event) => {
// 		console.log(event)
// 	}

// 	view.onMouseDrag = (event) => {

// 	}

// 	view.onMouseMove = (event) => {

// 	}

// 	view.onMouseUp = (event) => {

// 	}

// 	view.onMouseEnter = (event) => {
// 	}

// 	view.onMouseLeave = (event) => {
// 	}

// 	view.onClick = (event) => {
// 	}

// 	view.onDoubleClick = (event) => {
// 	}

// 	view.element.addEventListener('wheel', (event) => {
// 		// console.log(event)
// 		// paperStore.scope.activate()
// 		event.preventDefault()
// 		if (event.ctrlKey && !event.shiftKey && !event.altKey) {
// 			ZoomView(view, event, paperStore.renderEngine)
// 		} else if (!event.ctrlKey && event.shiftKey && !event.altKey) {
// 			// ←→
// 			PanView('horizontal', view, event, paperStore.renderEngine, paperStore.zoomScale)
// 		} else if (event.ctrlKey && event.shiftKey && !event.altKey) {
// 			// ↙↗
// 			PanView('antiDiagonal', view, event, paperStore.renderEngine, paperStore.zoomScale)
// 		} else if (!event.ctrlKey && event.shiftKey && event.altKey) {
// 			// ↖↘
// 			PanView('diagonal', view, event, paperStore.renderEngine, paperStore.zoomScale)
// 		} else {
// 			// ↑↓
// 			PanView('vertical', view, event, paperStore.renderEngine, paperStore.zoomScale)
// 		}
// 	})


// 	paperStore.tool.onMouseDown = (event) => {
// 		const currentTool = paperStore.currentTool
// 		if (currentTool === ToolModes.HAND_TOOL && event.event.button === 0) {
// 			MoveView('down', event, view, paperStore.renderEngine)
// 		}
// 	}

// 	paperStore.tool.onMouseDrag = (event) => {
// 		const currentTool = paperStore.currentTool
// 		if (currentTool === ToolModes.HAND_TOOL && event.event.button === 0) {
// 			MoveView('drag', event, view, paperStore.renderEngine)
// 		}
// 	}

// 	paperStore.tool.onMouseMove = (event) => {
// 		const currentTool = paperStore.currentTool
// 		if (currentTool === ToolModes.HAND_TOOL && event.event.button === 0) {
// 			MoveView('up', event, view, paperStore.renderEngine)
// 		}
// 	}

// 	paperStore.tool.onMouseUp = (event) => {
// 	}

// 	paperStore.tool.onKeyDown = (event) => {
// 	}

// 	paperStore.tool.onKeyUp = (event) => {
// 	}

// }