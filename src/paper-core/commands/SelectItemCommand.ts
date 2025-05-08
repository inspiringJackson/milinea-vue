// src/paper-core/commands/SelectItemCommand.ts
import { Command, useHistoryStore } from "../../stores/useHistoryStore"
import { usePaperStore } from "../../stores/usePaperStore"

export class SelectItemCommand implements Command {
	constructor(
		private prevSelection: paper.Item[],
		private newSelection: paper.Item[],
		private store: ReturnType<typeof usePaperStore>
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
	
	private applySelection(selection: paper.Item[]) {
		this.store.project.getItems({}).forEach((item) => {
			item.bounds.selected = selection.includes(item)
		})
		
		this.store.selectedItems = this.store.project.getItems({})
			.filter(item => selection.includes(item))
			
		
	}
	
}