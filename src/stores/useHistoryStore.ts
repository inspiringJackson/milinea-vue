// src/stores/useHistoryStore.ts
import { defineStore } from 'pinia'

export interface Command {
	execute() : void
	undo() : void
	redo() : void
}

export interface HistoryState {
	commands : Command[]
	currentIndex : number
	maxHistory : number
}

export const useHistoryStore = defineStore('history', {
	state: () : HistoryState => ({
		commands: [],
		currentIndex: -1,
		maxHistory: 100
	}),
	actions: {
		addCommand(command : Command) {
			// 移除当前索引之后的所有命令
			this.commands.splice(this.currentIndex + 1)
			this.commands.push(command)

			// 保持历史记录不超过最大限制
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
		}
	}
})