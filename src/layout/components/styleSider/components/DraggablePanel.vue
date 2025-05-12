<template>
	<n-layout v-if="isVisible" ref="panelElement" class="draggable-panel"
		:style="{ transform: `translate(${x}px, ${y}px)` }">
		<n-layout-header class="header" @mousedown="startDrag" bordered>
			<div>{{ title }}</div>
			<button @click="close">×</button>
		</n-layout-header>
		<n-layout class="content">
			<slot></slot>
		</n-layout>
	</n-layout>
</template>

<script setup lang="ts">
	import { ref, nextTick, onUnmounted, defineProps } from 'vue'
	
	const props = defineProps({
		title: {
			type: String,
			default: ''
		}
	})

	// 状态管理
	// english: state management
	const isVisible = ref(false)
	const x = ref(0)
	const y = ref(0)
	const panelElement = ref<HTMLElement>()

	// 拖拽逻辑
	// english: drag logic
	let startX = 0
	let startY = 0
	let initialX = 0
	let initialY = 0

	const startDrag = (e : MouseEvent) => {
		e.preventDefault()
		startX = e.clientX
		startY = e.clientY
		initialX = x.value
		initialY = y.value

		document.addEventListener('mousemove', onMouseMove)
		document.addEventListener('mouseup', onMouseUp)
	}

	const onMouseMove = (e : MouseEvent) => {
		const dx = e.clientX - startX
		const dy = e.clientY - startY
		x.value = initialX + dx
		y.value = initialY + dy
	}

	const onMouseUp = () => {
		document.removeEventListener('mousemove', onMouseMove)
		document.removeEventListener('mouseup', onMouseUp)
	}

	// 显隐控制
	// english: visibility control
	const close = () => {
		isVisible.value = false
	}

	const show = async () => {
		isVisible.value = true
		await nextTick()
		const width = panelElement.value?.offsetWidth || 0
		const height = panelElement.value?.offsetHeight || 0
		x.value = window.innerWidth / 2 - width / 2
		y.value = window.innerHeight / 2 - height / 2
	}

	// 暴露方法给父组件
	// english: expose methods to parent component
	defineExpose({ show })

	// 清理事件监听
	// english: clean up event listeners
	onUnmounted(() => {
		document.removeEventListener('mousemove', onMouseMove)
		document.removeEventListener('mouseup', onMouseUp)
	})
</script>

<style scoped lang="scss">
	.draggable-panel {
		position: fixed;
		top: 0;
		left: 0;
		border-radius: 4px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		user-select: none;
		z-index: 1000;
		
		.header {
			padding: 4px 12px;
			cursor: move;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		
		.header button {
			border: none;
			background: none;
			font-size: 18px;
			cursor: pointer;
			color: var(--text-color);
		}
		
		.content {
			padding: 4px 12px;
		}
	}
</style>