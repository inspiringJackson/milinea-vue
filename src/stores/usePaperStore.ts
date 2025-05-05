// src/stores/usePaperStore.ts
import { defineStore } from 'pinia'
import paper from 'paper'
import { RenderEngine } from '../paper-core/renderers/RenderEngine'
import { ToolManager } from '../paper-core/tools/ToolManager'

import { DEFAULT_INITIAL_OFFSET_X, DEFAULT_INITIAL_OFFSET_Y, BOUNDING_BOX_SELECTED_STROKE_WIDTH } from '../config/constants'

export const usePaperStore = defineStore('paper', {
	state: () => ({
		canvas: null as HTMLCanvasElement | null,
		bottomCanvas: null as HTMLCanvasElement | null,
		topCanvas: null as HTMLCanvasElement | null,
		project: null as paper.Project | null,
		scope: null as paper.PaperScope | null,
		tool: null as paper.Tool | null,
		renderEngine: null as RenderEngine | null,

		zoomScale: 1,

		isViewMoving: false,
		dragStart: null as paper.Point | null,
		originalCenter: null as paper.Point | null,
		currentTool: 'select',
		
		selectedPathIds: [] as string[],
	}),
	actions: {
		init(
			canvas : HTMLCanvasElement, 
			bottomCanvas : HTMLCanvasElement, 
			topCanvas : HTMLCanvasElement, 
		) {
			this.scope = new paper.PaperScope()
			this.scope.setup(canvas)
			this.canvas = canvas
			this.bottomCanvas = bottomCanvas
			this.topCanvas = topCanvas
			this.scope.view.center = this.scope.view.center.add(new paper.Point(DEFAULT_INITIAL_OFFSET_X, DEFAULT_INITIAL_OFFSET_Y))
			this.project = this.scope.project
			this.renderEngine = new RenderEngine(this.canvas, this.bottomCanvas, this.topCanvas)
			this.toolManager = new ToolManager()

		},
		clearCanvas() {
			this.project?.clear()
		}
	}
})