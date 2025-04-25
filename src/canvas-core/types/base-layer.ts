// src/canvas-core/types/base-layer.ts
import { LayerType, ComponentType, Transform } from "./core-types";
import { Coordinate, Size } from "./geometry-types";
import { StrokeStyle, ShadowStyle } from "./style-types";

export interface BaseLayer {
	id : string
	name : string
	type : LayerType
	visible : boolean
	locked : boolean
	isSelected : boolean
	componentType : ComponentType
	masterComponentId ?: string // 引用组件的ID
	boundingBox : { // 边界框
		position : Coordinate
		size : Size
	}
	transform ?: Transform // 变换矩阵
	style ?: {
		fill ?: string[] // 填充颜色
		stroke ?: StrokeStyle[] // 描边样式
		shadow ?: ShadowStyle[] // 阴影样式
	}
	childrenId ?: string[] // 子图层ID
	parentId ?: string  // 用于构建树形结构
}