import {
	defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import {
	NaiveUiResolver,
	Vuetify3Resolver
} from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler',
				silenceDeprecations: ['legacy-js-api'],
			}
		}
	},
	plugins: [
		vue(),
		AutoImport({
			imports: [
				'vue',
				{
					'naive-ui': [
						'NConfigProvider',
						'NMessageProvider',
						'NLayout',
						'NLayoutContent',
						'NLayoutHeader',
						'NButtonGroup',
						'NButton',
						'NIcon',
						'NDivider',
						'NLayoutSider',
						'NTooltip',
						'NDropdown',
						'NTabs',
						'NTabPane',
						'NSplit',
						'NTree',
						'UseMessage',
						'NMenu',
						'NInputNumber',
						'NInput',
						'NSelect'
					],
					'vuetify': [
						'VColorPicker',
					]
				}
			]
		}),
		Components({
			resolvers: [
				NaiveUiResolver(),
				Vuetify3Resolver()
			]
		})
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	server: {
		hmr: true,
		watch: {
			usePolling: true,
		}
	}

})