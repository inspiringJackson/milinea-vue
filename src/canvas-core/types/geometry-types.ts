//src/canvas-core/types/geometry-types.ts
import { VertexType, VertexControlType } from "./style-types";

export type Coordinate = { x : number; y : number } // 坐标点

export type Size = { width : number; height : number } // 尺寸

export type ControlPoint = { // 贝塞尔曲线控制点
	id : string
	position : Coordinate
}

export type VertexAttributes = { // 顶点属性
	id : string
	position : Coordinate
	vertexType : VertexType
	vertexControl : VertexControlType
	connects ?: { // 连接的顶点
		id : string
		controlPoint ?: ControlPoint // 对应的贝塞尔控制点
	}[]
	radius ?: number
}