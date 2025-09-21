# IngloriousScript Playground

This directory contains a simple Vite project that serves as a live example of how to set up and use **[IngloriousScript](https://github.com/IngloriousCoderz/inglorious-engine/tree/main/packages/babel-plugin-inglorious-script)**.

This playground demonstrates:

- How to configure Vite and Babel to compile IngloriousScript.
- How to write game logic using vector operator overloading.
- How to configure your editor for `.ijs` file syntax highlighting.

## What is IngloriousScript?

IngloriousScript is a superset of JavaScript that enables intuitive vector math using standard operators.

```javascript
// Instead of this:
const newPosition = mod(add(position, scale(velocity, dt)), worldSize)

// You can write this:
const newPosition = (position + velocity * dt) % worldSize
```

## Getting Started

This playground is part of the Inglorious Engine monorepo.

1.  **Clone the repository** (if you haven't already):

    ```bash
    git clone https://github.com/IngloriousCoderz/inglorious-engine.git
    cd inglorious-engine
    ```

2.  **Install dependencies** from the root of the project:

    ```bash
    pnpm install
    ```

3.  **Run the playground**:
    ```bash
    pnpm --filter inglorious-script dev
    ```

This will start a Vite development server. Open your browser to the local URL provided to see it in action.

## Project Setup

The magic happens in just a few key places:

#### `vite.config.js`

We use `vite-plugin-babel` to run Babel during Vite's build process. The configuration is straightforward:

```javascript
// vite.config.js
export default {
  plugins: [
    babel({
      babelConfig: {
        presets: ["@inglorious/inglorious-script"],
      },
    }),
  ],
}
```

#### `src/main.ijs`

This is where the game logic lives. We use the `.ijs` (Inglorious JavaScript) extension to clearly separate files that use the special syntax. Notice how vector operations are simple, readable expressions.

## Editor Configuration (VS Code)

This playground comes with a pre-configured `.vscode/settings.json` file that automatically tells Visual Studio Code to treat `.ijs` files as JavaScript, enabling syntax highlighting and IntelliSense out of the box.

If you are setting up your own project from scratch, you can add the following configuration to your own `.vscode/settings.json` file to get the same behavior:

```json
{
  "files.associations": {
    "*.ijs": "javascript"
  }
}
```

This tells VS Code to treat files with the `.ijs` extension as standard JavaScript, giving you the syntax highlighting and IntelliSense you're used to.
