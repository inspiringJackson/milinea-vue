<template>
	<div class="project-tree">
		<div v-for="item in flatTree" :key="item.id" class="tree-node" :style="{ paddingLeft: `${item.depth * 24}px` }"
			@click="handleItemClick(item, $event)" :class="{ 'selected': isSelected(item) }">
			<div class="node-content">
				<img v-if="item.children.length" src="src/assets/icons/menuArrow.svg" class="arrow-icon" :class="{ rotated: item.isOpen }"
					@click.stop="toggleExpand(item)" />
				<span class="node-label">{{ item.name }}</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { computed, ref } from 'vue'
	import { usePaperStore } from '../../../stores/usePaperStore' 
	import type { PaperItemNode } from './types'
	import paper from 'paper'

	const store = usePaperStore()
	const ctrlPressed = ref(false)

	// 转换项目结构为扁平树形结构
	const flatTree = computed(() => {
		const result : PaperItemNode[] = []
		if (!store.project) return result

		const traverse = (items : paper.Item[], depth : number, parentId ?: number) => {
			items.forEach(item => {
				const node : PaperItemNode = {
					id: item.id,
					name: item.name || `${item.className}-${item.id}`,
					depth,
					parentId,
					isOpen: expandedItems.value.includes(item.id),
					children: [],
					raw: item
				}

				if (item instanceof paper.Group || item instanceof paper.Layer) {
					node.children = item.children.map(c => c.id)
					traverse(item.children, depth + 1, item.id)
				}

				result.push(node)
			})
		}

		traverse(store.project.layers, 0)
		return result
	})

	// 展开状态管理
	const expandedItems = ref<number[]>([])
	const nodeMap = computed(() =>
		new Map(flatTree.value.map(node => [node.id, node])))

	// 处理多选逻辑
	const handleItemClick = (item : PaperItemNode, event : MouseEvent) => {
		if (event.ctrlKey || event.metaKey) {
			if (store.selectedItems.some(i => i.id === item.id)) {
				store.removeItem(item.raw)
			} else {
				store.addItem(item.raw)
			}
		} else {
			store.setItems([item.raw])
		}
	}

	// 选中状态判断
	const isSelected = (item : PaperItemNode) =>
		store.selectedItems.some(i => i.id === item.id)

	// 展开/折叠切换
	const toggleExpand = (item : PaperItemNode) => {
		const index = expandedItems.value.indexOf(item.id)
		if (index > -1) {
			expandedItems.value.splice(index, 1)
		} else {
			expandedItems.value.push(item.id)
		}
	}

	// 处理键盘事件
	window.addEventListener('keydown', (e) => {
		ctrlPressed.value = e.ctrlKey || e.metaKey
	})
	window.addEventListener('keyup', () => {
		ctrlPressed.value = false
	})
</script>

<style scoped>
	.project-tree {
		font-family: monospace;
		user-select: none;
	}

	.tree-node {
		padding: 8px 12px;
		cursor: pointer;
		transition: background 0.2s;
	}

	.tree-node:hover {
		background: rgba(0, 0, 0, 0.05);
	}

	.selected {
		background: #e3f2fd;
		font-weight: bold;
	}

	.node-content {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.arrow-icon {
		width: 12px;
		height: 12px;
		transition: transform 0.2s;
		cursor: pointer;
	}

	.rotated {
		transform: rotate(90deg);
	}

	.node-label {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>