# Inglorious Engine

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A JavaScript game engine written with global state, immutability, and pure functions in mind. Have fun(ctional programming) with it!

## Features

- **Functional & Data-Oriented**: Uses a single, immutable state object as the source of truth, inspired by functional programming principles.
- **Composable by Design**: Build complex behaviors by composing pure functions and decorators, offering a powerful alternative to inheritance.
- **Renderer Agnostic**: The engine is headless. You can use any rendering technology you like, from Canvas2D and HTML to React components.
- **Zero Build Step**: Write plain JavaScript and run it directly in the browser. No complex build configurations to worry about.

## Documentation

The best way to get started is with the official documentation, which includes a **[Quick Start Guide](https://inglorious-engine.vercel.app/?path=/docs/quick-start--docs)**.

Full documentation is available at: **[https://inglorious-engine.vercel.app/](https://inglorious-engine.vercel.app/)**

## Why Functional Programming?

What makes this engine different from all the others is that, instead of Object Oriented Programming (OOP), which seems the most obvious choice for a game engine, this one is based on Functional Programming (FP).

FP has many advantages:

1. **Single Source of Truth**: Your entire game state is a single, plain JavaScript object. This gives you complete control over your game's world at any moment, rather than having state scattered across countless objects. This is the core idea behind the Data-Oriented Programming (DOP) paradigm that many modern engines are now adopting. With this engine, you get that benefit naturally.

2. **Efficient Immutability**: A common misconception is that creating a new state on every change is slow. This engine uses structural sharing (via Immer), meaning only the parts of the state that actually change are copied. The rest of the state tree is shared by reference, making updates extremely fast. This provides a huge benefit:
   - **Optimized Rendering**: Detecting changes becomes trivial and fast. A simple reference check (`prevState === nextState`) is all that's needed to determine if data has changed, enabling highly performant UIs (especially with libraries like React). This is much faster than the deep, recursive comparisons required in mutable systems.

3. **Pure Functions**: Game logic is built with pure functions — functions that return a value based only on their inputs, with no side effects. This makes your game logic predictable, easy to test in isolation, and highly reusable, freeing you from the complexity of class methods with hidden side effects.

4. **Composition over Inheritance**: Instead of complex class hierarchies, you build entities by composing functions. Think of it as a pipeline of operations applied to your data. This is a more flexible and powerful alternative to inheritance. You can mix and match behaviors (e.g., `canBeControlledByPlayer`, `canBeHurt`, `canShoot`) on the fly, avoiding the rigidity and common problems of deep inheritance chains.

5. **Dynamic by Nature**: JavaScript objects are dynamic. You can add or remove properties from an entity at any time without being constrained by a rigid class definition. This is perfect for game development, where an entity's state can change unpredictably (e.g., gaining a temporary power-up). This flexibility allows for more emergent game mechanics.

6. **Unparalleled Debugging and Tooling**: Because the entire game state is a single, serializable object, you can unlock powerful development patterns that are difficult to achieve in traditional OOP engines.
   - **Time-Travel Debugging**: Save the state at any frame. You can step backward and forward through state changes to find exactly when a bug was introduced.
   - **Hot-Reloading**: Modify your game's logic and instantly see the results without restarting. The engine can reload the code and re-apply it to the current state, dramatically speeding up iteration.
   - **Simplified Persistence**: Saving and loading a game is as simple as serializing and deserializing a single JSON object.
   - **Simplified Networking**: For multiplayer games, you don't need to synchronize complex objects. You just send small, serializable `event` objects over the network. Each client processes the same event with the same pure event handler, guaranteeing their game states stay in sync.

7. **Leverage the Full JavaScript Ecosystem**: As a pure JavaScript engine, you have immediate access to the world's largest software repository: npm. Need advanced physics, complex AI, or a specific UI library? Integrate it with a simple `npm install`. You aren't limited to the built-in features or proprietary plugin ecosystem of a monolithic engine like Godot or Unity.

## Architecture: State Management

The engine's state management is inspired by Redux, but it's specifically tailored for the demands of game development. If you're familiar with Redux, you'll recognize the core pattern: the UI (or game view) is a projection of the state, and the only way to change the state is to dispatch an action.

However, there are several key differences that make it unique:

1.  **Events, not Actions**: In Redux, you "dispatch actions." Here, we "notify of events." This is a deliberate semantic choice. An event handler is a function that reacts to a specific occurrence in the game world (e.g., `playerMove`, `enemyDestroy`). The naming convention is similar to standard JavaScript event handlers like `onClick`, where the handler name describes the event it's listening for.

2.  **Asynchronous Event Queue**: Unlike Redux's synchronous dispatch, events are not processed immediately. They are added to a central event queue. The engine's main loop processes this queue once per frame. This approach has several advantages:
    - It decouples game logic from state updates.
    - It ensures state changes happen at a predictable point in the game loop, preventing race conditions or cascading updates within a single frame.
    - It allows for event batching and provides a solid foundation for networking and time-travel debugging.

3.  **Core Engine Events & Naming Convention**: The engine has a few built-in, **single-word** events that drive its core functionality. To avoid conflicts, you should use **multi-word `camelCase`** names for your own custom game events (`playerJump`, `itemCollect`). This convention is similar to how custom HTML elements require a hyphen to distinguish them from standard elements. Key engine events include:
    - `update`: Fired on every frame, typically carrying the `deltaTime` since the last frame. This is where you'll put most of your continuous game logic (like movement).
    - `add`: Used to add a new entity to the game state.
    - `remove`: Used to remove an entity from the game state.
    - `morph`: Used to dynamically change the behaviors associated with an entity's type.

4.  **Ergonomic Immutability with Immer**: The state is immutable, but to make this easy to work with, we use Immer. Inside your event handlers, you can write code that looks like it's mutating the state directly. Immer handles the magic behind the scenes, producing a new, updated state with structural sharing, giving you the performance benefits of immutability with the developer experience of mutable code.

5.  **Composable Handlers via Function Piping**: Instead of large, monolithic "reducers," you build event handlers by composing smaller, pure functions. The engine encourages a pipeline pattern where an event and the current state are passed through a series of decorators or transformations. This makes your logic highly modular, reusable, and easy to test in isolation.

6.  **Handlers Can Issue New Events (Controlled Side-Effects)**: In a strict Redux pattern, reducers must be pure. We relax this rule for a pragmatic reason: event handlers in this engine **can notify of new events**. This allows you to create powerful, reactive chains of logic. For example, an `enemy:take_damage` handler might check the enemy's health and, if it drops to zero, notify of a new `enemy:destroyed` event.
    - **How it works**: Any event notified from within a handler is simply added to the end of the main event queue. It will be processed in a subsequent pass of the game loop, not immediately. This prevents synchronous, cascading updates within a single frame and makes the flow of logic easier to trace.

    - **A Word of Caution**: This power comes with responsibility. It is possible to create infinite loops (e.g., event A's handler notifies of event B, and event B's handler notifies of event A). Developers should be mindful of this when designing their event chains.

## Dependencies

The core engine relies on a few key, lightweight packages:

- [immer](https://www.npmjs.com/package/immer): For enabling ergonomic immutable updates with structural sharing.
- [@inglorious/utils](https://www.npmjs.com/package/@inglorious/utils): A collection of small, pure utility functions for things like vector math and data manipulation.
- [@inglorious/store](https://www.npmjs.com/package/@inglorious/store): The environment-agnostic core state management library.

## Quick Start Example

Since the engine is headless, you must select a renderer to create a game. Below is a simple HTML file demonstrating how to set up a game using the engine and a 2D canvas renderer.

```html
<!DOCTYPE html>
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

## Contributing

We welcome contributions from the community! Whether you're fixing a bug, adding a feature, or improving the documentation, your help is appreciated. Please read our Contributing Guidelines for details on how to get started.
