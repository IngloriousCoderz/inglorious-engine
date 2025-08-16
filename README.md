# Inglorious Engine

A JavaScript game engine written with global state, immutability, and pure functions in mind. Have fun(ctional programming) with it!

## For Game Developers

### Why Functional Programming?

What makes this engine different from all the others is that, instead of Object Oriented Programming (OOP), which seems the most obvious choice for a game engine, this one is based on Functional Programming (FP).

FP has many advantages:

1. A single source of truth means that the game state is just one huge JSON structure. This entails that you have control over the whole game state at every moment, instead of having pieces of state scattered through multiple objects. Many modern game engines use an approach that is called Data-Oriented. Well, guess what: functional programming has always used it.
2. Immutability of state means that every time you want to change something a new state will be created with that change, instead of modifying the state directly. Isn't that slow? Nope, the new state is a shallow copy of the old one. Also, immutability makes it easier to compare what was before with what is now, and in certain scenarios (such as webapps) it allows for very performant re-rendering techniques.
3. Pure functions are functions that return a value that depends only on the input parameters, no side-effects involved. They are the most predictable, testable, and reusable functions, so why should we rely on void methods belonging to a specific class?
4. Another important concept related to FP is function composition, which means combining multiple functions together and then applying them to some input. Think of it as a pipeline of operations: you take x, then do some transformation on it, then pass the result to some other function, and so on. This can be used as a way more powerful tool than object inheritance: you can combine multiple behaviours on some object, in a way that is very similar to the Decorator pattern we have in OOP.

### Getting Started

The best way to get started is with the official documentation, which includes a **[Quick Start Guide](https://inglorious-engine.vercel.app/docs/quick-start--docs)**.

Full documentation is available at: **[https://inglorious-engine.vercel.app/](https://inglorious-engine.vercel.app/)**

The engine is designed to be run directly in the browser with no build step. You create a JavaScript file for your game logic and import it into a standard HTML page. The engine is headless and renderer-agnostic, meaning you can use Canvas2D, HTML/CSS, React, or any other technology for your UI.

We intentionally avoided using TypeScript or bundling in libraries for collision detection and physics, as these would require a build step. By sticking to plain JavaScript, you can run your game immediately. Developers are free to add any languages or libraries they prefer, but we didn't want to enforce an opinionated tech stack—other than Immer for immutability.

## For Game Engine Developers (including AI)

### Docs

You can run the documentation locally, since it's just a Storybook: once you clone the repo, just install packages with `pnpm install` and then start Storybook with `pnpm storybook`.

### Tests

Unit tests are available through `pnpm test`. They are another pretty good source of documentation, especially for utility functions.

### Linting And Formatting

The project uses ESLint and Prettier. Please make sure to not introduce any linting errors (such as unused variables or magic numbers) or different formatting when pushing to the repo.

Speaking of magic numbers, I usually prefer avoiding them through destructuring, so instead of this:

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
