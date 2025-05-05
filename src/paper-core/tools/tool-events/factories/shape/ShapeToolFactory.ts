// src/paper-core/tools/tool-events/factories/shape/ShapeToolFactory.ts
import { BaseShapeTool } from "./BaseShapeTool"
import type { ShapeType } from "../../../../types/shape"
import { usePaperStore } from "../../../../../stores/usePaperStore"
import {
	BOUNDING_BOX_STROKE_COLOR,
	DEFAULT_SHAPE_FILL_COLOR
} from "../../../../config/constants"
import paper from "paper"

export class ShapeToolFactory {
	static createTool(
		type : ShapeType,
		paper : paper.PaperScope
	) : BaseShapeTool {
		switch (type) {
			case "rectangle":
				return new RectangleTool(paper)
			case "ellipse":
				return new EllipseTool(paper)
			case "line":
				return new LineTool(paper)
		}
	}
}

class RectangleTool extends BaseShapeTool {
	// refer to https://cloud.tencent.com/developer/article/2436481
	
	get name() { return 'Rectangle ' + usePaperStore().rectangleIndex++ }

	protected createShape(startPoint : paper.Point) {
		return new this.paper.Path.Rectangle({
			point: startPoint,
			size: [0, 0],
			fillColor: DEFAULT_SHAPE_FILL_COLOR
		})
	}

	protected updateShape(e : paper.ToolEvent) {
		const currentPoint = e.point
		const rectTopLeft = new paper.Point(
			Math.min(this.startPoint.x, currentPoint.x),
			Math.min(this.startPoint.y, currentPoint.y)
		)
		const rectBottomRight = new paper.Point(
			Math.max(this.startPoint.x, currentPoint.x),
			Math.max(this.startPoint.y, currentPoint.y)
		)
		let width = rectBottomRight.x - rectTopLeft.x
		let height = rectBottomRight.y - rectTopLeft.y
		if (e.modifiers.shift) {
			const maxSize = Math.max(width, height)
			width = height = maxSize
			rectBottomRight.x = rectTopLeft.x + maxSize
			rectBottomRight.y = rectTopLeft.y + maxSize
		}

		this.currentShape.remove()
		this.currentShape = new paper.Path.Rectangle({
			name: this.name,
			from: rectTopLeft,
			to: rectBottomRight,
			fillColor: DEFAULT_SHAPE_FILL_COLOR
		})
	}
}

class EllipseTool extends BaseShapeTool {

	get name() { return 'Ellipse ' + usePaperStore().ellipseIndex++ }

	protected createShape(startPoint : paper.Point) {
		return new this.paper.Path.Ellipse({
			point: startPoint,
			size: [0, 0],
			strokeColor: BOUNDING_BOX_STROKE_COLOR,
			strokeWidth: 1,
		})
	}

	protected updateShape(e : paper.ToolEvent) {
		const currentPoint = e.point
		const ellipse = this.currentShape as paper.Path.Ellipse
		const delta = currentPoint.subtract(this.startPoint!)
		ellipse.bounds = new this.paper.Rectangle(this.startPoint!, delta)
	}
}

class LineTool extends BaseShapeTool {

	get name() { return 'Line ' + usePaperStore().lineIndex++ }

	protected createShape(startPoint : paper.Point) {
		return new this.paper.Path.Line({
			from: startPoint,
			to: startPoint,
			strokeColor: BOUNDING_BOX_STROKE_COLOR,
			strokeWidth: 1,
		})
	}

	protected updateShape(e : paper.ToolEvent) {
		const currentPoint = e.point
		const line = this.currentShape as paper.Path.Line
		line.segments[1].point = currentPoint
	}
}