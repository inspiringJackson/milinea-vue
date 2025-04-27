// /src/stores/demo-data.ts
import type { BaseLayer } from "../canvas-core/types/base-layer"
import type { FrameLayer } from "../canvas-core/types/layers/frame-layer"
import { MetroMap } from "../canvas-core/metro/MetroMap"
import { getImageDimensions } from "../utils/image-loader"

const LOCAL_IMAGE_PATH = 'src/assets/demo/demo_map.jpg'

export async function createDemoData() : Promise<BaseLayer[]> {
	// 获取图片尺寸
	const dimensions = await getImageDimensions(LOCAL_IMAGE_PATH)

	const demoLayer : FrameLayer = {
		id: 'demo-frame',
		name: 'demo-frame',
		type: 'frame',
		visible: true,
		locked: false,
		isSelected: false,
		componentType: 'none',
		metroMap: new MetroMap(),
		boundingBox: {
			position: { x: 0, y: 0 },
			size: {
				width: dimensions.width,
				height: dimensions.height
			}
		},
		childrenIds: [],
		style: {
			fill: [{
				type: 'image',
				src: LOCAL_IMAGE_PATH
			}]
		}
	}

	return [demoLayer]
}

// 使用示例
// const demoData = await createDemoData();