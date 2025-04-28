# Milinea Vue - Vector Design Tool

We're (probably just me & AI, and welcome you!) developing a simple vector-based design tool that simplifies messy vector lines, which users draw, into something like clean subway-style route maps. Inspired by research like [this paper](http://www.jstott.me.uk/thesis/thesis-final.pdf).

At this early stage, it may resemble platforms like Figma or JsDesign... 

Current focus is on core functionality, vector path drawing...

![Preview](https://github.com/inspiringJackson/mycdn/blob/main/milinea-vue/preview4-28.png)

Built with Vue 3 `<script setup>` SFCs. Learn more about the template: [Vue 3 SFC Script Setup Docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup)

## Project Structure
```
src/                        # Main source code directory
├── assets/                 # Static asset files
│   ├── cursors/            # Custom cursor image files
│   └── icons/              # Application icon files (SVG/PNG)
│
├── canvas-core/            # Core canvas rendering functionality
│   ├── adapter/            # Adapters for different rendering environments
│   ├── components/         # Reusable canvas components
│   ├── core/               # Core rendering logic and base classes
│   ├── utils/              # Canvas utilities
│   ├── types/              # Canvas type definition
│   ├── renderers/          # Concrete renderer implementations
│   │   ├── grid/           # Grid auxiliary line renderer
│   │   ├── main/           # Main content renderer
│   │   ├── ruler/          # Ruler measurement components
│   │   └── scrollBar/      # Scrollbar components
│   │
│   ├── CanvasManager.ts    # Canvas state and lifecycle manager
│   └── RenderEngine.ts     # Main rendering engine
│
├── components/             # Vue components (non-canvas)
│   └── CanvasBoard.vue     # Vue wrapper for canvas
│
├── layout/                 # Application layout
│   └── components/         # Layout subcomponents
│
├── locales/                # Internationalization files
│
├── stores/                 # State management (Pinia)
│   ├── event-handlers/     # Mouse & keyboard events handlers
│   ├── commands/           # ​Incremental Command Pattern: Decompose complex operations into a series of revocable incremental steps
│   ├── useCanvasStore.ts   # Canvas-related state & actions
│   ├── layerUtils.ts       # Layers utils
│   ├── state.ts            # Canvas-related state
│   └── demoData.ts         # Demo data for testing
│
├── utils/                  # General utilities
│
└── App.vue                 # Root Vue component
```

## Development Goals Recently

- [ ] Improve scroll bar functionality
- [ ] Make the tools work (2 / 9 completed)
- [ ] Implement vector simplification algorithms (maybe use [Simplify.js](https://mourner.github.io/simplify-js/))
- [ ] Optimize rendering performance

Written by AI, for reference only
