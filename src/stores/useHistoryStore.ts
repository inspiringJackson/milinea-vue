// src/paper-score/stores/useHistoryStore.ts
import { defineStore } from "pinia"
import { SelectItemCommand } from "../paper-core/commands/SelectItemCommand"
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
			console.log("undo")
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
			if (JSON.stringify(prevSelectedItems) === JSON.stringify(selectedItems)) {
				console.log("commitSelectItemChange same")
				return
			}
			console.log("commitSelectItemChange")
			// 否则，添加命令
			this.addCommand(
				new SelectItemCommand(prevSelectedItems, selectedItems, usePaperStore())
			)
		}
	}
})