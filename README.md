# Milinea Vue - Vector Design Tool

We're (probably just me & AI, and welcome you!) developing a simple vector-based design tool that simplifies messy vector lines, which users draw, into something like clean subway-style route maps. Inspired by research like [this paper](https://i11www.iti.kit.edu/extra/publications/fhnrsw-dmmbc-12.pdf).

At this early stage, it may resemble platforms like Figma or JsDesign... 

Current focus is on core functionality, improving scroll bars and grid guides...

![Preview](https://github.com/inspiringJackson/mycdn/blob/main/milinea-vue/preview4-23.png)

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
│   ├── renderers/          # Concrete renderer implementations
│   │   ├── main/           # Main content renderer
│   │   ├── ruler/          # Ruler measurement components
│   │   └── scrollBar/      # Scrollbar components
│   │
│   ├── utils/              # Canvas utilities
│   │
│   ├── CanvasManager.ts    # Canvas state and lifecycle manager
│   ├── RenderEngine.ts     # Main rendering engine
│   └── types.ts            # Canvas type definitions
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
- [ ] Add grid guide system
- [ ] Make the tools work (2 / 9 finished)
- [ ] Implement vector simplification algorithms (maybe use [Simplify.js](https://mourner.github.io/simplify-js/))
- [ ] Optimize rendering performance

Written by AI, for reference only
