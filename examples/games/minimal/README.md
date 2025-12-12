# Inglorious Engine: Zero-Build Example

This directory demonstrates the "zero-build" philosophy of the Inglorious Engine. You can create a complete game using just three files, with no bundlers, compilers, or complex configuration required.

It's the quickest way to get started and see the engine in action.

## The Zero-Build Approach

The core idea is to leverage modern browser features like **ES Modules** and **Import Maps** to load the engine directly from a CDN. This means you can write standard JavaScript and run it without any build step.

### How It Works

1.  **`index.html`**: This is the main entry point. It contains an `<importmap>` which tells the browser where to find the engine's modules (e.g., on the `unpkg` CDN). It then loads the main engine script with `<script type="module">`.

2.  **`game.js`**: This is where your game logic lives. The `index.html` file imports it as a module. You can define your game's initial state, entities, and event handlers here.

3.  **`style.css`**: Standard CSS for styling your game's canvas and HTML elements.

## How to Run This Example

From the root of the `inglorious-forge` monorepo, run:

```bash
pnpm game
```

This command uses the `serve` package to start a simple web server for this directory. You can use any static file server you prefer.

## Your Turn

Open `game.js` and start building! The current file is a blank slate. Try adding an entity and giving it some behavior.

## Want More Power?

This zero-build setup is perfect for getting started, prototyping, and building many types of games.

When your project grows and you want more advanced features — like the intuitive vector math syntax provided by **[IngloriousScript](https://www.npmjs.com/package/@inglorious/babel-preset-inglorious-script)** — you can optionally introduce a build step.

To see an example of that, check out the **`inglorious-script` playground**, which shows how to integrate the Babel preset into a Vite project.
