// src/stores/usePaperStore.ts
import { defineStore } from 'pinia'
import paper from 'paper'
import { RenderEngine } from '../paper-core/renderers/RenderEngine'
import { ToolManager } from '../paper-core/tools/ToolManager'
import { ToolModes } from '../paper-core/config/enums'

import {
	DEFAULT_INITIAL_OFFSET_X,
	DEFAULT_INITIAL_OFFSET_Y,
	DEFAULT_HANDLE_SIZE
} from '../paper-core/config/constants'
import { cancelAllSelectedItems } from '../paper-core/utils/shape'
import { useHistoryStore } from './useHistoryStore'

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

		rectangleIndex: 1,
		ellipseIndex: 1,
		lineIndex: 1,
		pathIndex: 1,

		selectedPathIds: [] as string[],
		selectedItems: [] as paper.Item[]
	}),
	actions: {
		init(
			canvas : HTMLCanvasElement,
			bottomCanvas : HTMLCanvasElement,
			topCanvas : HTMLCanvasElement,
		) {
			this.scope = new paper.PaperScope()
			this.scope.setup(canvas)
			this.scope.settings.handleSize = DEFAULT_HANDLE_SIZE
			this.canvas = canvas
			this.bottomCanvas = bottomCanvas
			this.topCanvas = topCanvas
			this.scope.view.center = this.scope.view.center.add(new paper.Point(DEFAULT_INITIAL_OFFSET_X, DEFAULT_INITIAL_OFFSET_Y))
			this.project = this.scope.project
			this.renderEngine = new RenderEngine(this.canvas, this.bottomCanvas, this.topCanvas)
			this.toolManager = new ToolManager()
		},
		setCurrentTool(toolName : ToolModes) {
			if (this.currentTool?.name === toolName) return
			this.currentTool = toolName
			this.toolManager.switchTool(toolName)
		},
		addItem(item : paper.Item) {
			if (!this.selectedItems.some(i => i.id === item.id)) {
				const prevSelectedItems = [...this.selectedItems]
				item.bounds.selected = true
				this.selectedItems.push(item)
				const selectedItems = this.selectedItems
				useHistoryStore().commitSelectItemChange(prevSelectedItems, selectedItems)
			}
		},
		removeItem(item : paper.Item) {
			const prevSelectedItems = [...this.selectedItems]
			item.bounds.selected = false
			this.selectedItems = this.selectedItems.filter(i => i.id !== item.id)
			const selectedItems = this.selectedItems
			useHistoryStore().commitSelectItemChange(prevSelectedItems, selectedItems)
		},
		setItems(items : paper.Item[]) {
			if (this.selectedItems.length > 0) {
				cancelAllSelectedItems()
			}
			const prevSelectedItems = [...this.selectedItems]
			items.forEach(item => item.bounds.selected = true)
			this.selectedItems = items
			const selectedItems = this.selectedItems
			useHistoryStore().commitSelectItemChange(prevSelectedItems, selectedItems)
		},
		clearCanvas() {
			this.project?.clear()
		}
	}
})