<!-- // src/layout/components/leftMenuPanel/MenuTree.vue -->
<template>
	<div class="layer-tree">
		<!-- <tree-node v-for="layer in rootLayers" :key="layer.id" :layer="layer" :depth="0" /> -->
	</div>
</template>

<script setup lang="ts">
	import { computed } from 'vue'
	// import { useCanvasStore } from '../../../stores/useCanvasStore'
	import TreeNode from './TreeNode.vue'

	// const store = useCanvasStore()

	// const rootLayers = computed(() => {
	// 	return store.layers.filter(layer =>
	// 		!store.layers.some(l => l.childrenIds?.includes(layer.id))
	// 	)
	// })
</script>

<style scoped>
	.layer-tree {
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
		user-select: none;
	}
</style>