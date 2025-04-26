// src/stores/event-handlers.ts
import { findLayer } from '../layerUtils'
import { useCanvasStore } from '../useCanvasStore'
import { calculateSelectionBound } from './../../canvas-core/utils/calculateSelectionBound'

export const handleMouseEvent = (
	type : 'down' | 'move' | 'up',
	e : MouseEvent
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

	// 悬停状态
	// english: hover state
	if (store.tool === 'selection') {
		if (type === 'move') {
			const hoverLayer = findLayer(store.layers, logicalX, logicalY)
			if (store.hoverLayer !== hoverLayer && hoverLayer.type !== 'frame') {
				store.hoverLayer = hoverLayer
				canvasManager.hover()
			}
		}
	}
	
	if (store.isPathEditing) {
		if (type === 'move') {
			store.logicalX = logicalX * store.zoom
			store.logicalY = logicalY * store.zoom
			canvasManager.enterPathEditMode()
		}
	}

	// 选区拖拽
	// english: selection dragging
	if (store.tool === 'selection' && store.selectedLayers.length > 0) {
		if (type === 'down' && e.button === 0) {
			// 检查点击位置是否在选区内
			// english: check if the click position is inside the selection area
			const selectionBox = calculateSelectionBound()
			if (logicalX >= selectionBox.x && logicalX <= selectionBox.x + selectionBox.width &&
				logicalY >= selectionBox.y && logicalY <= selectionBox.y + selectionBox.height) {
				store.dragState = {
					isDragging: true,
					startX: logicalX,
					startY: logicalY,
					originalPositions: store.selectedLayers.map(layer => ({
						id: layer.id,
						x: layer.boundingBox.position.x,
						y: layer.boundingBox.position.y
					}))
				}
				e.preventDefault()
				return
			}
		}

		if (store.dragState.isDragging) {
			if (type === 'move') {
				const rawDeltaX = logicalX - store.dragState.startX
				const rawDeltaY = logicalY - store.dragState.startY

				const snapStep = 0.5
				const deltaX = Math.round(rawDeltaX / snapStep) * snapStep
				const deltaY = Math.round(rawDeltaY / snapStep) * snapStep

				store.selectedLayers.forEach(layer => {
					const original = store.dragState.originalPositions.find(o => o.id === layer.id)
					if (original) {
						layer.boundingBox.position.x = original.x + deltaX
						layer.boundingBox.position.y = original.y + deltaY
					}
				})
				canvasManager.render()
				e.preventDefault()
				return
			}

			if (type === 'up') {
				const movedLayerIds = store.selectedLayers.map(l => l.id)
				const rawDeltaX = logicalX - store.dragState.startX
				const rawDeltaY = logicalY - store.dragState.startY

				const snapStep = 0.5
				const deltaX = Math.round(rawDeltaX / snapStep) * snapStep
				const deltaY = Math.round(rawDeltaY / snapStep) * snapStep

				if (deltaX !== 0 || deltaY !== 0) {
					store.commitMoveSelectedLayers(movedLayerIds, deltaX, deltaY)
				}
				store.dragState.isDragging = false
				store.dragState.originalPositions = []
				e.preventDefault()
				return
			}
		}
	}

	// 移动视图
	// english: move view
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
	} else if (e.button === 0 && store.tool === 'selection') { // 点击选中 englist: select
		if (type === 'down') {
			const prevSelectedIds = [...store.selectedLayers.map(l => l.id)]
			const layer = findLayer(store.layers, logicalX, logicalY)

			// 处理多选逻辑
			// english: handle multi-select logic
			if (layer && layer.type !== 'frame') {
				if (!e.shiftKey) {
					// 非多选模式：清空原有选择
					// english: non-multi-select mode: clear previous selection
					store.layers.forEach(l => l.isSelected = false)
					store.selectedLayers = []
				}
				// 切换选中状态
				// english: toggle select state
				layer.isSelected = !layer.isSelected
				if (layer.isSelected) {
					store.selectedLayers.push(layer)
				} else {
					store.selectedLayers = store.selectedLayers.filter(l => l.id !== layer.id)
				}
			} else if (!e.shiftKey) {
				// 点击空白区域且非多选模式：清空选择
				// english: click blank area and non-multi-select mode: clear selection
				store.layers.forEach(l => l.isSelected = false)
				store.selectedLayers = []
			}

			// 提交选择变更到历史记录
			// english: commit selection change to history
			const newSelectedIds = store.selectedLayers.map(l => l.id)
			store.commitSelectionChange(prevSelectedIds, newSelectedIds)

			canvasManager.select()
			e.preventDefault()
		}
	}
	
	// 路径绘制
	// english: path drawing
	if (store.isPathEditing) {
		if (store.isPathDrawing && e.button === 0 && type === 'down') {
			// TODO
		}
	}
}