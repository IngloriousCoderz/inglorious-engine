# Inglorious Engine

[![NPM version](https://img.shields.io/npm/v/@inglorious/engine.svg)](https://www.npmjs.com/package/@inglorious/engine)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The core orchestrator for the [Inglorious Engine](https://github.com/IngloriousCoderz/inglorious-engine). This package provides a complete game loop, state management, and rendering pipeline in a single, cohesive unit. It is designed to be highly configurable and extensible, allowing you to build games with a functional, data-oriented approach.

---

## Core Concepts

The `@inglorious/engine` package acts as the central hub that brings together all the engine's components. Its main responsibilities are:

1.  **Orchestrating the Game Loop**: The `Engine` class manages the game loop, which is responsible for continuously updating the state and rendering the game. The loop can be configured to use different timing mechanisms, such as `animationFrame` or a fixed `fps`.

2.  **State Management**: It leverages the `@inglorious/store` package to manage the game's state. It provides methods to start, stop, and update the state manager, processing a queue of events on each frame.

3.  **Integrating the Renderer**: The engine is headless by design, but it can be configured with a renderer to display the game. The engine takes a renderer object in its configuration and integrates its systems and logic into the main game loop.

4.  **Dev Tools Integration**: The engine automatically connects to a browser's dev tools for debugging and time-travel capabilities if `devMode` is enabled in the game's state.

---

## Installation

```bash
npm install @inglorious/engine
```

---

## API

### `new Engine(gameConfig)`

Creates a new `Engine` instance.

**Parameters:**

- `gameConfig` (object): The game-specific configuration. It is an object with the following properties:
  - `loop` (object, optional): Configuration for the game loop.
    - `type` (string, optional): The type of loop to use (`animationFrame` or `fixed`). Defaults to `animationFrame`.
    - `fps` (number, optional): The target frames per second. Only used with the `fixed` loop type. Defaults to `60`.
  - `systems` (array, optional): An array of system objects, which define behaviors for the whole state.
  - `types` (object, optional): A map of entity types.
  - `entities` (object, optional): A map of initial entities.
  - `renderer` (object, optional): A renderer entity responsible for drawing the game. It must implement `getSystems()` and `init(engine)` methods.

**Returns:**

- A new `Engine` instance.

### `engine.start()`

Starts the game loop, triggering the first `update` and `render` calls.

### `engine.stop()`

Halts the game loop and cleans up any resources. This method also processes a final `stop` event to ensure a clean shutdown.

---

## Basic Usage

Here is a complete example showing how to set up and run a game using the engine.

```html
<!doctype html>
<html lang="en">
   
  <head>
       
    <meta charset="UTF-8" />
       
    <link rel="icon" type="image/svg+xml" href="/logo.png" />
       
    <link rel="stylesheet" href="/style.css" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

       
    <title>Inglorious Engine</title>
     
  </head>
   
  <body>
        <canvas id="canvas"></canvas>

       
    <script type="text/javascript">
      window.process = { env: "development" }
    </script>

       
    <script type="importmap">
      {
        "imports": {
          "immer": "https://unpkg.com/immer@10.1.1/dist/immer.mjs",
          "@inglorious/utils/": "https://unpkg.com/@inglorious%2Futils@1.1.0/",
          "@inglorious/store/": "https://unpkg.com/@inglorious%2Fstore@0.1.0/",
          "@inglorious/engine/": "https://unpkg.com/@inglorious%2Fengine@0.4.0/",
          "@inglorious/renderers/": "https://unpkg.com/@inglorious%2Frenderer-2d@0.2.0/",
          "game": "/game.js"
        }
      }
    </script>

       
    <script
      type="module"
      src="https://unpkg.com/@inglorious%2Fengine@0.2.0/src/main.js"
    ></script>
     
  </body>
</html>
```

---

## Contributing

We welcome contributions from the community\! Whether you're fixing a bug, adding a feature, or improving the documentation, your help is appreciated. Please read our [Contributing Guidelines](https://github.com/IngloriousCoderz/inglorious-engine/blob/main/CONTRIBUTING.md) for details on how to get started.
