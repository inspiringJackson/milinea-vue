// src/canvas-core/types/style-types.ts: 
export type EndpointType = 'none' | 'round' | 'square' | 'sharp' // 端点类型，不设置端点样式|圆形端点|方形端点|尖端端点
export type VertexType = 'none' | 'round' // 顶点类型，不设置顶点样式|圆形顶点
export type VertexControlType = 'corner' | 'smooth' | 'directional' | 'asymmetric' // 顶点控制点类型，角点|平滑|方向性|非对称
export type StrokeType = 'none' | 'dashed' // 线条类型，不设置线条样式|虚线
export type ShadowType = 'none' | 'inner' | 'outer' // 阴影类型，不设置阴影样式|内阴影|外阴影

export type StrokeStyle = { // 描边样式
	color : string
	width : number
	type : StrokeType
	vertexType : VertexType
	dashStyle ?: {
		length : number // 虚线长度
		offset : number // 虚线偏移
		gap : number // 虚线间隔
		endpoint : EndpointType
	}
}

export type ShadowStyle = { // 阴影样式
	color : string
	blur : number // 模糊度
	type : ShadowType
	offset : { x : number; y : number } // 偏移量
	spread : number // 阴影扩散
}