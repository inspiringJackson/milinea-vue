// src/stores/useCanvasStore.ts
import { defineStore } from 'pinia'
import { CanvasManager } from '../canvas-core/CanvasManager'

export const useCanvasStore = defineStore('canvas', {
	state: () => ({
		offsetX: 0,
		offsetY: 0,
		zoom: 1,
		isPanning: false,
		canvasManager: null as CanvasManager | null
	}),
	actions: {
		init(manager : CanvasManager) {
			this.canvasManager = manager
		},
		handleMouseEvent(type : 'down' | 'move' | 'up', e : MouseEvent) {
			if (!this.canvasManager?.canvas) return

			const rect = this.canvasManager.canvas.getBoundingClientRect()
			const point = {
				x: e.clientX - rect.left,
				y: e.clientY - rect.top
			}

			if (type === 'down') {
				this.canvasManager.lastPos = point
				this.canvasManager.isPanning = true
				this.isPanning = true
			}

			if (this.canvasManager.isPanning && type === 'move') {
				const dx = (point.x - this.canvasManager.lastPos.x) / this.zoom
				const dy = (point.y - this.canvasManager.lastPos.y) / this.zoom
				this.canvasManager.pan(dx, dy)
				this.canvasManager.lastPos = point
			}

			if (type === 'up') {
				this.canvasManager.isPanning = false
				this.isPanning = false
			}
		},
		handleWheelEvent(e : WheelEvent) {
			e.preventDefault()
		}
	}
})