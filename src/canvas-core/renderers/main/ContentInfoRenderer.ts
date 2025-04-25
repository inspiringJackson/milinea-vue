// src/canvas-core/renderers/main/ContentInfoRenderer.ts

import { useCanvasStore } from "../../../stores/useCanvasStore"
import { FrameLayer } from "../../types/layers/frame-layer"

type BoundingBox = {
	x : number
	y : number
	width : number
	height : number
}

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

	private renderSelectionBox(ctx : CanvasRenderingContext2D, box : BoundingBox) {
		// 绘制边框
		// english: strokeRect
		const { zoom } = this.store
		ctx.strokeStyle = "#18a058"
		ctx.lineWidth = 1 / this.store.zoom
		ctx.strokeRect(box.x, box.y, box.width, box.height)
		
		// 绘制四个角的小方块
		// english: strokeRect, fillRect
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
		const { zoom, offsetX, offsetY } = this.store;
		if (zoom <= 0.1) return;

		const text = `${box.width}×${box.height}`;
		const textWidth = ctx.measureText(text).width;
		const fontSize = 14 / zoom;
		ctx.font = `${fontSize}px sans-serif`;
		
		// 绘制背景框
		// english: fillRect
		const bgWidth = (textWidth + 20) / zoom;
		const bgHeight = 18 / zoom;
		ctx.fillStyle = "#18a058";
		ctx.fillRect(
			box.x + box.width / 2 - bgWidth / 2,
			box.y + box.height + 6 / zoom,
			bgWidth,
			bgHeight
		);

		// 绘制文本
		// english: fillText
		ctx.fillStyle = "#FFF";
		ctx.fillText(
			text,
			box.x + box.width / 2 - textWidth / zoom / 2 - 8 / zoom,
			box.y + box.height + 20 / zoom
		);
	}

	public render(ctx : CanvasRenderingContext2D) {
		ctx.resetTransform();
		ctx.translate(this.store.offsetX, this.store.offsetY);

		// 渲染画布名称
		// english: render frame header
		this.store.layers.forEach(layer => {
			if (layer.type === 'frame') {
				ctx.save();
				this.renderFrameHeader(ctx, layer as FrameLayer);
				ctx.restore();
			}
		});

		// 渲染选中状态
		// english: render selection box
		console.log(this.store.selectedLayers);
		if (this.store.selectedLayers.length > 0) {
			const selectionBox = this.calculateSelectionBounds();
			ctx.save();
			ctx.scale(this.store.zoom, this.store.zoom);
			this.renderSelectionBox(ctx, selectionBox);
			this.renderSizeLabel(ctx, selectionBox);
			ctx.restore();
		}
	}

	private calculateSelectionBounds() : BoundingBox {
		const layers = this.store.selectedLayers;
		if (layers.length === 0) return { x: 0, y: 0, width: 0, height: 0 };

		const xs = layers.flatMap(l => [l.boundingBox.position.x, l.boundingBox.position.x + l.boundingBox.size.width]);
		const ys = layers.flatMap(l => [l.boundingBox.position.y, l.boundingBox.position.y + l.boundingBox.size.height]);

		return {
			x: Math.min(...xs),
			y: Math.min(...ys),
			width: Math.max(...xs) - Math.min(...xs),
			height: Math.max(...ys) - Math.min(...ys)
		};
	}
}