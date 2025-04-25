// src/stores/state.ts
import type { BaseLayer } from '../canvas-core/types/base-layer'
import type { CanvasManager } from '../canvas-core/CanvasManager'

export const initialState = () => ({
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
})