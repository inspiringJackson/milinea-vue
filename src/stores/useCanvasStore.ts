// src/stores/useCanvasStore.ts
import { defineStore } from 'pinia'
import { CanvasManager } from '../canvas-core/CanvasManager'
import { initialState } from './state'
import { createDemoData } from './demoData'
import { handleMouseEvent } from './event-handlers/mouseHandlers'
import { handleKeyboardEvent } from './event-handlers/keyboardHandlers'
import { useHistoryStore } from './useHistoryStore'
import { MoveSelectedLayersCommand } from './commands/MoveSelectedLayersCommand'
import { SelectLayerCommand } from './commands/SelectLayerCommand'
import { arraysEqual } from './layerUtils'

export const useCanvasStore = defineStore('canvas', {
	state: initialState,
	actions: {
		async init(manager : CanvasManager) {
			this.canvasManager = manager
			this.layers = await createDemoData()
			const initialPage1 = {
				id: 'demopage1',
				name: 'Demo Page 1',
				isOpening: true,
				layers: this.layers,
			}
			const initialPage2 = {
				id: 'demopage2',
				name: 'Demo Page 2',
				isOpening: false,
				layers: [],
			}
			const initialPage3 = {
				id: 'demopage3',
				name: 'Demo Page 3',
				isOpening: false,
				layers: [],
			}
			this.pages.push(initialPage1)
			this.pages.push(initialPage2)
			this.pages.push(initialPage3)
		},
		setTool(tool : string) {
			this.tool = tool
			if (tool === 'calligraphyPen') {
				this.isPathEditing = true
				this.isPathDrawing = true
			} else {
				this.isPathEditing = false
				this.isPathDrawing = false
			}
		},
		handleMouseEvent(type : 'down' | 'move' | 'up', e : MouseEvent) {
			handleMouseEvent(type, e)
		},
		handleWheelEvent(e : WheelEvent) {
			e.preventDefault()
		},
		handleKeyboardEvent(type : 'down' | 'press' | 'up', e : KeyboardEvent) {
			e.preventDefault()
			handleKeyboardEvent(type, e)
		},
		commitMoveSelectedLayers(layerIds : string[], deltaX : number, deltaY : number) {
			const historyStore = useHistoryStore()
			historyStore.addCommand(
				new MoveSelectedLayersCommand(layerIds, deltaX, deltaY, this)
			)
		},
		commitSelectionChange(prevSelectedIds : string[], newSelectedIds : string[]) {
			const historyStore = useHistoryStore()

			// 跳过完全相同的选择状态
			// english: skip identical selection state
			if (arraysEqual(prevSelectedIds, newSelectedIds)) return

			historyStore.addCommand(
				new SelectLayerCommand(prevSelectedIds, newSelectedIds, this)
			)
		},
	}
})