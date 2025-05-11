<template>
	<n-layout-sider collapse-mode="width" :collapsed-width="20" :width="240" :native-scrollbar="true"
		show-trigger="arrow-circle" content-style="padding: 24px;" bordered>
		<InputNumber v-model:model-value="myValue" prefixIcon="src/assets/icons/text.svg" has-prefix />
		<InputColor v-model:model-value="myColor" prefixIcon="src/assets/icons/text.svg" />
		<ButtonsRadioGroup v-model="selectedTabButtonId" :buttons="tabButtons" />
		<ButtonsGroup @button-click="handleButtonClick" :buttons="buttons" />
	</n-layout-sider>
</template>

<script setup lang="ts">
	import { onMounted, watch, ref } from "vue"
	import InputNumber from "./components/InputNumber.vue"
	import InputColor from "./components/InputColor.vue"
	import ButtonsRadioGroup from "./components/ButtonsRadioGroup.vue"
	import ButtonsGroup from "./components/ButtonsGroup.vue"

	const myValue = ref(50)
	watch(myValue, (newValue, oldValue) => {
		if (newValue !== oldValue) {
			console.log(newValue)
		}
	})
	
	const myColor = ref("#000000")
	watch(myColor, (newValue, oldValue) => {
		if (newValue !== oldValue) {
			console.log(newValue)
		}
	})

	const tabButtons = ref([
		{ id: 0, name: "图标1", iconUrl: "src/assets/icons/text.svg" },
		{ id: 1, name: "图标2", iconUrl: "src/assets/icons/text.svg" },
		{ id: 2, name: "图标3", iconUrl: "src/assets/icons/text.svg" },
	])
	const selectedTabButtonId = ref(0)
	watch(selectedTabButtonId, (newValue, oldValue) => {
		if (newValue !== oldValue) {
			console.log(newValue)
		}
	})

	const buttons = ref([
		{ id: 0, name: "图标1", iconUrl: "src/assets/icons/text.svg" },
		{ id: 1, name: "图标2", iconUrl: "src/assets/icons/text.svg" },
		{ id: 2, name: "图标3", iconUrl: "src/assets/icons/text.svg" },
	])
	const handleButtonClick = (id : number) => {
		console.log(id)
	}
</script>

<style scoped lang="scss">
</style>