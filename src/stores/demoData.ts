// src/stores/demo-data.ts
import type { BaseLayer } from "../canvas-core/types/base-layer"

export const demoData : BaseLayer[] = [
	{
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
		childrenId: [],
		style: {
			fill: ['#2196f3']
		}
	},
	{
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
		childrenId: [],
		style: {
			fill: ['#A5D63F']
		}
	}
]