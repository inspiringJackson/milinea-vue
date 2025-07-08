// src/paper-score/stores/useHistoryStore.ts
import { defineStore } from "pinia"
import { SelectItemCommand } from "../paper-core/commands/SelectItemCommand"
import { ModeChangeCommand } from "../paper-core/commands/ModeChangeCommand"
import { usePaperStore } from "./usePaperStore"

export interface Command {
	execute() : void
	undo() : void
	redo() : void
}

export interface HistoryState {
	commands: Command[]
	currentIndex: number
	maxHistory: number
}

export const useHistoryStore = defineStore("history", {
	state: (): HistoryState => ({
		commands: [],
		currentIndex: -1,
		maxHistory: 100,
	}),
	actions: {
		addCommand(command: Command) {
			this.commands.splice(this.currentIndex + 1)
			this.commands.push(command)
			
			if (this.commands.length > this.maxHistory) {
				this.commands.shift()
				this.currentIndex = Math.max(this.currentIndex - 1, -1)
			}
			
			this.currentIndex = this.commands.length - 1
			command.execute()
		},
		
		undo() {
			if (this.currentIndex >= 0) {
				this.commands[this.currentIndex].undo()
				this.currentIndex--
			}
		},
		
		redo() {
			if (this.currentIndex < this.commands.length - 1) {
				this.currentIndex++
				this.commands[this.currentIndex].redo()
			}
		},
		
		clear() {
			this.commands = []
			this.currentIndex = -1
		},
		
		commitSelectItemChange(prevSelectedItems: any[], selectedItems: any[]) {
			// 判断新旧数组是否相同，如果相同直接返回
			// english: if the new and old arrays are the same, return directly
			if (JSON.stringify(prevSelectedItems) === JSON.stringify(selectedItems)) {
				return
			}
			// 否则，添加命令
			// otherwise, add a command
			this.addCommand(
				new SelectItemCommand(prevSelectedItems, selectedItems, usePaperStore())
			)
		},
		
		commitModeChange(prevMode: string, mode: string, item: paper.Item) {
			// 判断新旧模式是否相同，如果相同直接返回
			// english: if the new and old modes are the same, return directly
			if (prevMode === mode) {
				return
			}
			this.addCommand(
				new ModeChangeCommand(prevMode, mode, item, usePaperStore())
			)
		}
	}
})