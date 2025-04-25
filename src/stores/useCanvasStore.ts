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
		isSelecting: false,
		canvasManager: null as CanvasManager | null,
		contentWidth: 0,
		contentHeight: 0,
		tool: 'moveView',
		layers: [] as BaseLayer[],
		selectedLayers: [] as BaseLayer[],
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
				isSelected: false,
				componentType: 'none',
				boundingBox: {
					position: { x: 0, y: 0 },
					size: { width: 20, height: 15 }
				},
				childrenIds: [],
				style: {
					fill: ['#2196f3']
				}
			} as BaseLayer)
			this.layers.push({
				id: 'demo-frame2',
				name: 'demo-frame2',
				type: 'frame',
				visible: true,
				locked: false,
				isSelected: false,
				componentType: 'none',
				boundingBox: {
					position: { x: 200, y: 75 },
					size: { width: 150, height: 150 }
				},
				childrenIds: [],
				style: {
					fill: ['#A5D63F']
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
			
			if (e.button === 0 && (this.tool === 'moveView' || this.tool === 'movingView')) {
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
			} else if (e.button === 0 && this.tool === 'selection') {
				const logicalX = (point.x - this.offsetX) / this.zoom
				const logicalY = (point.y - this.offsetY) / this.zoom
				if (type === 'down') {
					const layer = this.findLayer(logicalX, logicalY)
					if (layer) {
						if (!this.isSelecting) {
							this.layers.forEach(l => {
								l.isSelected = false
							})
							this.selectedLayers = []
						}
						layer.isSelected = true
						this.selectedLayers.push(layer)
					} else {
						this.layers.forEach(l => {
							l.isSelected = false
						})
						this.selectedLayers = []
					}
					this.canvasManager.select()
				}
			}
			
		},
		handleWheelEvent(e : WheelEvent) {
			e.preventDefault()
		},
		handleKeyboradEvent(type : 'down' | 'press' | 'up', e : KeyboardEvent) {
			if (!this.canvasManager?.canvas) return
			if (e.key === 'Shift' && type === 'down') {
				this.isSelecting = true
			} else if (e.key === 'Shift' && type === 'up') {
				this.isSelecting = false
			}
		},
		findLayer(x: number, y: number): BaseLayer | null {
		  // 反向遍历以便优先选择最上层的图层
		  for (let i = this.layers.length - 1; i >= 0; i--) {
		    const layer = this.layers[i]
		    if (['frame', 'group'].includes(layer.type)) {
		      const bbox = layer.boundingBox
		      if (x >= bbox.position.x && 
		          x <= bbox.position.x + bbox.size.width &&
		          y >= bbox.position.y && 
		          y <= bbox.position.y + bbox.size.height) {
		        return layer
		      }
		    }
		  }
		  return null
		}
	}
})