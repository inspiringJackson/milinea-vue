// src/paper-core/commands/ModeChangeCommand.ts
import { Command, useHistoryStore } from "../../stores/useHistoryStore"
import { usePaperStore } from "../../stores/usePaperStore"

export class ModeChangeCommand implements Command {
	constructor(
		private prevMode: string,
		private newMode: string,
		private item: paper.Item,
		private store: ReturnType<typeof usePaperStore>
	) { }
	
	execute() {
		this.applyChanging(this.newMode, this.item)
	}
	
	undo() {
		this.applyChanging(this.prevMode, this.item)
	}
	
	redo() {
		this.execute()
	}
	
	private applyChanging(mode: string, item: paper.Item) {
		this.store.currentMode = mode
		switch (mode) {
			case "DEFAULT":
				if (item) {
					item.selected = false
				}
				break;
			case "VE":
				if (item) {
					this.store.currentVEItem = item
					item.selected = true
				} else {
					this.store.currentVEItem = null
					this.store.currentMode = "DEFAULT"
				}
				break;
			default:
				this.store.currentMode = "DEFAULT"
				break;
		}
	}
	
}