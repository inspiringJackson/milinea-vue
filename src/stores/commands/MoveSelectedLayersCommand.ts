// src/stores/commands/MoveSelectedLayersCommand.ts
import { Command, useHistoryStore } from "../useHistoryStore"
import { useCanvasStore } from "../useCanvasStore"

export class MoveSelectedLayersCommand implements Command {
	private layerStates : Array<{
		id : string
		prevX : number
		prevY : number
		newX : number
		newY : number
	}>

	constructor(
		private layerIds : string[],
		private deltaX : number,
		private deltaY : number,
		private canvasStore : ReturnType<typeof useCanvasStore>
	) {
		this.layerStates = layerIds.map(id => {
			const layer = this.canvasStore.dragState.originalPositions.find(l => l.id === id)!
			return {
				id,
				prevX: layer.x,
				prevY: layer.y,
				newX: layer.x + deltaX,
				newY: layer.y + deltaY
			}
		})
	}

	execute() {
		this.layerStates.forEach(state => {
			const layer = this.canvasStore.layers.find(l => l.id === state.id)!
			layer.boundingBox.position.x = state.newX
			layer.boundingBox.position.y = state.newY
		})

		this.canvasStore.canvasManager?.render()
	}

	undo() {
		this.layerStates.forEach(state => {
			const layer = this.canvasStore.layers.find(l => l.id === state.id)!
			layer.boundingBox.position.x = state.prevX
			layer.boundingBox.position.y = state.prevY
		})
		this.canvasStore.canvasManager?.render()
	}

	redo() {
		this.execute()
	}
}