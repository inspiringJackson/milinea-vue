// src/paper-core/factories/graphic/GraphicCreator.ts

import paper from 'paper'
import { usePaperStore } from '../../../stores/usePaperStore'

interface IGraphicCreator {
	startCreation() : void
	dispose() : void
}

abstract class BaseGraphicCreator implements IGraphicCreator {
	protected rectangleIndex = 0
	protected ellipseIndex = 0
	protected lineIndex = 0
	protected startPoint : paper.Point | null = null
	protected endPoint : paper.Point | null = null
	protected currentItem : paper.Item | null = null
	protected isCreating = false

	constructor(protected factory : GraphicFactory) { }

	abstract onMouseDown(event : paper.ToolEvent) : void
	abstract onMouseDrag(event : paper.ToolEvent) : void
	abstract onMouseUp(event : paper.ToolEvent) : void

	startCreation() : void {
		this.isCreating = true
		this.factory.tool.onMouseDown = this.onMouseDown.bind(this)
		this.factory.tool.onMouseDrag = this.onMouseDrag.bind(this)
		this.factory.tool.onMouseUp = this.onMouseUp.bind(this)
	}

	dispose() : void {
		this.isCreating = false
		this.startPoint = null
		// this.currentItem?.remove()
		this.currentItem = null
		if (this.factory.tool) {
			this.factory.tool.onMouseDown = null
			this.factory.tool.onMouseDrag = null
			this.factory.tool.onMouseUp = null
		}
	}

	protected applyDefaultStyle(item : paper.Item, isClosed : boolean) : void {
		if (isClosed) {
			item.fillColor = new paper.Color('#CCCCCC')
			item.strokeColor = null
		} else {
			item.strokeColor = new paper.Color('#000000')
			item.strokeWidth = 1
		}
	}
}

class RectangleCreator extends BaseGraphicCreator {
	private rectTopLeft : paper.Point | null = null
	private rectBottomRight : paper.Point | null = null
	private width = 0
	private height = 0

	onMouseDown(event : paper.ToolEvent) : void {
		console.log('RectangleCreator.onMouseDown')
		this.startPoint = event.point
		this.currentItem = new paper.Path.Rectangle({
			point: this.startPoint,
			size: [0, 0]
		})
		this.applyDefaultStyle(this.currentItem, true)
	}

	onMouseDrag(event : paper.ToolEvent) : void {
		if (!this.startPoint || !this.currentItem) {
			return
		}

		this.endPoint = event.point
		this.rectTopLeft = new paper.Point(
			Math.min(this.startPoint.x, this.endPoint.x),
			Math.min(this.startPoint.y, this.endPoint.y)
		)
		this.rectBottomRight = new paper.Point(
			Math.max(this.startPoint.x, this.endPoint.x),
			Math.max(this.startPoint.y, this.endPoint.y)
		)

		this.width = this.rectBottomRight.x - this.rectTopLeft.x
		this.height = this.rectBottomRight.y - this.rectTopLeft.y

		// 按下shift键时，创建正方形
		// english: create a square when shift key is pressed
		if (event.modifiers.shift) {
			const maxSize = Math.max(this.width, this.height);
			this.width = this.height = maxSize;
			this.rectBottomRight.x = this.rectTopLeft.x + maxSize;
			this.rectBottomRight.y = this.rectTopLeft.y + maxSize;
		}
	}

	onMouseUp() : void {
		if (!this.startPoint || !this.currentItem) {
			return
		}

		this.currentItem.remove()
		this.currentItem = new paper.Path.Rectangle({
			name: `Rectangle${++this.rectangleIndex}`,
			from: this.rectTopLeft,
			to: this.rectBottomRight
		})
		this.applyDefaultStyle(this.currentItem, true)
		this.dispose()
		this.rectangleDispose()
		console.log(usePaperStore().project)
	}

	private rectangleDispose() : void {
		this.rectTopLeft = null
		this.rectBottomRight = null
		this.width = 0
		this.height = 0
	}
}

class EllipseCreator extends BaseGraphicCreator {
	private tempRect : paper.Rectangle | null = null

	onMouseDown(event : paper.ToolEvent) : void {
		this.startPoint = event.point
		this.tempRect = new paper.Rectangle(event.point, event.point)
		this.currentItem = new paper.Path.Ellipse(this.tempRect)
		this.applyDefaultStyle(this.currentItem, true)
	}

	onMouseDrag(event : paper.ToolEvent) : void {
		if (this.startPoint && this.tempRect) {
			this.tempRect = new paper.Rectangle(this.startPoint, event.point)
				(this.currentItem as paper.Path.Ellipse).rectangle = this.tempRect
		}
	}

	onMouseUp() : void {
		this.dispose()
	}
}

class LineCreator extends BaseGraphicCreator {
	private isFirstClick = true

	onMouseDown(event : paper.ToolEvent) : void {
		if (this.isFirstClick) {
			this.startPoint = event.point
			this.currentItem = new paper.Path()
			this.currentItem.segments.push(this.startPoint)
			this.applyDefaultStyle(this.currentItem, false)
			this.isFirstClick = false
		} else {
			this.currentItem?.segments.push(new paper.Point(event.point))
			this.dispose()
		}
	}

	onMouseDrag() : void { }
	onMouseUp() : void { }

	dispose() : void {
		super.dispose()
		this.isFirstClick = true
	}
}

export class GraphicFactory {
	private currentCreator : IGraphicCreator | null = null
	tool : paper.Tool | null = null

	createRectangle(tool : paper.Tool) : void {
		console.log('createRectangle')
		this.tool = tool
		this.currentCreator?.dispose()
		this.currentCreator = new RectangleCreator(this)
		this.currentCreator.startCreation()
	}

	createEllipse(tool : paper.Tool) : void {
		this.tool = tool
		this.currentCreator?.dispose()
		this.currentCreator = new EllipseCreator(this)
		this.currentCreator.startCreation()
	}

	createLine(tool : paper.Tool) : void {
		this.tool = tool
		this.currentCreator?.dispose()
		this.currentCreator = new LineCreator(this)
		this.currentCreator.startCreation()
	}

	cancelCreation() : void {
		this.currentCreator?.dispose();
		this.currentCreator = null;
	}
}