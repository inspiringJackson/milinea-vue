// src/stores/state.ts
import type { BaseLayer } from '../canvas-core/types/base-layer'
import type { CanvasManager } from '../canvas-core/CanvasManager'

export const initialState = () => ({
	gridVisible: false,

	canvasManager: null as CanvasManager | null,
	offsetX: 100,
	offsetY: 100,
	zoom: 1,
	panSpeed: 0.4,

	isPanning: false,
	isZooming: false,
	isSelecting: false,

	shiftKey: false,
	ctrlKey: false,
	altKey: false,
	hKey: false,
	sKey: false,
	vKey: false,
	xKey: false,

	contentWidth: 0,
	contentHeight: 0,
	layers: [] as BaseLayer[],
	hoverLayer: null as BaseLayer | null,
	selectedLayers: [] as BaseLayer[],

	tool: 'selection',
	dragState: {
		isDragging: false,
		startX: 0,
		startY: 0,
		originalPositions: [] as Array<{ id : string; x : number; y : number }>
	},
})