// src/canvas-core/types/layers/text-layer.ts
import { BaseLayer } from "./../base-layer";

export interface TextLayer extends BaseLayer {
	type : 'text'
	text : string
	sizeType : 'autoWidth' | 'autoHeight' | 'fixed' // 尺寸类型，自动|固定
	textStyle : {
		color : string
		font : { size : number; family : string; weight: string }
		align : 'left' | 'center' | 'right' | 'justify' // 对齐方式，左对齐|中对齐|右对齐|两端适应
		verticalAlign : 'top' | 'center' | 'bottom' // 垂直对齐方式，顶部对齐|居中对齐|底部对齐
		lineHeight : number // 行高
		wordSpacing : number // 字间距
		letterSpacing : number // 字母间距
	}
}