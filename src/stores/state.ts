// src/stores/state.ts
import type { BaseLayer } from '../canvas-core/types/base-layer'
import type { CanvasManager } from '../canvas-core/CanvasManager'

export const initialState = () => ({
	canvasManager: null as CanvasManager | null,
	offsetX: 100,
	offsetY: 100,
	zoom: 1,
	
	isPanning: false,
	isZooming: false,
	isSelecting: false,
	
	contentWidth: 0,
	contentHeight: 0,
	layers: [] as BaseLayer[],
	hoverLayer: null as BaseLayer | null,
	selectedLayers: [] as BaseLayer[],
	
	tool: 'selection',
})