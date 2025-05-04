# <img src="https://github.com/inspiringJackson/mycdn/blob/main/milinea-vue/logo5-1.svg" alt="logo" style="width: 60px; height: 60px;"> Milinea Vue - Vector Design Tool

We're (probably just me & AI, and welcome you!) developing a simple vector-based design tool that simplifies messy vector lines, which users draw, into something like clean subway-style route maps. Inspired by research like [this paper](http://www.jstott.me.uk/thesis/thesis-final.pdf).

At this early stage, it may resemble platforms like Figma or JsDesign... 

Current focus is on core functionality, vector path drawing...

![Preview](https://github.com/inspiringJackson/mycdn/blob/main/milinea-vue/preview4-28.png)

Built with Vue 3 `<script setup>` SFCs. Learn more about the template: [Vue 3 SFC Script Setup Docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup)

## Project Structure
```
src/
├── assets/                   # Static resource directory
├── components/               # Common components
├── config/                   # Configuration file
├── demo/
│   └── testShapes.ts         # Graphic test module
├── layout/
│   └── components/           # Layout related components
├── locales/                  # Internationalization configuration
├── paper-core/               # Core drawing module
│   ├── renderers/            # Graphics renderers
│   ├── tools/
│   │   ├── keyboard-events/  # Keyboard event handling
│   │   ├── mouse-events/     # Mouse event handling
│   │   ├── wheel-events/     # Wheel event handling
│   │   └── toolManager.ts    # Tool management system
│   └── utils/
├── stores/
│   └── usePaperStore.ts      # Global state management
├── App.vue
└── main.js
```

## Development Goals Recently

- [ ] Improve scroll bar functionality
- [ ] Make the tools work (1 / 9 completed)
- [ ] Implement vector simplification algorithms (maybe use [Simplify.js](https://mourner.github.io/simplify-js/))
- [ ] Optimize rendering performance

Written by AI, for reference only
