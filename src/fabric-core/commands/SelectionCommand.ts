// src/fabric-core/commands/SelectionCommand.ts
import { Command } from "../../stores/useHistoryStore"
import { useFabricStore } from "../../stores/useFabricStore"
import { FabricObject, ActiveSelection } from "fabric"

export class SelectionCommand implements Command {
	constructor(
		private readonly prevSelection: FabricObject[],
		private readonly newSelection: FabricObject[]
	) { }
	
	redo(): void {
		this.execute()
	}
	
	undo(): void {
		this.applySelection(this.prevSelection)
	}
	
	execute(): void {
		this.applySelection(this.newSelection)
	}
	
	private applySelection(selection: FabricObject[]) {
		const canvas = useFabricStore().fabricCanvas
		if (selection.length === 0) canvas.discardActiveObject()
		else if (selection.length === 1) canvas.setActiveObject(selection[0])
		else {
			const activeSelection = new ActiveSelection(selection)
			canvas.setActiveObject(activeSelection)
		}
		canvas.renderAll()
	}
}