// src/paper-core/tools/MoveView.ts
import { usePaperStore } from "../../../stores/usePaperStore"
import paper from "paper"

export function MoveView(
	type: 'down' | 'up' | 'drag',
	event: MouseEvent,
	view: paper.View,
) {
	const store = usePaperStore()
	
	switch (type) {
		case 'down':
			store.dragStart = event.point
			store.isViewMoving = true
			break
		case 'drag':
			if (store.isViewMoving && store.dragStart) {
				store.originalCenter = view.center
				const delta = store.dragStart.subtract(event.point)
				view.center = view.center.add(delta)
				store.dragStart = event.point.add(view.center.subtract(store.originalCenter))
			}
			break
		case 'up':
			store.dragStart = null
			store.originalCenter = null
			store.isViewMoving = false
			break
	}
}