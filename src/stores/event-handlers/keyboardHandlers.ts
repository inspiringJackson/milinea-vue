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
	} else if (e.key === 'Shift' && type === 'up') {
		store.isSelecting = false
	}
}