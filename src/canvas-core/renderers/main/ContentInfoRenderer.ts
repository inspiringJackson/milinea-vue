// src/canvas-core/renderers/main/ContentInfoRenderer.ts

import { useCanvasStore } from "../../../stores/useCanvasStore"
import { FrameLayer } from "../../types/layers/frame-layer"
import { BaseLayer } from "../../types/base-layer"
import { BoundingBox, calculateSelectionBound } from "../../utils/calculateSelectionBound"


export class ContentInfoRenderer {
	private store = useCanvasStore()

	private renderFrameHeader(ctx : CanvasRenderingContext2D, layer : FrameLayer) {
		const { position, size } = layer.boundingBox
		const { zoom } = this.store

		if (!layer.name || zoom <= 0.5) return

		ctx.font = "12px sans-serif"
		ctx.fillStyle = layer.isSelected ? "#18a058" : "#999"
		ctx.fillText(
			layer.name,
			position.x * zoom,
			position.y * zoom - 3,
			size.width * zoom
		)
	}
	
	private renderHoveredLayer(ctx : CanvasRenderingContext2D, layer : BaseLayer) {
		const { zoom } = this.store
		ctx.strokeStyle = "#18a058"
		ctx.lineWidth = 1 / this.store.zoom
		ctx.strokeRect(
			layer.boundingBox.position.x,
			layer.boundingBox.position.y,
			layer.boundingBox.size.width,
			layer.boundingBox.size.height
		)
	}

	private renderSelectionBox(ctx : CanvasRenderingContext2D, box : BoundingBox) {
		// 绘制边框
		// english: strokeRect
		const { zoom } = this.store
		ctx.strokeStyle = "#18a058"
		ctx.lineWidth = 1 / this.store.zoom
		ctx.strokeRect(box.x, box.y, box.width, box.height)
		
		// 绘制四个角的小方块
		// english: render four small squares
		ctx.fillStyle = "#FFF"
		ctx.lineWidth = 2 / this.store.zoom
		const offset = 4 / zoom
		const width = 8 / zoom
		ctx.strokeRect(box.x - offset, box.y - offset, width, width)
		ctx.fillRect(box.x - offset, box.y - offset, width, width)
		
		ctx.strokeRect(box.x - offset + box.width, box.y - offset, width, width)
		ctx.fillRect(box.x - offset + box.width, box.y - offset, width, width)
		
		ctx.strokeRect(box.x - offset + box.width, box.y - offset + box.height, width, width)
		ctx.fillRect(box.x - offset + box.width, box.y - offset + box.height, width, width)
		
		ctx.strokeRect(box.x - offset, box.y - offset + box.height, width, width)
		ctx.fillRect(box.x - offset, box.y - offset + box.height, width, width)
	}

	private renderSizeLabel(ctx : CanvasRenderingContext2D, box : BoundingBox) {
		const { zoom, offsetX, offsetY } = this.store
		if (zoom <= 0.1) return

		const text = `${box.width}×${box.height}`
		const textWidth = ctx.measureText(text).width
		const fontSize = 14 / zoom
		ctx.font = `${fontSize}px sans-serif`
		
		// 绘制背景框
		// english: fillRect
		const bgWidth = (textWidth + 20) / zoom
		const bgHeight = 18 / zoom
		ctx.fillStyle = "#18a058"
		ctx.fillRect(
			box.x + box.width / 2 - bgWidth / 2,
			box.y + box.height + 6 / zoom,
			bgWidth,
			bgHeight
		)

		// 绘制文本
		// english: fillText
		ctx.fillStyle = "#FFF"
		ctx.fillText(
			text,
			box.x + box.width / 2 - textWidth / zoom / 2 - 8 / zoom,
			box.y + box.height + 20 / zoom
		)
	}

	public render(ctx : CanvasRenderingContext2D) {
		ctx.resetTransform()
		ctx.translate(this.store.offsetX, this.store.offsetY)

		// 渲染画布名称
		// english: render frame header
		this.store.layers.forEach(layer => {
			if (layer.type === 'frame') {
				ctx.save()
				this.renderFrameHeader(ctx, layer as FrameLayer)
				ctx.restore()
			}
		});
		
		if (this.store.hoverLayer) {
			ctx.save()
			ctx.scale(this.store.zoom, this.store.zoom)
			this.renderHoveredLayer(ctx, this.store.hoverLayer)
			ctx.restore()
		}

		// 渲染选中状态
		// english: render selection box
		if (this.store.selectedLayers.length > 0) {
			const selectionBox = calculateSelectionBound()
			ctx.save()
			ctx.scale(this.store.zoom, this.store.zoom)
			this.renderSelectionBox(ctx, selectionBox)
			this.renderSizeLabel(ctx, selectionBox)
			ctx.restore()
		}
	}
}