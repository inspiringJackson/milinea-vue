// src/paper-core/tools/mouse-events/PenTool.ts
import paper from 'paper'
import { 
	DEFAULT_PATH_STROKE_COLOR,
	DEFAULT_PATH_STROKE_WIDTH,
	AUTO_ADSORB_DISTANCE
} from '../../config/constants'
import { ITool } from '../../types/tools'
import { usePaperStore } from '../../../stores/usePaperStore'
import { ToolModes } from '../../config/enums'
import { RenderEngine } from '../../renderers/RenderEngine'
import { addHoverAndSelect } from '../../utils/shape'

export class PenTool implements ITool {
	private tool: paper.Tool
	private startPoint: paper.Point | null = null
	private path: paper.Path | null = null
	
	constructor(
		protected paper : paper.PaperScope,
		protected renderEngine: RenderEngine
	) {
		this.tool = new this.paper.Tool()
		this.setupEventHandlers()
	}
	
	private setupEventHandlers() {
		this.tool.onMouseDown = (e: paper.ToolEvent) => {
			if (e.event.button === 0) {
				if (!this.path) {
					this.startPoint = e.point
					this.path = this.createPath(e.point)
					this.path.add(e.point)
				} else {
					if (this.startPoint &&
							e.point.getDistance(this.startPoint) < AUTO_ADSORB_DISTANCE &&
							this.path.segments.length > 1) {
						this.path.lastSegment.point = this.startPoint
						this.path.closePath()
						addHoverAndSelect(this.path)
						this.path.bounds.selected = true
						this.path = null
						usePaperStore().setCurrentTool(ToolModes.SELECT)
					} else {
						this.path.add(e.point)
					}
				} 
			} else if (e.event.button === 2 && this.path.segments.length > 1) {
				if (this.path) {
					// this.path.remove()
					this.path.lastSegment.remove()
					addHoverAndSelect(this.path)
					this.path.bounds.selected = true
					this.path = null
					usePaperStore().setCurrentTool(ToolModes.SELECT)
				}
			}
			// this.renderEngine.updateRender()
		}
		
		this.tool.onMouseMove = (e: paper.ToolEvent) => {
			if (this.path) {
				this.path.lastSegment.point = e.point
			}
			// this.renderEngine.updateRender()
		}
	}
	
	private createPath(point: paper.Point): paper.Path {
		const path = new this.paper.Path({
			segments: [point],
			strokeColor: new paper.Color(DEFAULT_PATH_STROKE_COLOR),
			strokeWidth: DEFAULT_PATH_STROKE_WIDTH,
		})
		return path
	}
	
	get name() {
		return 'Path ' + usePaperStore().pathIndex++
	}
	
	activate() {
		this.tool.activate()
	}
	
	deactivate() {
		this.tool.remove()
	}
}