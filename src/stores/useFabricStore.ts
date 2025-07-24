// src/stores/useFabricStore.ts
// dependencies:
import { defineStore } from 'pinia'
import { Canvas, Rect, InteractiveFabricObject } from 'fabric'
// stores:
import { useGlobalStore } from './useGlobalStore'
// fabric-core:
import { ToolManager } from '../fabric-core/tools/toolManager'
import { RenderEngine } from '../fabric-core/renderers/RenderEngine'
// enums/types:
import { ToolModes } from '../fabric-core/config/enums'
// constants:
import {
	DEFAULT_INITIAL_OFFSET_X,
	DEFAULT_INITIAL_OFFSET_Y,
	FABRIC_SELECTION_COLOR,
	FABRIC_SELECTION_BORDER_COLOR,
	FABRIC_TRANSPARENT_CORNERS,
	FABRIC_CORNER_SIZE,
	FABRIC_CORNER_COLOR,
	FABRIC_CORNER_STROKE_COLOR,
	FABRIC_BORDER_PADDING,
	FABRIC_SELECTED_BORDER_COLOR,
	FABRIC_SELECTED_BORDER_OPACITY_WHEN_MOVING,
	PER_PIXEL_TARGET_FIND
} from '../fabric-core/config/constants'

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
			canvas : HTMLCanvasElement
		) {
			this.canvasContainer = canvasContainer
			this.canvas = canvas
			this.fabricCanvas = new Canvas(canvas, {
				viewportTransform: [1, 0, 0, 1, DEFAULT_INITIAL_OFFSET_X, DEFAULT_INITIAL_OFFSET_Y],
				enableRetinaScaling: true,
				renderOnAddRemove: false,
				selectionColor: FABRIC_SELECTION_COLOR,
				selectionBorderColor: FABRIC_SELECTION_BORDER_COLOR,
				// 设置这个属性后，需要手动调用 renderAll 方法渲染 canvas，否则有关矩阵变换的属性设置不会生效
				// english: you need to call renderAll method manually after setting any matrix-related properties
				skipOffscreen: true,
			})
			
			InteractiveFabricObject.ownDefaults = {
				...InteractiveFabricObject.ownDefaults,
				transparentCorners: FABRIC_TRANSPARENT_CORNERS,
				cornerColor: FABRIC_CORNER_COLOR,
				cornerSize: FABRIC_CORNER_SIZE,
				cornerStrokeColor: FABRIC_CORNER_STROKE_COLOR,
				padding: FABRIC_BORDER_PADDING,
				borderColor: FABRIC_SELECTED_BORDER_COLOR,
				borderOpacityWhenMoving: FABRIC_SELECTED_BORDER_OPACITY_WHEN_MOVING,
				perPixelTargetFind: PER_PIXEL_TARGET_FIND
			}
		},
		loadRulerAndGrid(
			bottomCanvas : HTMLCanvasElement,
			topCanvas : HTMLCanvasElement,
		) {
			this.renderEngine = new RenderEngine(this.canvas, this.canvasContainer, bottomCanvas, topCanvas)
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