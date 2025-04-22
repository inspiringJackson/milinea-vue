# Milinea Vue - Vector Design Tool

We're developing a simple vector-based design tool (probably me & AI, and welcome you!) that simplifies messy vector lines into clean subway-style route maps. Inspired by research like [this paper](https://i11www.iti.kit.edu/extra/publications/fhnrsw-dmmbc-12.pdf).

At this early stage, it may resemble platforms like Figma or JsDesign. Current focus is on core functionality, improving scroll bars and grid guides.

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
│   │   │   └── MainContentRenderer.ts  # Primary canvas content renderer
│   │   ├── ruler/          # Ruler measurement components
│   │   │   ├── RulerRenderer.ts        # Ruler visualization
│   │   │   └── RulerMask.ts            # Ruler masking
│   │   └── scrollBar/      # Scrollbar components
│   │       └── ScrollBarRenderer.ts    # Custom scrollbar
│   │
│   ├── utils/              # Canvas utilities
│   │   ├── coordinate.ts   # Coordinate system helpers
│   │   └── rulerStep.ts    # Ruler calculation utilities
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
│   └── useCanvasStore.ts   # Canvas-related state
│
├── utils/                  # General utilities
│
└── App.vue                 # Root Vue component
```

## Key Features

- Vector line simplification (subway map style)
- Custom scroll bar implementation
- Grid guide system
- Canvas-based rendering engine
- Vue 3 composition API architecture

## Development Goals

- [ ] Improve scroll bar functionality
- [ ] Enhance grid guide system
- [ ] Implement vector simplification algorithms
- [ ] Optimize rendering performance

Written by AI, for reference only
