// src/stores/usePaperStore.ts
import { defineStore } from 'pinia'
import paper from 'paper'
import { initTool } from '../paper-core/tools/toolManager'
import { createTestShapes } from '../demo/testShapes'

export const usePaperStore = defineStore('paper', {
	state: () => ({
		canvas: null as HTMLCanvasElement | null,
		project: null as paper.Project | null,
		scope: null as paper.PaperScope | null,
		tool: null as paper.Tool | null,
		
		zoomScale: 1,
		offsetX: 0,
		offsetY: 0,
		
		isViewMoving: false,
		dragStart: null as paper.Point | null,
		originalCenter: null as paper.Point | null,
		currentTool: 'select',
	}),
	actions: {
		init(canvas: HTMLCanvasElement) {
			this.scope = new paper.PaperScope()
			this.scope.setup(canvas)
			this.canvas = canvas
			this.project = this.scope.project
			initTool()
			createTestShapes()
			
		},
		clearCanvas() {
			this.project?.clear()
		}
	}
})