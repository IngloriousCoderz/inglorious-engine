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

1. **Single Source of Truth**: Your entire game state is a single, plain JavaScript object. This gives you complete control over your game's world at any moment, rather than having state scattered across countless objects. This is the core idea behind the Data-Oriented Design (DOD) paradigm that many modern engines are now adopting. With this engine, you get that benefit naturally.
2. **Efficient Immutability**: A common misconception is that creating a new state on every change is slow. This engine uses structural sharing (via Immer), meaning only the parts of the state that actually change are copied. The rest of the state tree is shared by reference, making updates extremely fast. This provides a huge benefit:
   - **Optimized Rendering**: Detecting changes becomes trivial and fast. A simple reference check (`prevState === nextState`) is all that's needed to determine if data has changed, enabling highly performant UIs (especially with libraries like React). This is much faster than the deep, recursive comparisons required in mutable systems.
3. **Pure Functions**: Game logic is built with pure functions — functions that return a value based only on their inputs, with no side effects. This makes your game logic predictable, easy to test in isolation, and highly reusable, freeing you from the complexity of class methods with hidden side effects.
4. **Composition over Inheritance**: Instead of complex class hierarchies, you build entities by composing functions. Think of it as a pipeline of operations applied to your data. This is a more flexible and powerful alternative to inheritance. You can mix and match behaviors (e.g., `canBeControlledByPlayer`, `canBeHurt`, `canShoot`) on the fly, avoiding the rigidity and common problems of deep inheritance chains.
5. **Dynamic by Nature**: JavaScript objects are dynamic. You can add or remove properties from an entity at any time without being constrained by a rigid class definition. This is perfect for game development, where an entity's state can change unpredictably (e.g., gaining a temporary power-up). This flexibility allows for more emergent game mechanics.
6. **Unparalleled Debugging and Tooling**: Because the entire game state is a single, serializable object, you can unlock powerful development patterns that are difficult to achieve in traditional OOP engines.
   - **Time-Travel Debugging**: Save the state at any frame. You can step backward and forward through state changes to find exactly when a bug was introduced.
   - **Hot-Reloading**: Modify your game's logic and instantly see the results without restarting. The engine can reload the code and re-apply it to the current state, dramatically speeding up iteration.
   - **Simplified Persistence**: Saving and loading a game is as simple as serializing and deserializing a single JSON object.
7. **Leverage the Full JavaScript Ecosystem**: As a pure JavaScript engine, you have immediate access to the world's largest software repository: npm. Need advanced physics, complex AI, or a specific UI library? Integrate it with a simple `npm install`. You aren't limited to the built-in features or proprietary plugin ecosystem of a monolithic engine like Godot or Unity.

## Contributing

We welcome contributions from the community! Whether you're fixing a bug, adding a feature, or improving the documentation, your help is appreciated.

### Development Setup

1.  Fork and clone the repository.
2.  Install dependencies using pnpm:
    ```bash
    pnpm install
    ```
3.  Run the Storybook documentation locally:
    ```bash
    pnpm storybook
    ```
4.  Run the unit tests:
    ```bash
    pnpm test
    ```

### Code Style

The project uses ESLint for linting and Prettier for formatting. Please ensure your code adheres to the project's style to avoid introducing errors.

A note on code style, particularly regarding "magic numbers" for vector components:

```js
const X = 0
const Y = 1
const Z = 2

const x = instance.position[X]
const y = instance.position[Y]
const z = instance.position[Z]
```

I find it cleaner to do like so:

```js
const [x, y, z] = instance.position
```

There are a few exceptions: in the `/docs` folder I prefer the first version because not everyone is used to destructuring and I wanted to make the examples as readable as possible for people coming from, say, Godot. In that case I would put the `X`, `Y`, and `Z` constants on top of the file, right below the imports.
