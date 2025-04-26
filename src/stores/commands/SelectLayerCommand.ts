// src/stores/commands/SelectLayerCommand.ts
import { Command, useHistoryStore } from "../useHistoryStore"
import { useCanvasStore } from "../useCanvasStore"

export class SelectLayerCommand implements Command {
	constructor(
		private prevSelection : string[],
		private newSelection : string[],
		private store : ReturnType<typeof useCanvasStore>
	) { }

	execute() {
		this.applySelection(this.newSelection)
	}

	undo() {
		this.applySelection(this.prevSelection)
	}

	redo() {
		this.execute()
	}

	private applySelection(selectionIds : string[]) {
		// 更新所有图层的选中状态
		// english: update the selected state of all layers
		this.store.layers.forEach(layer => {
			layer.isSelected = selectionIds.includes(layer.id)
		})

		// 更新store的选中图层引用
		// english: update the reference of selected layers in store
		this.store.selectedLayers = this.store.layers
			.filter(l => selectionIds.includes(l.id))

		// 触发画布重新渲染选中状态
		// english: trigger canvas to re-render selected state
		this.store.canvasManager?.select()
	}
}