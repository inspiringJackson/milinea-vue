// /src/stores/demo-data.ts
import type { BaseLayer } from "../canvas-core/types/base-layer"
import type { FrameLayer } from "../canvas-core/types/layers/frame-layer"
import type { GroupLayer } from "../canvas-core/types/layers/group-layer"
import type { ShapeLayer } from "../canvas-core/types/layers/shape-layer"
import type { TextLayer } from "../canvas-core/types/layers/text-layer"
import { MetroMap } from "../canvas-core/metro/MetroMap"
import { getImageDimensions } from "../utils/image-loader"

const LOCAL_IMAGE_PATH = 'src/assets/demo/demo_map.jpg'

export async function createDemoData() : Promise<BaseLayer[]> {
	// 获取图片尺寸
	const dimensions = await getImageDimensions(LOCAL_IMAGE_PATH)

	const demoframe1 : FrameLayer = {
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
		childrenIds: ['demo-group1', 'demo-group2'],
		style: {
			fill: [{
				type: 'image',
				src: LOCAL_IMAGE_PATH
			}]
		}
	}
	
	const demoframe2 : FrameLayer = {
		id: 'demo-frame2',
		name: 'demo-frame2',
		type: 'frame',
		visible: true,
		locked: false,
		isSelected: false,
		componentType: 'none',
		metroMap: null,
		boundingBox: {
			position: { x: 0, y: -150 },
			size: {
				width: 300,
				height: 150
			}
		},
		childrenIds: ['demo-group3'],
		style: {
			fill: ['#AA55FF']
		}
	}
	
	const demogroup1 : GroupLayer = {
		id: 'demo-group1',
		name: 'demo-group1',
		type: 'group',
		visible: true,
		locked: false,
		isSelected: false,
		componentType: 'none',
		groupBoolean: 'none',
		boundingBox: {
			position: { x: 80, y: 150},
			size: { width: 200, height: 100 }
		},
		childrenIds: ['demo-shape1', 'demo-shape2'],
	}
	
	const demogroup2 : GroupLayer = {
		id: 'demo-group2',
		name: 'demo-group2',
		type: 'group',
		visible: true,
		locked: false,
		isSelected: false,
		componentType: 'none',
		groupBoolean: 'none',
		boundingBox: {
			position: { x: 300, y: 150 },
			size: { width: 100, height: 50 }
		},
		childrenIds: [],
	}
	
	const demogroup3 : GroupLayer = {
		id: 'demo-group3',
		name: 'demo-group3',
		type: 'group',
		visible: true,
		locked: false,
		isSelected: false,
		componentType: 'none',
		groupBoolean: 'none',
		boundingBox: {
			position: { x: 100, y: 50 },
			size: { width: 200, height: 100 }
		},
		childrenIds: ['demo-shape3'],
	}
	
	const demoshape1 : ShapeLayer = {
		id: 'demo-shape1',
		name: 'demo-shape1',
		type: 'path',
		visible: true,
		locked: false,
		isSelected: false,
		componentType: 'none',
		boundingBox: {
			position: { x: 100, y: 100 },
			size: { width: 50, height: 50 }
		},
		geometry: {
			
		}
	}
	
	const demoshape2 : ShapeLayer = {
		id: 'demo-shape2',
		name: 'demo-shape2',
		type: 'path',
		visible: true,
		locked: false,
		isSelected: false,
		componentType: 'none',
		boundingBox: {
			position: { x: 150, y: 150 },
			size: { width: 50, height: 50 }
		},
		geometry: {
			
		}
	}
	
	const demoshape3 : ShapeLayer = {
		id: 'demo-shape3',
		name: 'demo-shape3',
		type: 'path',
		visible: true,
		locked: false,
		isSelected: false,
		componentType: 'none',
		boundingBox: {
			position: { x: 100, y: 100 },
			size: { width: 50, height: 50 }
		},
		geometry: {
			
		}
	}

	return [demoframe1, demoframe2, demogroup1, demogroup2, demogroup3, demoshape1, demoshape2, demoshape3]
}

// /src/stores/demo-data.ts
// import type { BaseLayer } from "../canvas-core/types/base-layer"
// import type { FrameLayer } from "../canvas-core/types/layers/frame-layer"
// import type { GroupLayer } from "../canvas-core/types/layers/group-layer"
// import type { ShapeLayer} from "../canvas-core/types/layers/shape-layer"
// import type { TextLayer } from "../canvas-core/types/layers/text-layer"
// import { MetroMap } from "../canvas-core/metro/MetroMap"
// import { getImageDimensions } from "../utils/image-loader"
// import { VertexControlType } from "../canvas-core/types/style-types"
// import { VertexAttributes } from "../canvas-core/types/geometry-types"
// // import { v4 as uuidv4 } from 'uuid'

// const LOCAL_IMAGE_PATH = 'src/assets/demo/demo_map.jpg'

// export async function createDemoData() : Promise<BaseLayer[]> {
// 	// 生成基础框架层
// 	const frameLayer = await createBaseFrameLayer()
// 	// 生成嵌套组结构
// 	const mainGroup = createNestedGroupStructure()
// 	// 生成复杂形状组合
// 	const shapeGroup = createComplexShapeGroup()
// 	// 生成文本图层
// 	const textLayers = createTextLayers()

// 	// 组装完整结构
// 	frameLayer.childrenIds = [
// 		mainGroup.id,
// 		shapeGroup.id,
// 		...textLayers.map(t => t.id)
// 	]

// 	return [
// 		frameLayer,
// 		mainGroup,
// 		shapeGroup,
// 		...textLayers,
// 		...createShapeLayers(),
// 		...createComponentInstances()
// 	]
// }

// // 创建基础框架层
// async function createBaseFrameLayer() : Promise<FrameLayer> {
// 	const dimensions = await getImageDimensions(LOCAL_IMAGE_PATH)

// 	return {
// 		id: 'root-frame',
// 		name: 'Main Frame',
// 		type: 'frame',
// 		visible: true,
// 		locked: false,
// 		isSelected: false,
// 		componentType: 'none',
// 		metroMap: new MetroMap(),
// 		boundingBox: {
// 			position: { x: 0, y: 0 },
// 			size: {
// 				width: dimensions.width,
// 				height: dimensions.height
// 			}
// 		},
// 		childrenIds: [],
// 		style: {
// 			fill: [{
// 				type: 'image',
// 				src: LOCAL_IMAGE_PATH
// 			}],
// 			shadow: [{
// 				color: 'rgba(0,0,0,0.2)',
// 				blur: 20,
// 				type: 'outer',
// 				offset: { x: 10, y: 10 },
// 				spread: 5
// 			}]
// 		}
// 	}
// }

// // 创建嵌套组结构
// function createNestedGroupStructure() : GroupLayer {
// 	const parentGroup : GroupLayer = {
// 		id: new Date().toDateString(),
// 		name: 'Parent Group',
// 		type: 'group',
// 		groupBoolean: 'union',
// 		visible: true,
// 		locked: false,
// 		isSelected: false,
// 		componentType: 'none',
// 		boundingBox: {
// 			position: { x: 100, y: 100 },
// 			size: { width: 800, height: 600 }
// 		},
// 		childrenIds: [],
// 		transform: [[1, 0, 0], [0, 1, 0]]
// 	}

// 	// 子组1
// 	const childGroup1 : GroupLayer = {
// 		id: new Date().toDateString(),
// 		name: 'Boolean Group',
// 		type: 'group',
// 		groupBoolean: 'subtract',
// 		visible: true,
// 		locked: false,
// 		isSelected: false,
// 		componentType: 'none',
// 		boundingBox: {
// 			position: { x: 50, y: 50 },
// 			size: { width: 300, height: 200 }
// 		},
// 		childrenIds: [],
// 		style: {
// 			fill: ['rgba(255,0,0,0.3)']
// 		}
// 	}

// 	// 子组2
// 	const childGroup2 : GroupLayer = {
// 		id: new Date().toDateString(),
// 		name: 'Nested Items',
// 		type: 'group',
// 		groupBoolean: 'union',
// 		visible: true,
// 		locked: false,
// 		isSelected: false,
// 		componentType: 'none',
// 		boundingBox: {
// 			position: { x: 200, y: 300 },
// 			size: { width: 400, height: 300 }
// 		},
// 		childrenIds: [],
// 		transform: [[0.8, 0, 0], [0, 0.8, 0]]
// 	}

// 	parentGroup.childrenIds = [childGroup1.id, childGroup2.id]
// 	return parentGroup
// }

// // 创建复杂形状组合
// function createComplexShapeGroup() : GroupLayer {
// 	const group : GroupLayer = {
// 		id: new Date().toDateString(),
// 		name: 'Shape Collection',
// 		type: 'group',
// 		groupBoolean: 'union',
// 		visible: true,
// 		locked: false,
// 		isSelected: false,
// 		componentType: 'none',
// 		boundingBox: {
// 			position: { x: 500, y: 200 },
// 			size: { width: 600, height: 400 }
// 		},
// 		childrenIds: [],
// 		style: {
// 			stroke: [{
// 				color: '#333',
// 				width: 2,
// 				type: 'dashed',
// 				vertexType: 'round',
// 				dashStyle: {
// 					length: 10,
// 					offset: 0,
// 					gap: 5,
// 					endpoint: 'round'
// 				}
// 			}]
// 		}
// 	}

// 	return group
// }

// // 创建文本图层
// function createTextLayers() : TextLayer[] {
// 	return [
// 		{
// 			id: new Date().toDateString(),
// 			name: 'Heading Text',
// 			type: 'text',
// 			text: 'Metro Design System',
// 			visible: true,
// 			locked: false,
// 			isSelected: false,
// 			componentType: 'none',
// 			boundingBox: {
// 				position: { x: 200, y: 50 },
// 				size: { width: 400, height: 60 }
// 			},
// 			sizeType: 'fixed',
// 			textStyle: {
// 				color: '#2c3e50',
// 				font: {
// 					size: 36,
// 					family: 'Arial',
// 					weight: 'bold'
// 				},
// 				align: 'center',
// 				verticalAlign: 'center',
// 				lineHeight: 1.2,
// 				wordSpacing: 2,
// 				letterSpacing: 1
// 			}
// 		},
// 		{
// 			id: new Date().toDateString(),
// 			name: 'Caption Text',
// 			type: 'text',
// 			text: 'Version 2.0 · 2024',
// 			visible: true,
// 			locked: true,
// 			isSelected: false,
// 			componentType: 'instance',
// 			masterComponentId: 'text-component',
// 			boundingBox: {
// 				position: { x: 300, y: 500 },
// 				size: { width: 200, height: 30 }
// 			},
// 			sizeType: 'autoWidth',
// 			textStyle: {
// 				color: '#7f8c8d',
// 				font: {
// 					size: 14,
// 					family: 'Helvetica',
// 					weight: 'normal'
// 				},
// 				align: 'right',
// 				verticalAlign: 'bottom',
// 				lineHeight: 1.5,
// 				wordSpacing: 1,
// 				letterSpacing: 0.5
// 			}
// 		}
// 	]
// }

// // 创建形状图层
// function createShapeLayers() : ShapeLayer[] {
// 	return [
// 		// 闭合路径（矩形）
// 		{
// 			id: new Date().toDateString(),
// 			name: 'Blue Rectangle',
// 			type: 'closedPath',
// 			visible: true,
// 			locked: false,
// 			isSelected: false,
// 			componentType: 'none',
// 			boundingBox: {
// 				position: { x: 150, y: 180 },
// 				size: { width: 120, height: 80 }
// 			},
// 			geometry: {
// 				path: 'M150,180 L270,180 L270,260 L150,260 Z',
// 				points: [
// 					createVertex(150, 180, 'corner'),
// 					createVertex(270, 180, 'corner'),
// 					createVertex(270, 260, 'corner'),
// 					createVertex(150, 260, 'corner')
// 				]
// 			},
// 			style: {
// 				fill: ['rgba(52,152,219,0.8)'],
// 				stroke: [{
// 					color: '#2c3e50',
// 					width: 2,
// 					type: 'none',
// 					vertexType: 'round'
// 				}]
// 			},
// 			childrenId: null
// 		},
// 		// 开放路径（曲线）
// 		{
// 			id: new Date().toDateString(),
// 			name: 'Curve Path',
// 			type: 'path',
// 			visible: true,
// 			locked: false,
// 			isSelected: false,
// 			componentType: 'none',
// 			boundingBox: {
// 				position: { x: 400, y: 300 },
// 				size: { width: 200, height: 100 }
// 			},
// 			geometry: {
// 				path: 'M400,300 Q500,250 600,300',
// 				points: [
// 					createVertex(400, 300, 'directional'),
// 					createVertex(600, 300, 'smooth')
// 				]
// 			},
// 			style: {
// 				stroke: [{
// 					color: '#e74c3c',
// 					width: 3,
// 					type: 'dashed',
// 					vertexType: 'round',
// 					dashStyle: {
// 						length: 8,
// 						offset: 0,
// 						gap: 4,
// 						endpoint: 'round'
// 					}
// 				}]
// 			},
// 			childrenId: null
// 		}
// 	]
// }

// // 创建组件实例
// function createComponentInstances() : BaseLayer[] {
// 	const masterComponent : ShapeLayer = {
// 		id: 'master-circle',
// 		name: 'Master Circle',
// 		type: 'closedPath',
// 		visible: true,
// 		locked: true,
// 		isSelected: false,
// 		componentType: 'component',
// 		boundingBox: {
// 			position: { x: 0, y: 0 },
// 			size: { width: 100, height: 100 }
// 		},
// 		geometry: {
// 			path: 'M0,0 C50,0 100,50 100,100',
// 			points: [
// 				createVertex(0, 0, 'smooth'),
// 				createVertex(100, 100, 'smooth')
// 			]
// 		},
// 		style: {
// 			fill: ['#3498db'],
// 			shadow: [{
// 				color: 'rgba(0,0,0,0.3)',
// 				blur: 10,
// 				type: 'outer',
// 				offset: { x: 5, y: 5 },
// 				spread: 2
// 			}]
// 		},
// 		childrenId: null
// 	}

// 	// const instance1 : ShapeLayer = {
// 	// 	id: new Date().toDateString(),
// 	// 	name: 'Instance 1',
// 	// 	type: 'closedPath',
// 	// 	visible: true,
// 	// 	locked: false,
// 	// 	isSelected: false,
// 	// 	componentType: 'instance',
// 	// 	masterComponentId: 'master-circle',
// 	// 	boundingBox: {
// 	// 		position: { x: 200, y: 400 },
// 	// 		size: { width: 80, height: 80 }
// 	// 	},
// 	// 	transform: [[0.8, 0, 0], [0, 0.8, 0]],
// 	// 	childrenId: null
// 	// }

// 	// const instance2 : ShapeLayer = {
// 	// 	id: new Date().toDateString(),
// 	// 	name: 'Instance 2',
// 	// 	type: 'closedPath',
// 	// 	visible: true,
// 	// 	locked: false,
// 	// 	isSelected: false,
// 	// 	componentType: 'instance',
// 	// 	masterComponentId: 'master-circle',
// 	// 	boundingBox: {
// 	// 		position: { x: 300, y: 400 },
// 	// 		size: { width: 120, height: 120 }
// 	// 	},
// 	// 	transform: [[1.2, 0, 0], [0, 1.2, 0]],
// 	// 	style: {
// 	// 		fill: ['#e74c3c']
// 	// 	},
// 	// 	childrenId: null
// 	// }

// 	return [masterComponent]
// }

// // 辅助函数：创建顶点
// function createVertex(x : number, y : number, controlType : VertexControlType) : VertexAttributes {
// 	return {
// 		id: new Date().toDateString(),
// 		position: { x, y },
// 		vertexType: 'round',
// 		vertexControl: controlType,
// 		radius: 5
// 	}
// }