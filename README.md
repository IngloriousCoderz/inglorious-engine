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

1. A single source of truth means that the game state is just one huge JSON structure. This entails that you have control over the whole game state at every moment, instead of having pieces of state scattered through multiple objects. To overcome the issue of scattered state, many modern game engines use an approach that is called Data-Oriented. Well, guess what: functional programming has always used it.
2. Immutability of state means that every time you want to change something a new state will be created with that change, instead of modifying the state directly. Isn't that slow? Nope, the new state is a shallow copy of the old one. Also, immutability makes it easier to compare what was before with what is now, and in certain scenarios (such as webapps) it allows for very performant re-rendering techniques.
3. Pure functions are functions that return a value that depends only on the input parameters, no side-effects involved. They are the most predictable, testable, and reusable functions, so why should we rely on void methods belonging to a specific class?
4. Another important concept related to FP is function composition, which means combining multiple functions together and then applying them to some input. Think of it as a pipeline of operations: you take x, then do some transformation on it, then pass the result to some other function, and so on. This can be used as a way more powerful tool than object inheritance: you can combine multiple behaviours on some object, in a way that is very similar to the Decorator pattern we have in OOP.

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
