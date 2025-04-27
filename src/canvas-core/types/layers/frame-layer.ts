// src/canvas-core/types/layers/frame-layer.ts
import { BaseLayer } from "./../base-layer"
import { LayerType } from "./../core-types"
import { MetroMap } from "../../metro/MetroMap"

export interface FrameLayer extends BaseLayer {
	type : 'frame'
	metroMap : MetroMap
	childrenIds : string[]
}