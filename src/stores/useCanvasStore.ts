// src/stores/useCanvasStore.ts
import { defineStore } from 'pinia'
import { CanvasManager } from '../canvas-core/CanvasManager'
import type { BaseLayer } from '../canvas-core/types/base-layer'

export const useCanvasStore = defineStore('canvas', {
	state: () => ({
		offsetX: 100,
		offsetY: 100,
		zoom: 1,
		isPanning: false,
		isZooming: false,
		canvasManager: null as CanvasManager | null,
		contentWidth: 0,
		contentHeight: 0,
		tool: 'moveView',
		layers: [] as BaseLayer[],
	}),
	actions: {
		init(manager : CanvasManager) {
			console.log('init canvas store')
			this.canvasManager = manager
			this.layers.push({
				id: 'demo-frame',
				name: 'demo-frame',
				type: 'frame',
				visible: true,
				locked: false,
				componentType: 'none',
				boundingBox: {
					position: { x: 0, y: 0 },
					size: { width: 200, height: 150 }
				},
				childrenIds: [],
				style: {
					fill: ['#2196f3']
				}
			} as BaseLayer)
		},
		setTool(tool : string) {
			this.tool = tool
		},
		handleMouseEvent(type : 'down' | 'move' | 'up', e : MouseEvent) {
			// console.log('handle mouse event', type, e)
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
				if (this.tool === 'movingView') {
					this.tool = 'moveView'
				}
			}

			if (this.canvasManager.isPanning && type === 'move') {
				const dx = (point.x - this.canvasManager.lastPos.x) / this.zoom
				const dy = (point.y - this.canvasManager.lastPos.y) / this.zoom
				this.canvasManager.pan(dx, dy)
				this.canvasManager.lastPos = point
				if (this.tool === 'moveView') {
					this.tool = 'movingView'
				}
			}

			if (type === 'up') {
				this.canvasManager.isPanning = false
				this.isPanning = false
				if (this.tool === 'movingView') {
					this.tool = 'moveView'
				}
			}
		},
		handleWheelEvent(e : WheelEvent) {
			e.preventDefault()
		},
		handleKeyboradEvent(type : 'down' | 'press' | 'up', e : KeyboardEvent) {
			if (e.key === 'Ctrl' && type === 'down') {
				this.isZooming = true
			}
		},
	}
})