<template>
	<div ref="draggableContainer" class="draggable-iframe" :style="{
      width: `${width}px`,
      height: `${height}px`,
      top: `${position.y}px`,
      left: `${position.x}px`,
    }">
		<!-- 拖拽手柄 -->
		<div class="drag-handle" @mousedown="startDrag"></div>
		<iframe :src="src" :style="{
        pointerEvents: isDragging ? 'none' : 'auto'
      }"></iframe>
	</div>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted,
		onUnmounted
	} from 'vue'

	const props = defineProps({
		src: {
			type: String,
			required: true
		},
		width: {
			type: Number,
			default: 300
		},
		height: {
			type: Number,
			default: 200
		}
	})

	const position = reactive({
		x: 50,
		y: 50
	}) // 初始位置
	const isDragging = ref(false)
	const draggableContainer = ref(null)

	let startX = 0
	let startY = 0
	let initialX = 0
	let initialY = 0

	const startDrag = (e) => {
		isDragging.value = true
		startX = e.clientX
		startY = e.clientY
		initialX = position.x
		initialY = position.y

		document.addEventListener('mousemove', handleDrag)
		document.addEventListener('mouseup', stopDrag)
	}

	const handleDrag = (e) => {
		if (!isDragging.value) return

		const dx = e.clientX - startX
		const dy = e.clientY - startY

		// 更新位置（可添加边界限制）
		position.x = initialX + dx
		position.y = initialY + dy
	}

	const stopDrag = () => {
		isDragging.value = false
		document.removeEventListener('mousemove', handleDrag)
		document.removeEventListener('mouseup', stopDrag)
	}

	// 组件卸载时清除事件监听
	onUnmounted(() => {
		document.removeEventListener('mousemove', handleDrag)
		document.removeEventListener('mouseup', stopDrag)
	})
</script>

<style scoped>
	.draggable-iframe {
		position: fixed;
		z-index: 9999;
		cursor: move;
		background: white;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
		border-radius: 4px;
	}

	.drag-handle {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 30px;
		background: #f0f0f0;
		cursor: move;
		z-index: 1;
	}

	iframe {
		width: 100%;
		height: calc(100% - 30px);
		border: none;
		position: absolute;
		bottom: 0;
	}
</style>