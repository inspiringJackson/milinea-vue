// src/stores/useCanvasStore.ts
import { defineStore } from 'pinia'
import { CanvasManager } from '../canvas-core/CanvasManager'
import { initialState } from './state'
import { demoData } from './demoData'
import { handleMouseEvent } from './event-handlers/mouseHandlers'
import { handleKeyboardEvent } from './event-handlers/keyboardHandlers'
import { findLayer } from './layerUtils'


export const useCanvasStore = defineStore('canvas', {
	state: initialState,
	actions: {
		init(manager : CanvasManager) {
			console.log('init canvas store')
			this.canvasManager = manager
			this.layers.push(...demoData)
		},
		setTool(tool : string) {
			this.tool = tool
		},
		handleMouseEvent(type : 'down' | 'move' | 'up', e : MouseEvent) {
			handleMouseEvent(type, e)
		},
		handleWheelEvent(e : WheelEvent) {
			e.preventDefault()
		},
		handleKeyboradEvent(type : 'down' | 'press' | 'up', e : KeyboardEvent) {
			handleKeyboardEvent(type, e)
		},
		findLayer(x: number, y: number) {
		  return findLayer(this.layers, x, y)
		}
	}
})