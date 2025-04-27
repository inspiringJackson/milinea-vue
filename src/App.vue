<script setup>
	// This starter template is using Vue 3 <script setup> SFCs
	// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
	import NavBar from './layout/components/Navbar.vue'
	import SideTools from './layout/components/sideTools/SideTools.vue'
	import LeftMenu from './layout/components/leftMenuPanel/LeftMenuPanel.vue'
	import CanvasBoard from './components/CanvasBoard.vue'
	import {
		useHistoryStore
	} from './stores/useHistoryStore'
	import {
		onMounted
	} from 'vue'
	import {
		useI18n
	} from 'vue-i18n'

	const {
		t
	} = useI18n()

	const historyStore = useHistoryStore()

	onMounted(() => {
		const handleKeydown = (e) => {
			e.preventDefault()
			if (e.ctrlKey && e.key === 'z') {
				historyStore.undo()
			} else if (e.ctrlKey && e.key === 'y') {
				historyStore.redo()
			}
		}

		window.addEventListener('keydown', handleKeydown)
	})
</script>

<template>
	<div id="app" @keydown="onKeydown" @keypress="onKeypress" @keyup="onKeyup">
		<NavBar />
		<div class="main" @contextmenu.prevent="handleContextMenu">
			<SideTools />
			<n-split direction="horizontal" min="240px" :max="0.4" default-size="240px">
				<template #1>
					<LeftMenu />
				</template>
				<template #2>
					<CanvasBoard />
				</template>
			</n-split>
		</div>
	</div>
</template>

<style scoped lang="scss">
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	.NavBar {
		flex-shrink: 0;
	}

	.main {
		flex-grow: 1;
		display: flex;
		min-height: 0;

		.n-split {
			height: 100%;
		}
	}
</style>