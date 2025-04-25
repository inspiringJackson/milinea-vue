// src/canvas-core/types/layers/group-layer.ts
import { BaseLayer } from "./../base-layer";
import { GroupBoolean } from "./../core-types";

export interface GroupLayer extends BaseLayer {
	type : 'group'
	groupBoolean : GroupBoolean
	childrenIds : string[]
}