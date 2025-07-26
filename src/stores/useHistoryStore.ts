// src/stores/useHistoryStore.ts
import { defineStore } from "pinia"
import { SelectionCommand } from "../fabric-core/commands/SelectionCommand"
import { FabricObject } from "fabric"

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
			// command.execute()
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
		
		commitSelectionChange(prevSelection: FabricObject[], selection: FabricObject[]) {
			// 判断新旧数组是否相同，如果相同直接返回
			// english: if the new and old arrays are the same, return directly
			// console.log(prevSelection, selection)
			if (JSON.stringify(prevSelection) === JSON.stringify(selection)) {
				return
			}
			// console.log("commitSelectionChange")
			// 否则，添加命令
			// otherwise, add a command
			this.addCommand(
				new SelectionCommand(prevSelection, selection)
			)
		}
	}
})