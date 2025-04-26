// src/stores/event-handlers/keyboardHandlers.ts
import { useCanvasStore } from "../useCanvasStore"



export const handleKeyboardEvent = (
	type: 'down' | 'press' | 'up',
	e: KeyboardEvent
) => {
	const store = useCanvasStore()
	if (!store.canvasManager?.canvas) return
	if (e.key === 'Shift' && type === 'down') {
		store.isSelecting = true
		store.shiftKey = true
	} else if (e.key === 'Shift' && type === 'up') {
		store.isSelecting = false
		store.shiftKey = false
	}

	if (e.key === 'Control' && type === 'down') {
		store.isZooming = true
		store.ctrlKey = true
	} else if (e.key === 'Control' && type === 'up') {
		store.isZooming = false
		store.ctrlKey = false
	}
	
	if (e.key === 'Alt' && type === 'down') {
		store.altKey = true
	} else if (e.key === 'Alt' && type === 'up') {
		store.altKey = false
	}

	if (e.key === 'S' && type === 'down') {
		store.sKey = true
	} else if (e.key === 'S' && type === 'up') {
		store.sKey = false
	}
	
	if (e.key === 'X' && type === 'down') {
		store.xKey = true
	} else if (e.key === 'X' && type === 'up') {
		store.xKey = false
	}
}