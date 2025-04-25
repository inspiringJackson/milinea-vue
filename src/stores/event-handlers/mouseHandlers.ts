// src/stores/event-handlers.ts
import { findLayer } from '../layerUtils'
import { useCanvasStore } from '../useCanvasStore'

export const handleMouseEvent = (
	type: 'down' |'move' | 'up',
	e: MouseEvent
) => {
	const store = useCanvasStore()
	const { canvasManager } = store.$state
	if (!canvasManager?.canvas) return
	
	const rect = canvasManager.canvas.getBoundingClientRect()
	const point = {
		x: e.clientX - rect.left,
		y: e.clientY - rect.top
	}
	
	const logicalX = (point.x - store.offsetX) / store.zoom
	const logicalY = (point.y - store.offsetY) / store.zoom
	
	if (store.tool === 'selection') {
		if (type === 'move') {
			const hoverLayer = findLayer(store.layers, logicalX, logicalY)
			if (store.hoverLayer !== hoverLayer) {
				store.hoverLayer = hoverLayer
				canvasManager.hover()
			}
		}
	}
	
	if (e.button === 0 && (store.tool === 'moveView' || store.tool === 'movingView')) {
		if (type === 'down') {
			canvasManager.setLastPos(point)
			canvasManager.setIsPanning(true)
			store.isPanning = true
			if (store.tool === 'movingView') {
				store.tool = 'moveView'
			}
		}
		
		if (canvasManager.getIsPanning() && type === 'move') {
			const dx = (point.x - canvasManager.getLastPos().x) / store.zoom
			const dy = (point.y - canvasManager.getLastPos().y) / store.zoom
			canvasManager.pan(dx, dy)
			canvasManager.setLastPos(point)
			if (store.tool === 'moveView') {
				store.tool = 'movingView'
			}
		}
		
		if (type === 'up') {
			canvasManager.setIsPanning(false)
			store.isPanning = false
			if (store.tool === 'movingView') {
				store.tool = 'moveView'
			}
		}
	} else if (e.button === 0 && store.tool === 'selection') {
		if (type === 'down') {
			const layer = findLayer(store.layers, logicalX, logicalY)
			if (layer) {
				if (!store.isSelecting) {
					store.layers.forEach(l => {
						l.isSelected = false
					})
					store.selectedLayers = []
				}
				layer.isSelected = true
				store.selectedLayers.push(layer)
				console.log(store.selectedLayers)
			} else {
				store.layers.forEach(l => {
					l.isSelected = false
				})
				store.selectedLayers = []
			}
			canvasManager.select()
		}
	}
}