// src/canvas-core/types/layers/shape-layer.ts
import { BaseLayer } from "./../base-layer";
import { LayerType } from "./../core-types";
import { VertexAttributes } from "./../geometry-types";

export interface ShapeLayer extends BaseLayer {
	type : Exclude<LayerType, 'group' | 'frame' | 'text'>
	geometry : { // 几何形状
		path ?: string  // 矢量路径
		points ?: VertexAttributes[] // 顶点属性
	}
	childrenId : null // 不可再分 
}