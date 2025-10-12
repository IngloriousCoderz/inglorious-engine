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

### `new Engine(...gameConfigs)`

Creates a new `Engine` instance, given one or more configuration objects.

**Parameters:**

- `gameConfig` (object): The game-specific configuration. It is an object with the following properties:
  - `loop` (object, optional): Configuration for the game loop.
    - `type` (string, optional): The type of loop to use (`animationFrame` or `fixed`). Defaults to `animationFrame`.
    - `fps` (number, optional): The target frames per second. Only used with the `fixed` loop type. Defaults to `60`.
  - `types` (object, optional): A map of entity types.
  - `entities` (object, optional): A map of initial entities.
  - `systems` (array, optional): An array of system objects, which define behaviors for the whole state.

**Returns:**

- A new `Engine` instance.

### `await engine.init()`

An asynchronous function that initializes the resources required for the game to load.

### `engine.start()`

Starts the game loop, triggering the first `update` and `render` calls.

### `engine.stop()`

Halts the game loop and cleans up any resources. This method also processes a final `stop` event to ensure a clean shutdown.

---

## Basic Usage

Here is a complete example showing how to set up and run a game using the engine.

```html
<!DOCTYPE html>
<html lang="en">
  <body>
    <canvas id="canvas" width="800" height="600"></canvas>

    <script type="text/javascript">
      window.process = { env: "development" }
    </script>

    <script type="importmap">
      {
        "imports": {
          "mutative": "https://unpkg.com/mutative@latest/dist/mutative.esm.mjs",
          "@inglorious/utils/": "https://unpkg.com/@inglorious%2Futils@latest/src/",
          "@inglorious/store/": "https://unpkg.com/@inglorious%2Fstore@latest/src/",
          "@inglorious/engine/": "https://unpkg.com/@inglorious%2Fengine@latest/src/",
          "@inglorious/renderer-2d/": "https://unpkg.com/@inglorious%2Frenderer-2d@latest/src/",
          "game": "/game.js"
        }
      }
    </script>

    <script
      type="module"
      src="https://unpkg.com/@inglorious%2Fengine@latest/src/main.js"
    ></script>
  </body>
</html>
```

---

## License

MIT © [Matteo Antony Mistretta](https://github.com/IngloriousCoderz)

This is free and open-source software. Use it however you want!

---

## Contributing

We welcome contributions from the community\! Whether you're fixing a bug, adding a feature, or improving the documentation, your help is appreciated. Please read our [Contributing Guidelines](https://github.com/IngloriousCoderz/inglorious-engine/blob/main/CONTRIBUTING.md) for details on how to get started.
