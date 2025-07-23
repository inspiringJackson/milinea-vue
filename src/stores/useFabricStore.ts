// src/stores/useFabricStore.ts
import { defineStore } from 'pinia'
import { useGlobalStore } from './useGlobalStore'
import { Canvas, Rect } from 'fabric'
import { ToolManager } from '../fabric-core/tools/toolManager'
import { RenderEngine } from '../fabric-core/renderers/RenderEngine'
import { ToolModes } from '../fabric-core/config/enums'

export const useFabricStore = defineStore('fabric', {
    state: () => ({
		canvasContainer: null as HTMLDivElement | null,
		canvas: null as HTMLCanvasElement | null,
		fabricCanvas: null as Canvas | null,
		toolManager: null as ToolManager | null,
		renderEngine: null as RenderEngine | null,
		
		currentTool: 'select',
		isViewMoving: false,
	}),
	actions: {
		init(
			canvasContainer: HTMLDivElement,
			canvas : HTMLCanvasElement,
			bottomCanvas : HTMLCanvasElement,
			topCanvas : HTMLCanvasElement,
		) {
			this.canvasContainer = canvasContainer
			this.canvas = canvas
			this.fabricCanvas = new Canvas(canvas, {
				enableRetinaScaling: true
			})
			this.renderEngine = new RenderEngine(this.canvas, this.canvasContainer)
			this.toolManager = new ToolManager()
		},
		clearCanvas() {
			if (this.fabricCanvas) {
				this.fabricCanvas.clear()
				this.fabricCanvas.renderAll()
			}
		},
		setCurrentTool(toolName : ToolModes) {
			if (this.currentTool?.name === toolName) return
			console.log('setCurrentTool', toolName)
			this.currentTool = toolName
			this.toolManager.switchTool(toolName)
		},
	}
})