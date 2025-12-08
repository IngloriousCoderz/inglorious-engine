# my-game

This project is a starter template for creating a game with the Inglorious Engine using **IngloriousScript with TypeScript**.

## What is IngloriousScript?

IngloriousScript is a superset of JavaScript that enables intuitive vector math using standard operators, transformed by Babel.

```typescript
// Instead of this:
const newPosition = mod(add(position, scale(velocity, dt)), worldSize)

// You can write this:
// @ts-expect-error - IngloriousScript operators are transformed by Babel
const newPosition = (position + velocity * dt) % worldSize
```

## Getting Started

This project was scaffolded with `@inglorious/create-game`.

To get started, follow these steps:

1.  **Install dependencies**:
    Navigate to your project directory and install the required packages.
    ```sh
    pnpm install
    ```
2.  **Start the development server**:
    Run the following command to start the Vite development server.
    ```sh
    pnpm dev
    ```

This will start a Vite development server. Open your browser to the local URL provided to see it in action.

## Project Setup

- `index.html`: The main entry point for your game.
- `src/`: Contains your game's source code. Files ending in `.its` use IngloriousScript with TypeScript.
- `vite.config.js`: Vite configuration with the Babel plugin for IngloriousScript.
- `tsconfig.json`: TypeScript configuration.
- `package.json`: Project metadata and dependencies.

### Using `.its` files

The `.its` extension is for TypeScript files that use IngloriousScript's operator overloading. Since TypeScript doesn't natively support this, you must add a `@ts-expect-error` comment above lines with vector operations. This is normal and expected.

```typescript
// @ts-expect-error - IngloriousScript operators are transformed by Babel
const newPosition = (position + velocity * deltaTime) % worldSize
```

### Editor Configuration (VS Code)

This template includes a `.vscode/settings.json` file that tells Visual Studio Code to treat `.its` files as TypeScript, enabling full syntax highlighting and IntelliSense.

```json
{
  "files.associations": {
    "*.its": "typescript"
  }
}
```
