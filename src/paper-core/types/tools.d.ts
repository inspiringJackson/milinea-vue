// src/paper-core/types/tools.d.ts
import { Pinia } from "pinia"
import { usePaperStore } from "../../stores/usePaperStore"

export interface ITool {
	readonly name : string
	activate() : void
	deactivate() : void
}

export type ToolEvent = {
	point : paper.Point
	event : paper.ToolEvent
	state ?: Pinia
}