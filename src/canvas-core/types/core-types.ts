// src/canvas-core/types/core-types.ts
export type LayerType = 'frame' | 'group' | 'closedPath' | 'path' | 'text' // 图层类型，框架层|组层|闭合路径|路径|文本
export type ComponentType = 'none' | 'component' | 'instance' // 组件类型，无组件|引用组件|实例组件
export type GroupBoolean = 'none' | 'union' | 'subtract' | 'intersection' | 'exclusion' // 组运算符，无运算|并|减去顶层|交|减去重叠

export type Transform = [
  [number, number, number], // 缩放, 1 表示不缩放, 2 表示放大两倍, 0.5 表示缩小一半
  [number, number, number] // 旋转, 1 表示不旋转, 0.5 表示逆时针旋转 90 度, -0.5 表示顺时针旋转 90 度
]; // 变换矩阵