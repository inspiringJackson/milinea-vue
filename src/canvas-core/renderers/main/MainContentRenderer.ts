// src/canvas-core/renderers/main/MainContentRenderer.ts
import { useCanvasStore } from './../../../stores/useCanvasStore'
// import type { LayerType, FrameLayer, ShapeLayer } from './../../types/LayerTypes'
import type { BaseLayer } from '../../types/base-layer'
import type { FrameLayer } from '../../types/layers/frame-layer'
import type { ShapeLayer } from '../../types/layers/shape-layer'
import { loadImage } from './../../../utils/image-loader'

export class MainContentRenderer {
	private async renderFrameLayer(ctx : CanvasRenderingContext2D, layer : FrameLayer) {
		const { position, size } = layer.boundingBox
		const { zoom } = useCanvasStore()

		if (layer.style.fill) {
			for (const fill of layer.style.fill) {
				if (typeof fill === 'string') {
					// 处理颜色填充
					ctx.fillStyle = fill
					ctx.fillRect(position.x, position.y, size.width, size.height)
				} else if (fill.type === 'image') {
					// 处理图片填充
					try {
						const img = await loadImage(fill.src)
						ctx.save()
						ctx.imageSmoothingEnabled = false;
						// ctx.mozImageSmoothingEnabled = false;
						// ctx.webkitImageSmoothingEnabled = false;
						// ctx.msImageSmoothingEnabled = false;
						ctx.drawImage(img, 0, 0, size.width, size.height, position.x, position.y, size.width, size.height)
						ctx.restore()
					} catch (error) {
						console.error('Failed to load image:', fill.src, error)
						// 图片加载失败时显示备用颜色
						ctx.fillStyle = '#cccccc'
						ctx.fillRect(position.x, position.y, size.width, size.height)
					}
				}
			}
		}
	}

	private renderShapeLayer(ctx : CanvasRenderingContext2D, layer : ShapeLayer) {
		// 可根据需要实现具体形状渲染逻辑
	}

	public async render(
		ctx : CanvasRenderingContext2D
	) {
		const store = useCanvasStore()
		ctx.resetTransform()
		// 应用缩放和位移
		ctx.translate(store.offsetX, store.offsetY)
		ctx.scale(store.zoom, store.zoom)

		// 遍历所有图层进行渲染
		store.layers.forEach(async (layer) => {
			ctx.save()
			try {
				switch (layer.type) {
					case 'frame':
						await this.renderFrameLayer(ctx, layer as FrameLayer)
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