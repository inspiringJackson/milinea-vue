# <img src="https://github.com/inspiringJackson/mycdn/blob/main/milinea-vue/logo5-6.svg" alt="logo (inspired by Chinese character '线' which means 'line')" style="width: 60px; height: 60px;"> Milinea Vue - Vector Design Tool

我们（目前只有我和AI，但也欢迎你来！）正在开发一个简单的基于[Paper.js](https://github.com/paperjs/paper.js)的设计工具，将手绘的杂乱矢量线条简化成像是地铁路线图那样的图形。可以参考[这篇论文](http://www.jstott.me.uk/thesis/thesis-final.pdf)。
We're (probably just me & AI, and welcome you!) developing a simple [Paper.js](https://github.com/paperjs/paper.js)-based design tool that simplifies messy vector lines, which users draw, into something like clean subway-style route maps. Inspired by research like [this paper](http://www.jstott.me.uk/thesis/thesis-final.pdf).

早期正在搭建轻量化的，类似在线设计工具的框架。当前的目标是实现基础功能。
At this early stage, it may resemble platforms like mainstream online design tools. Current focus is on core functionality, vector path drawing.

![Preview](https://github.com/inspiringJackson/mycdn/blob/main/milinea-vue/preview4-28.png)

使用Vue 3`<script setup>`SFCs构建。了解有关模板的更多信息：[Vue 3 SFC Script Setup Docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup)
Built with Vue 3 `<script setup>` SFCs. Learn more about the template: [Vue 3 SFC Script Setup Docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup)

## 项目架构 Project Structure
```
src/
├── assets/                   # 静态资源目录 Static resource directory
├── components/               #  Vue组件目录 Common Vue components
├── demo/
│   └── testShapes.ts         # 测试图形用例 Paper graphic test module
├── layout/
│   └── components/           # 布局组件目录 Layout related components
├── locales/                  # 语言设置目录 Internationalization configuration (i18n)
├── paper-core/               # 画布核心目录 Core paper module
│   ├── commands/             # 操作命令目录 Command pattern implementations
│   ├── config/               # 枚举设定目录 Configuration files
│   ├── renderers/            # 渲染器目录   Graphics renderers
│   ├── tools/
│   │   ├── keyboard-events/  # 键盘事件目录 Keyboard event handling
│   │   ├── mouse-events/     # 鼠标事件目录 Mouse event handling
│   │   ├── tool-events/      # 工具事件目录 Paper.Tool event handling
│   │   ├── wheel-events/     # 滚轮事件目录 Wheel event handling
│   │   └── toolManager.ts    # 工具管理中心 Tool management system
│   ├── types/                # 类型设定目录 Interfaces and types definitions
│   └── utils/
├── stores/
│   ├── useHistoryStore.ts    # 操作历史储存 Undo/redo stack （基于增量命令模式 base on Incremental Command Pattern)
│   └── usePaperStore.ts      # 全局数据储存 Global state management
├── App.vue
└── main.js
```

## 当前目标 Development Goals Recently

- [ ] 实现工具 Make the tools work (6 / 9 completed)
- [ ] 实现算法 Implement vector simplification algorithms (maybe use [Simplify.js](https://mourner.github.io/simplify-js/))
- [ ] 优化性能 Optimize rendering performance

Written by AI, for reference only
