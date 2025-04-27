<template>
	<div class="left-menu-panel">
		<n-tabs type="line" :animated="false" :tabs-padding="20" :theme-overrides="tabsStyleOverrides">
			<n-tab-pane name="layerMenu" :tab="t('menuTabs.layers')">
				<PageMenu class="page-menu"></PageMenu>
				<n-divider></n-divider>
				<MenuTree />
			</n-tab-pane>
			<n-tab-pane name="componentMenu" :tab="t('menuTabs.components')">
				
			</n-tab-pane>
		</n-tabs>
	</div>
</template>

<script setup lang="ts">
	import { defineAsyncComponent } from 'vue'
	import MenuTree from './MenuTree.vue'
	import PageMenu from './PageMenu.vue'
	import { useI18n } from 'vue-i18n'
	
	const { t } = useI18n()
	
	const tabsStyleOverrides = {
		panePaddingMedium: '0px'
	}
</script>

<style scoped lang="scss">
	.left-menu-panel {
		width: 100%;
		height: 100%;
		
		.page-menu {
			height: 160px;
			overflow: auto;
		}
		
		:deep(.n-tabs) {
			
			.n-tabs-nav {
				width: 100%;
				flex-shrink: 0;
			}
			
			.n-tabs-pane-wrapper {
				flex: 1;
				overflow: auto;
				
				.n-tab-pane {
					height: 100%;
					
					.n-divider {
						margin: 2px 0;
					}
				}
			}
		}
	}
</style>