// src/paper-core/tools/toolManager.ts
import { usePaperStore } from "../../stores/usePaperStore"
import { ZoomView } from "./wheel-events/ZoomView"
import { MoveView } from "./mouse-events/MoveView"
import { PanView } from "./wheel-events/PanView"
import { ToolModes } from "../config/enums"
import paper from "paper"
import { ITool } from "../types/tools"
import { ShapeToolFactory } from "./tool-events/factories/shape/ShapeToolFactory"
import { PenTool } from "./mouse-events/PenTool"
import { ShapeType } from "../types/shape"

export class ToolManager {
	private paperStore : ReturnType<typeof usePaperStore>
	private paper : paper.PaperScope
	private tools : Map<ToolModes, ITool> = new Map()
	private currentTool : ITool | null = null
	private isViewMoving = false

	constructor() {
		this.paperStore = usePaperStore()
		this.paper = this.paperStore.scope!
		this.initialize()
	}

	private initialize() {
		this.setupViewEvents()
	}

	private setupViewEvents() {
		const view = this.paperStore.scope!.view

		view.onMouseDown = (event : paper.MouseEvent) => this.handleViewMouseDown(event)
		view.onMouseDrag = (event : paper.MouseEvent) => this.handleViewMouseDrag(event)
		view.onMouseUp = (event : paper.MouseEvent) => this.handleViewMouseUp(event)

		view.element.addEventListener('wheel', (event : WheelEvent) =>
			this.handleWheel(event))
	}

	switchTool(toolMode : ToolModes) {
		if (this.currentTool?.name === toolMode) {
			return
		}
		this.currentTool?.deactivate()
		switch (toolMode) {
			case ToolModes.SELECT:
				this.currentTool = null
				break
			case ToolModes.RECTANGLE:
				this.tools.set(ToolModes.RECTANGLE, ShapeToolFactory.createTool('rectangle', this.paper, this.paperStore.renderEngine))
				break
			case ToolModes.ELLIPSE:
				this.tools.set(ToolModes.ELLIPSE, ShapeToolFactory.createTool('ellipse', this.paper, this.paperStore.renderEngine))
				break
			case ToolModes.LINE:
				this.tools.set(ToolModes.LINE, ShapeToolFactory.createTool('line', this.paper, this.paperStore.renderEngine))
				break
			case ToolModes.PEN:
				this.tools.set(ToolModes.PEN, new PenTool(this.paper, this.paperStore.renderEngine))
				break
			default:
				this.currentTool = null
				break
		}
		
		const tool = this.tools.get(toolMode)
		if (tool) {
			tool.activate()
			this.currentTool = tool
		} else {
			this.currentTool = null
		}
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

	private handleWheel(event : WheelEvent) {
		event.preventDefault()
		const view = this.paperStore.scope!.view

		if (event.ctrlKey && !event.shiftKey) {
			ZoomView(view, event, this.paperStore.renderEngine)
		} else {
			const panType = this.getPanType(event)
			PanView(panType, view, event, this.paperStore.renderEngine, this.paperStore.zoomScale)
		}
	}

	private getPanType(event : WheelEvent) : 'horizontal' | 'vertical' | 'diagonal' | 'antiDiagonal' {
		if (!event.ctrlKey && event.shiftKey && !event.altKey) return 'horizontal'
		if (event.ctrlKey && event.shiftKey && !event.altKey) return 'antiDiagonal'
		if (!event.ctrlKey && event.shiftKey && event.altKey) return 'diagonal'
		return 'vertical'
	}
}