// src/paper-core/tools/wheel-events/PanView.ts
import { PAN_STEP } from '../../../config/constants'
import { RenderEngine } from '../../renderers/RenderEngine'
import paper from 'paper'

export function PanView(
	type: 'horizontal' | 'vertical' | 'diagonal' | 'antiDiagonal',
	view: paper.View,
	event: WheelEvent,
	renderEngine: RenderEngine
) {
	const delta = event.deltaY * PAN_STEP
	switch (type) {
		case 'horizontal':
			view.center = view.center.add(new paper.Point(delta, 0))
			break
		case'vertical':
			view.center = view.center.add(new paper.Point(0, delta))
			break
		case 'diagonal':
			view.center = view.center.add(new paper.Point(delta, delta))
			break
		case 'antiDiagonal':
			view.center = view.center.add(new paper.Point(-delta, delta))
			break
	}
	renderEngine.render()
}