# <p align="center"><img src="https://github.com/inspiringJackson/mycdn/blob/main/milinea-vue/logo5-6.svg" alt="logo (inspired by Chinese character '线' which means 'line')" style="width: 100px; height: 100px;"></p><p align="center">$\color{rgb(237, 207, 61)}{\huge{M}}$  $\color{rgb(0, 103, 158)}{\huge{i}}$  $\color{rgb(232, 158, 71)}{\huge{l}}$  $\color{rgb(1, 130, 74)}{\huge{i}}$  $\color{rgb(199, 5, 65)}{\huge{n}}$  $\color{rgb(199, 5, 65)}{\huge{e}}$  $\color{rgb(110, 3, 70)}{\huge{a}}$  $\color{rgb(157, 211, 45)}{\huge{\ }}$  $\color{rgb(0, 133, 138)}{\huge{V}}$  $\color{rgb(94, 201, 152)}{\huge{u}}$  $\color{rgb(245, 187, 23)}{\huge{e}}$ - $\small{Vector\ Design\ \ Tool}$</p>
# 

我们（目前只有我和AI，但也欢迎你来！）正在开发一个简单的基于[Fabric.js](https://github.com/fabricjs/fabric.js)的设计工具，将手绘的杂乱矢量线条简化成像是地铁路线图那样的图形。可以参考[这篇论文](http://www.jstott.me.uk/thesis/thesis-final.pdf)。<br>
We're (probably just me & AI, and welcome you!) developing a simple [Fabric.js](https://github.com/fabricjs/fabric.js)-based design tool that simplifies messy vector lines, which users draw, into something like clean subway-style route maps. Inspired by research like [this paper](http://www.jstott.me.uk/thesis/thesis-final.pdf).

## 项目进度 Project Progress
早期正在搭建轻量化的，类似在线设计工具的框架。当前的目标是实现基础功能。<br>
At this early stage, it may resemble platforms like mainstream online design tools. Current focus is on core functionality, vector path drawing.

目前正在从Paper.js向Fabric.js迁移。重构进度：<br>
Migration from Paper.js to Fabric.js - Current Progress:<br>
| [paper](https://github.com/inspiringJackson/milinea-vue/tree/paper) | fabric(current branch) |
|  ----  |  ----  |
| MoveView | √ |
| PanView | √ |
| ZoomView | √ |
| SelectTool | √ |
| PenTool |  |
| ShapeTool |  |
| GridRenderer | √ |
| RulerRenderer | √ |
| CommandSystem |  |
| UndoRedo |  |
| Theme | √ |
| CanvasNodeTree |  |

![Preview](https://github.com/inspiringJackson/mycdn/blob/main/milinea-vue/preview5-13.png)

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
├── fabric-core/              # 画布核心目录 Core fabric module
│   ├── commands/             # 操作命令目录 Command pattern implementations
│   ├── config/               # 枚举设定目录 Configuration files
│   ├── renderers/            # 渲染器目录   Graphics renderers
│   ├── tools/
│   │   ├── keyboard-events/  # 键盘事件目录 Keyboard event handling
│   │   ├── mouse-events/     # 鼠标事件目录 Mouse event handling
│   │   ├── wheel-events/     # 滚轮事件目录 Wheel event handling
│   │   └── toolManager.ts    # 工具管理中心 Tool management system
│   ├── types/                # 类型设定目录 Interfaces and types definitions
│   └── utils/
├── stores/
│   ├── useGlobalStore.ts     # 全局数据储存 Store global data
│   ├── useHistoryStore.ts    # 操作历史储存 Undo/redo stack （基于增量命令模式 base on Incremental Command Pattern)
│   └── useFabricStore.ts     # 画布数据储存 Store Canvas data
├── App.vue
└── main.js
```

## 当前目标 Development Goals Recently

- [ ] 实现工具 Make the tools work (6 / 9 completed)
- [ ] 实现布局、样式工具 Implement layout, appearance tools (0 / 11 completed, develop some design UI component currently)
- [ ] 实现自动简化和布局算法 Implement automatic simplification and format algorithms of vector (maybe use [Simplify.js](https://mourner.github.io/simplify-js/))
- [ ] 优化性能 Optimize rendering performance
