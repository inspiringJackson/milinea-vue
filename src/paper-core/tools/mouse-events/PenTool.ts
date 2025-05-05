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

export class PenTool implements ITool {
	private tool: paper.Tool
	private startPoint: paper.Point | null = null
	private path: paper.Path | null = null
	
	constructor(
		protected paper : paper.PaperScope,
	) {
		this.tool = new this.paper.Tool()
		this.setupEventHandlers()
	}
	
	private setupEventHandlers() {
		this.tool.onMouseDown = (e: paper.ToolEvent) => {
			if (e.event.button === 0) {
				if (!this.path) {
					console.log('create path')
					this.startPoint = e.point
					this.path = this.createPath(e.point)
					this.path.add(e.point)
					console.log(this.path)
				} else {
					if (this.startPoint &&
							e.point.getDistance(this.startPoint) < AUTO_ADSORB_DISTANCE / usePaperStore().zoomScale && 
							this.path.segments.length > 1) {
						this.path.lastSegment.point = this.startPoint
						this.path.closePath()
						this.path = null
						usePaperStore().setCurrentTool(ToolModes.SELECT)
						// tofix: SideTools component should be updated but it's not
					} else {
						this.path.add(e.point)
					}
				} 
			}
		}
		
		this.tool.onMouseMove = (e: paper.ToolEvent) => {
			if (e.modifiers.space && this.path) {
				this.path.remove()
				this.path = null
				usePaperStore().setCurrentTool(ToolModes.SELECT)
			}
			if (this.path) {
				this.path.lastSegment.point = e.point
			}
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