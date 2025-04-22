// src/canvas-core/utils/rulerStep.ts
export function getRulerStep(
	zoom : number,
) : number {
	// 缩放比例与刻度间距的对应表（按缩放比例降序排列）
	// english: zoom ratio and ruler step correspondence table (ordered by zoom ratio in descending order)
	const rulerSteps = [
		{ threshold: 5000, step: 1 },
		{ threshold: 2500, step: 2 },
		{ threshold: 1000, step: 5 },
		{ threshold: 500, step: 10 },
		{ threshold: 200, step: 25 },
		{ threshold: 100, step: 50 },
		{ threshold: 50, step: 100 },
		{ threshold: 20, step: 250 },
		{ threshold: 10, step: 500 },
		{ threshold: 5, step: 1000 },
		{ threshold: 2, step: 2500 },
		{ threshold: 0, step: 5000 } // 默认值
	]
		
	// 查找第一个满足缩放比例 >= 阈值的步长
	// english: find the first ruler step that satisfies zoom ratio >= threshold
	const matched = rulerSteps.find(item => zoom * 100 >= item.threshold)
	return matched ? matched.step : 5000
}