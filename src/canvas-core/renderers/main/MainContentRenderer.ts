// src/canvas-core/renderers/main/MainContentRenderer.ts
import { useCanvasStore } from './../../../stores/useCanvasStore'
// import type { LayerType, FrameLayer, ShapeLayer } from './../../types/LayerTypes'
import type { BaseLayer } from '../../types/base-layer'
import type { FrameLayer } from '../../types/layers/frame-layer'
import type { ShapeLayer } from '../../types/layers/shape-layer'

export class MainContentRenderer {
	private renderFrameLayer(ctx : CanvasRenderingContext2D, layer : FrameLayer) {
		const { position, size } = layer.boundingBox
		const fillColor = layer.style?.fill?.[0]

		if (fillColor) {
			ctx.fillStyle = fillColor
			ctx.fillRect(position.x, position.y, size.width, size.height)
		}
	}

	private renderShapeLayer(ctx : CanvasRenderingContext2D, layer : ShapeLayer) {
		// 可根据需要实现具体形状渲染逻辑
	}

	public render(
		ctx : CanvasRenderingContext2D
	) {
		const store = useCanvasStore()
		ctx.resetTransform()
		// 应用缩放和位移
		ctx.translate(store.offsetX, store.offsetY)
		ctx.scale(store.zoom, store.zoom)

		// 绘制测试内容（后续可替换为正式内容）
		// ctx.fillStyle = '#2196f3'
		// ctx.fillRect(0, 0, 200, 150)
		// 遍历所有图层进行渲染
		//console.log(store.layers)
		store.layers.forEach(layer => {
			ctx.save()
			try {
				switch (layer.type) {
					case 'frame':
						this.renderFrameLayer(ctx, layer as FrameLayer)
						break
					case 'group':
						// 实现组渲染逻辑
						break
					case 'text':
						// 实现文本渲染逻辑
						break
					case 'closedPath':
					case 'path':
						this.renderShapeLayer(ctx, layer as ShapeLayer)
						break
				}
			} finally {
				ctx.restore()
			}
		})
	}
}