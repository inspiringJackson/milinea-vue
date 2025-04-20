<template>
	<n-tree block-line checkable draggable :data="data" :checked-keys="checkedKeys" :expanded-keys="expandedKeys"
		@drop="handleDrop" @update:checked-keys="handleCheckedKeysChange"
		@update:expanded-keys="handleExpandedKeysChange">
		<template #prefix="{ node }">
			<n-icon :component="getIconForLevel(getNodeLevel(node))" />
		</template>
	</n-tree>
</template>

<script lang="ts">
	import type { TreeDropInfo, TreeOption } from 'naive-ui'
	import { repeat } from 'seemly'
	import { defineComponent, ref } from 'vue'
	import { NIcon } from 'naive-ui'

	function createData(level = 4, baseKey = '') : TreeOption[] | undefined {
		if (!level) return undefined
		return repeat(6 - level, undefined).map((_, index) => {
			const key = `${baseKey}${level}${index}`
			return {
				label: createLabel(level),
				key,
				children: createData(level - 1, key)
			}
		})
	}

	function createLabel(level : number) : string {
		if (level === 4) return '道生一'
		if (level === 3) return '一生二'
		if (level === 2) return '二生三'
		if (level === 1) return '三生万物'
		return ''
	}

	function findSiblingsAndIndex(
		node : TreeOption,
		nodes ?: TreeOption[]
	) : [TreeOption[], number] | [null, null] {
		if (!nodes) return [null, null]
		for (let i = 0; i < nodes.length; ++i) {
			const siblingNode = nodes[i]
			if (siblingNode.key === node.key) return [nodes, i]
			const [siblings, index] = findSiblingsAndIndex(node, siblingNode.children)
			if (siblings && index !== null) return [siblings, index]
		}
		return [null, null]
	}

	export default defineComponent({
		components: {
			NIcon
		},
		setup() {
			const expandedKeysRef = ref<string[]>([])
			const checkedKeysRef = ref<string[]>([])
			const dataRef = ref(createData() || [])

			// 根据节点key判断层级
			const getNodeLevel = (node : TreeOption) : number => {
				return node.key ? parseInt(node.key[0]) : 0
			}

			// 根据层级返回不同的图标
			const getIconForLevel = (level : number) => {
				switch (level) {
					case 4: return PlanetOutline
					case 3: return LeafOutline
					case 2: return FlowerOutline
					case 1: return SparklesOutline
					default: return SparklesOutline
				}
			}

			return {
				data: dataRef,
				expandedKeys: expandedKeysRef,
				checkedKeys: checkedKeysRef,
				getNodeLevel,
				getIconForLevel,
				handleExpandedKeysChange(expandedKeys : string[]) {
					expandedKeysRef.value = expandedKeys
				},
				handleCheckedKeysChange(checkedKeys : string[]) {
					checkedKeysRef.value = checkedKeys
				},
				handleDrop({ node, dragNode, dropPosition } : TreeDropInfo) {
					const [dragNodeSiblings, dragNodeIndex] = findSiblingsAndIndex(
						dragNode,
						dataRef.value
					)
					if (dragNodeSiblings === null || dragNodeIndex === null) return
					dragNodeSiblings.splice(dragNodeIndex, 1)
					if (dropPosition === 'inside') {
						if (node.children) {
							node.children.unshift(dragNode)
						} else {
							node.children = [dragNode]
						}
					} else if (dropPosition === 'before') {
						const [nodeSiblings, nodeIndex] = findSiblingsAndIndex(
							node,
							dataRef.value
						)
						if (nodeSiblings === null || nodeIndex === null) return
						nodeSiblings.splice(nodeIndex, 0, dragNode)
					} else if (dropPosition === 'after') {
						const [nodeSiblings, nodeIndex] = findSiblingsAndIndex(
							node,
							dataRef.value
						)
						if (nodeSiblings === null || nodeIndex === null) return
						nodeSiblings.splice(nodeIndex + 1, 0, dragNode)
					}
					dataRef.value = Array.from(dataRef.value)
				}
			}
		}
	})
</script>