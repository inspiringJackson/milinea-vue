// src/paper-core/tools/tool-events/factories/shape/BaseShapeTool.ts
import { ITool, } from "../../../../types/tools"
import { 
	DEFAULT_SHAPE_FILL_COLOR,
} from "../../../../config/constants"
import { usePaperStore } from "../../../../../stores/usePaperStore"
import { RenderEngine } from "../../../../renderers/RenderEngine"
import { ToolModes } from "../../../../config/enums"
import paper from "paper"

export abstract class BaseShapeTool implements ITool {
	protected tool : paper.Tool
	protected startPoint : paper.Point | null = null
	protected currentShape : paper.Item | null = null

	constructor(
		protected paper : paper.PaperScope,
		protected renderEngine: RenderEngine
	) {
		this.tool = new this.paper.Tool()
		this.setupEventHandlers()
	}

	private setupEventHandlers() {
		this.tool.onMouseDown = (e : paper.ToolEvent) => {
			if (e.event.button === 0) {
				this.startPoint = e.point
				this.currentShape = this.createShape(e.point)
				// this.renderEngine.updateRender()
			}
			
		}

		this.tool.onMouseDrag = (e : paper.ToolEvent) => {
			if (this.currentShape && this.startPoint) {
				this.updateShape(e)
				
			}
		}

		this.tool.onMouseUp = () => {
			this.finalizeShape()
			this.startPoint = null
			this.currentShape = null
			// this.renderEngine.updateRender()
			usePaperStore().setCurrentTool(ToolModes.SELECT)
		}
	}

	abstract get name() : string

	protected abstract createShape(startPoint : paper.Point) : paper.Item
	protected abstract updateShape(e : paper.ToolEvent) : void

	activate() {
		this.tool.activate()
	}

	deactivate() {
		this.tool.remove()
	}

	private finalizeShape() {
		if (this.currentShape) {
			// 应用最终样式到正式图层
			this.applyFinalStyle(this.currentShape)
		}
	}

	protected applyFinalStyle(item : paper.Item) {
		// item.strokeColor = new this.paper.Color(this.style.stroke)
		item.fillColor = new this.paper.Color(DEFAULT_SHAPE_FILL_COLOR)
	}
}