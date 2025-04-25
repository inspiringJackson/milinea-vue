// src/canvas-core/renderers/ruler/RulerSelectionHelper.ts
import { useCanvasStore } from "../../../stores/useCanvasStore"
import { BoundingBox, calculateSelectionBound } from "../../utils/calculateSelectionBound"

export function renderSelectionHelper(
	ctx : CanvasRenderingContext2D
) {
	const { selectedLayers, offsetX, offsetY, zoom } = useCanvasStore()
	if (selectedLayers.length === 0) return

	const bound = calculateSelectionBound()
	ctx.save()
	ctx.resetTransform()

	const leftX = bound.x * zoom + offsetX
	const rightX = leftX + bound.width * zoom
	const topY = bound.y * zoom + offsetY
	const bottomY = topY + bound.height * zoom

	const maskConfig = {
		color: "#F5F5F5",
		size: { width: 120, height: 26 },
		gradientRange: 60,
		gradientStops: [
			[0, "00"],
			[0.25, "FF"],
			[0.75, "FF"],
			[1, "00"]
		]
	}

	const createGradient = (type : 'h' | 'v', pos : number) => {
		const gradient = type === 'h'
			? ctx.createLinearGradient(pos - 75, 26, pos + 75, 26)
			: ctx.createLinearGradient(26, pos - 75, 26, pos + 75)

		maskConfig.gradientStops.forEach(([stop, alpha]) => {
			gradient.addColorStop(Number(stop), `${maskConfig.color}${alpha}`)
		})
		return gradient
	}

	const gradientsToDraw = [
		{ type: 'h' as const, pos: leftX },   // 水平左
		{ type: 'h' as const, pos: rightX },  // 水平右
		{ type: 'v' as const, pos: topY },    // 垂直上
		{ type: 'v' as const, pos: bottomY }  // 垂直下
	]
	
	gradientsToDraw.forEach(({ type, pos }) => {
		ctx.fillStyle = createGradient(type, pos)
		const [width, height] = type === 'h'
			? [maskConfig.size.width, maskConfig.size.height]
			: [maskConfig.size.height, maskConfig.size.width]

		const [x, y] = type === 'h'
			? [pos - maskConfig.gradientRange, 0]
			: [0, pos - maskConfig.gradientRange]

		ctx.fillRect(x, y, width, height)
	})

	ctx.fillStyle = "#18a05866"
	ctx.fillRect(leftX, 0, bound.width * zoom, 6)
	ctx.fillRect(0, topY, 12, bound.height * zoom)

	ctx.strokeStyle = "#18a058"
	ctx.lineWidth = 0.5
	const fontSize = 10
	ctx.fillStyle = "#18a058"
	ctx.font = `${fontSize}px Arial` // '10px Arial'

	// 线条和文本配置
	const markers = [
		{ type: 'h', pos: leftX, value: bound.x, endY: 15 },
		{ type: 'h', pos: rightX, value: bound.x + bound.width, endY: 15 },
		{ type: 'v', pos: topY, value: bound.y, endX: 15 },
		{ type: 'v', pos: bottomY, value: bound.y + bound.height, endX: 15 },
	];

	ctx.beginPath()
	ctx.beginPath()
	markers.forEach(({ type, pos, value, endX, endY }) => {
		if (type === 'h') {
			ctx.moveTo(pos, 0)
			ctx.lineTo(pos, endY!)
			renderText(ctx, pos, value, false)
		} else {
			ctx.moveTo(0, pos)
			ctx.lineTo(endX!, pos)
			renderText(ctx, pos, value, true)
		}
	});
	ctx.stroke()
	ctx.restore()
}

function renderText(
	ctx : CanvasRenderingContext2D,
	viewPos : number,
	scenePos : number,
	isVertical : boolean
) {
	ctx.save()
	ctx.textAlign = 'center'
	ctx.textBaseline = 'middle'

	if (isVertical) {
		ctx.translate(21, viewPos)
		ctx.rotate(-Math.PI / 2)
	} else {
		ctx.translate(viewPos, 21)
	}

	ctx.fillText(`${scenePos}`, 0, 0)
	ctx.restore()
}