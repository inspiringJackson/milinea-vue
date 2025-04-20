// // 视口状态（保持响应式）
// export interface ViewportState {
// 	zoom : number
// 	offset : { x : number; y : number }
// 	viewportWidth : number
// 	viewportHeight : number
// 	worldWidth : number
// 	worldHeight : number
// }

// // 矩阵操作核心类型
// export type TransformMatrix = DOMMatrix & {
// 	invert() : TransformMatrix
// 	multiply(other : TransformMatrix) : TransformMatrix
// }