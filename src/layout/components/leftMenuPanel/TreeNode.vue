<!-- // src/layout/components/leftMenuPanel/TreeNode.vue -->
<template>
	<div class="tree-node">
		<!-- <div class="node-content" :class="{ selected: isSelected }" @click="handleClick">
			<img v-if="hasChildren" src="src/assets/icons/menuArrow.svg" class="arrow" :class="{ expanded: isExpanded }"
				@click.stop="toggleExpand" />
			<span class="name">{{ layer.name }}</span>
		</div>

		<div v-if="hasChildren && isExpanded" class="children">
			<TreeNode v-for="child in childLayers" :key="child.id" :layer="child" :depth="depth + 1" />
		</div> -->
	</div>
</template>

<script setup lang="ts">
	import { computed, ref } from 'vue'
	// import { useCanvasStore } from '../../../stores/useCanvasStore'

	const props = defineProps<{
		layer : any
		depth : number
	}>()

	// // const store = useCanvasStore()
	// const isExpanded = ref(false)

	// const hasChildren = computed(() => {
	// 	return !!props.layer.childrenIds?.length
	// })

	// const childLayers = computed(() => {
	// 	return props.layer.childrenIds
	// 		?.map((id : string) => store.layers.find(l => l.id === id))
	// 		?.filter(Boolean) || []
	// })

	// const isSelected = computed(() => {
	// 	return store.selectedLayers.some(l => l.id === props.layer.id)
	// })

	// function getAllDescendantIds(layerId : string) : string[] {
	// 	const layer = store.layers.find(l => l.id === layerId)
	// 	if (!layer?.childrenIds) return []

	// 	let ids : string[] = []
	// 	layer.childrenIds.forEach(childId => {
	// 		ids.push(childId)
	// 		ids.push(...getAllDescendantIds(childId))
	// 	})
	// 	return ids
	// }

	// function toggleExpand() {
	// 	isExpanded.value = !isExpanded.value
	// }

	// function handleClick(event : MouseEvent) {
	// 	const prevSelected = store.selectedLayers.map(l => l.id)
	// 	const currentId = props.layer.id
	// 	const allIds = [currentId, ...getAllDescendantIds(currentId)]

	// 	let newSelected : string[] = []

	// 	if (event.ctrlKey) {
	// 		// 多选模式：切换选中状态
	// 		const isCurrentSelected = prevSelected.includes(currentId)
	// 		if (isCurrentSelected) {
	// 			newSelected = prevSelected.filter(id => !allIds.includes(id))
	// 		} else {
	// 			newSelected = [...new Set([...prevSelected, ...allIds])]
	// 		}
	// 	} else {
	// 		// 单选模式：全选当前分支
	// 		newSelected = allIds
	// 	}

	// 	const validLayers = newSelected
	// 		.map(id => store.layers.find(l => l.id === id))
	// 		.filter(Boolean)

	// 	store.commitSelectionChange(prevSelected, newSelected)
	// 	store.selectedLayers = validLayers
	// }
</script>

<style scoped>
	.node-content {
		display: flex;
		align-items: center;
		padding: 6px 12px;
		cursor: pointer;
		transition: background 0.2s;
		gap: 6px;
	}

	.node-content:hover {
		background: #f5f5f5;
	}

	.selected {
		background: rgb(231, 245, 238) !important;
	}

	.arrow {
		width: 12px;
		height: 12px;
		transform: rotate(-90deg);
		transition: transform 0.2s ease;
		opacity: 0.6;
	}

	.arrow.expanded {
		transform: rotate(0deg);
	}

	.children {
		margin-left: 24px;
	}

	.name {
		font-size: 14px;
		color: #333;
	}
</style>