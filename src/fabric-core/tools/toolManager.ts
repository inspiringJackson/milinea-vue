// src/fabric-core/tools/toolManager.ts
// stores:
import { useFabricStore } from "../../stores/useFabricStore"
// enums:
import { ToolModes } from "../config/enums"
// types:
import { Point } from "fabric"
// tools:
import { MoveView } from "./mouse-events/MoveView"
import { ZoomView } from "./wheel-events/ZoomView"
import { PanView } from "./wheel-events/PanView"

export class ToolManager {
	private fabricStore: ReturnType<typeof useFabricStore>
	private isViewMoving: boolean = false
	
	// 以下是临时变量
	// the following are temporary variables
	private moveStart: Point | null = null
	
	constructor() {
		this.fabricStore = useFabricStore()
		this.initialize()
	}
	
	initialize() {
		this.setupViewEvents()
	}
	
	setupViewEvents() {
		const fabricCanvas = this.fabricStore.fabricCanvas
		fabricCanvas.on("mouse:down", (e) => this.handleViewMouseDown(e))
		fabricCanvas.on("mouse:move", (e) => this.handleViewMouseMove(e))
		fabricCanvas.on("mouse:up", (e) => this.handleViewMouseUp(e))
		fabricCanvas.on("mouse:wheel", (e) => this.handleWheel(e))
	}
	
	handleViewMouseDown(e: any) {
		if (this.fabricStore.currentTool === ToolModes.HAND_TOOL) {
			this.isViewMoving = true
			this.moveStart = new Point(e.e.clientX, e.e.clientY)
			this.fabricStore.fabricCanvas.defaultCursor = "grabbing"
		}
	}
	
	handleViewMouseMove(e: any) {
		if (this.isViewMoving && this.fabricStore.currentTool === ToolModes.HAND_TOOL) {
			const fabricCanvas = this.fabricStore.fabricCanvas
			this.moveStart = MoveView(e.e, fabricCanvas, this.moveStart)
		}
	}
	
	handleViewMouseUp(e: any) {
		if (this.isViewMoving && this.fabricStore.currentTool === ToolModes.HAND_TOOL) {
			this.isViewMoving = false
			this.moveStart = null
			this.fabricStore.fabricCanvas.defaultCursor = "grab"
		}
	}
	
	handleWheel(event: any) {
		const e = event.e
		e.preventDefault()
		if (e.ctrlKey && !e.shiftKey) {
			ZoomView(e, this.fabricStore.fabricCanvas)
		} else {
			const panType = this.getPanType(e)
			PanView(panType, e, this.fabricStore.fabricCanvas.getZoom(), this.fabricStore.fabricCanvas)
		}
	}
	
	getPanType(event : any) : 'horizontal' | 'vertical' | 'diagonal' | 'antiDiagonal' {
		if (!event.ctrlKey && event.shiftKey && !event.altKey) return 'horizontal'
		if (event.ctrlKey && event.shiftKey && !event.altKey) return 'antiDiagonal'
		if (!event.ctrlKey && event.shiftKey && event.altKey) return 'diagonal'
		return 'vertical'
	}
	
	switchTool(toolMode: ToolModes) {
		switch (toolMode) {
			case ToolModes.HAND_TOOL:
				this.fabricStore.fabricCanvas.forEachObject((obj) => {
					obj.selectable = false
					obj.evented = false
				})
				this.fabricStore.fabricCanvas.defaultCursor = "grab"
				this.fabricStore.fabricCanvas.hoverCursor = "grab"
				this.isViewMoving = false
				break
			default:
				this.fabricStore.fabricCanvas.forEachObject((obj) => {
					obj.selectable = true
					obj.evented = true
				})
				this.fabricStore.fabricCanvas.defaultCursor = "default"
				this.fabricStore.fabricCanvas.hoverCursor = "default"
				break
		}
	}
}