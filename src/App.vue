<script setup>
	// This starter template is using Vue 3 <script setup> SFCs
	// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
	import NavBar from './layout/components/Navbar.vue'
	import SideTools from './layout/components/sideTools/SideTools.vue'
	import LeftMenu from './layout/components/leftMenuPanel/LeftMenuPanel.vue'
	import StyleSider from './layout/components/styleSider/StyleSider.vue'
	import CanvasBoard from './components/CanvasBoard.vue'
	import {
		onMounted,
		watchEffect
	} from 'vue'
	import {
		useI18n
	} from 'vue-i18n'
	import {
		useHistoryStore
	} from './stores/useHistoryStore'
	import {
		useGlobalStore
	} from './stores/useGlobalStore'
	import {
		lightTheme,
		darkTheme
	} from 'naive-ui'

	const {
		t
	} = useI18n()

	const historyStore = useHistoryStore()
	const globalStore = useGlobalStore()
	const theme = computed(() =>
		globalStore.isDarkMode ? darkTheme : lightTheme
	)

	onMounted(() => {
		theme.value = globalStore.theme
		const handleKeydown = (event) => {
			event.preventDefault()
			if (event.ctrlKey && event.key === 'z') {
				historyStore.undo()
			} else if (event.ctrlKey && event.key === 'y') {
				historyStore.redo()
			}
		}

		window.addEventListener('keydown', handleKeydown)
	})
</script>

<template>
	<n-config-provider :theme="theme">
		<n-message-provider>
			<div id="app" @keydown="onKeydown" @keypress="onKeypress" @keyup="onKeyup">
				<NavBar />
				<div class="main" @contextmenu.prevent="handleContextMenu">
					<SideTools />
					
					<n-layout has-sider sider-placement="right">
						<n-split direction="horizontal" min="240px" :max="0.4" default-size="240px">
							<template #1>
								<LeftMenu />
							</template>
							<template #2>
								<!-- <n-split direction="horizontal" :min="0.2" :max="0.8"> -->
								<!-- <template #1> -->
								<CanvasBoard />
								<!-- </template> -->
								<!-- <template #2> -->
								<!-- <CanvasBoard /> -->
								<!-- </template> -->
								<!-- </n-split> -->
							</template>
							
						</n-split>
						<StyleSider />
					</n-layout>
				</div>
			</div>
		</n-message-provider>

	</n-config-provider>

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

<style>
	:root {
		--bg-color: #ffffff;
		--border-color: #eeeeee;
		--text-color: #000000;
		--filter: brightness(0);
		--base-icon-filter: brightness(0) invert(0.8) drop-shadow(0 0 0.5px white);
		--canvas-color: #f5f5f5;
		--tree-selected-color: rgb(231, 245, 238);
	}

	[data-theme="dark"] {
		--bg-color: rgb(24, 24, 28);
		--border-color: #333333;
		--text-color: #ffffff;
		--filter: brightness(0) invert(1) drop-shadow(0 0 0.5px white);
		--base-icon-filter: brightness(0) invert(0.6) drop-shadow(0 0 0.5px white);
		--canvas-color: #222222;
		--tree-selected-color: rgb(31, 45, 38)
	}

	body {
		background-color: var(--bg-color);
		color: var(--text-color);
		transition: background-color 0.3s, color 0.3s;
	}
</style>