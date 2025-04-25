// src/canvas-core/types/layers/frame-layer.ts
import { BaseLayer } from "./../base-layer";
import { LayerType } from "./../core-types";

export interface FrameLayer extends BaseLayer {
	type : 'frame'
	childrenIds : string[]
}