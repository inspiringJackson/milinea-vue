<template>
	<n-layout-sider collapse-mode="width" :collapsed-width="20" :width="240" :native-scrollbar="true"
		show-trigger="arrow-circle" content-style="padding: 24px;" bordered>
		<InputNumber v-model:model-value="myValue" prefixIcon="src/assets/icons/text.svg" has-prefix />
	</n-layout-sider>
</template>

<script setup lang="ts">
	import { ref } from "vue"
	import InputNumber from "./components/InputNumber.vue"
	
	const myValue = ref(50)
</script>

<style scoped lang="scss">
</style>