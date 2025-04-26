//src/stores/layer-utils.ts
import type { BaseLayer } from '../canvas-core/types/base-layer'

export const findLayer = (layers : BaseLayer[], x : number, y : number) : BaseLayer | null => {
	// 反向遍历以便优先选择最上层的图层
	// english: reverse traversal to select the top layer first
	for (let i = layers.length - 1; i >= 0; i--) {
		const layer = layers[i]
		if (['frame', 'group'].includes(layer.type)) {
			const bbox = layer.boundingBox
			if (x >= bbox.position.x &&
				x <= bbox.position.x + bbox.size.width &&
				y >= bbox.position.y &&
				y <= bbox.position.y + bbox.size.height) {
				return layer
			}
		}
	}
	return null
}

export function arraysEqual(a : string[], b : string[]) {
	// 数组是否相等
	// english: whether two arrays are equal
	if (a === b) return true
	if (a.length !== b.length) return false
	return a.every((id, i) => id === b[i])
}