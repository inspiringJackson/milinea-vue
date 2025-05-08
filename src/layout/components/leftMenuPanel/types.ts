// src/layout/components/leftMenuPanel/types.ts
export interface PaperItemNode {
	id : number
	name : string
	depth : number
	parentId ?: number
	isOpen : boolean
	children : number[]
	raw : paper.Item
}