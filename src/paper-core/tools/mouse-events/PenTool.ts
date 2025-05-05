// src/paper-core/tools/mouse-events/PenTool.ts
import paper from 'paper'
import { DEFAULT_PATH_STROKE_COLOR } from '../../config/constants'

interface IPathCreator {
	startCreation() : void
	dispose() : void
}

class PathCreator implements IPathCreator {
	protected currentPath : paper.Path | null = null
	protected firstPoint : paper.Point | null = null
	protected isCreating : boolean = false

	constructor(protected penTool : PenTool) { }

	onMouseDown(event : paper.ToolEvent) {
		console.log('onMouseDown', event)
		if (!this.currentPath) {
			console.log('create new path')
			this.currentPath = new paper.Path({
				segments: [event.point],
				strokeColor: DEFAULT_PATH_STROKE_COLOR,
				strokeWidth: 1
			})
			this.firstPoint = event.point
			this.currentPath.add(event.point)
		}

		if (this.firstPoint && event.point.getDistance(this.firstPoint) < 5 && this.currentPath.segments.length > 1) {
			this.currentPath.lastSegment.point = this.firstPoint
			this.currentPath.closePath()
			this.currentPath = null
		} else {
			this.currentPath.add(event.point)
		}
	}

	onMouseMove(event : paper.ToolEvent) {
		if (this.currentPath) {
			this.currentPath.lastSegment.point = event.point
		}
	}

	public startCreation() : void {
		this.isCreating = true
		console.log('startCreation')
		this.penTool.tool.onMouseDown = this.onMouseDown.bind(this)
		this.penTool.tool.onMouseMove = this.onMouseMove.bind(this)
	}

	public dispose() : void {
		this.isCreating = false
		// this.currentPath?.remove()
		if (this.penTool.tool) {
			this.penTool.tool.onMouseDown = null
			this.penTool.tool.onMouseMove = null
			this.penTool.tool.onMouseDrag = null
			this.penTool.tool.onMouseUp = null
		}
	}
}



export class PenTool {
	private currentCreator : IPathCreator | null = null
	tool : paper.Tool | null = null

	createPath(tool : paper.Tool) : void {
		this.tool = tool
		this.currentCreator?.dispose()
		this.currentCreator = new PathCreator(this)
		this.currentCreator.startCreation()
	}
}