import {
	defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import {
	NaiveUiResolver
} from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		AutoImport({
			imports: [
				'vue',
				{
					'naive-ui': [
						'NButton',
						'NIcon',
						'NDivider',
						'NTooltip',
						'NDropdown',
						// 'NLayout',
						// 'NLayoutHeader',
						'NTabs',
						'NTabPane',
						'NSplit',
						'NTree',
						'UseMessage',
					]
				}
			]
		}),
		Components({
			resolvers: [
				NaiveUiResolver()
			]
		})
	],
	server: {
		hmr: true,
		watch: {
			usePolling: true,
		}
	}
		
})