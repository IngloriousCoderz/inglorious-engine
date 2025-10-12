# Inglorious Server

A real-time, lightweight server designed to enable multiplayer experiences for games built with the Inglorious Engine. This server is built on Node.js and uses WebSockets to handle real-time communication, ensuring low-latency updates for all connected clients.

## Features

- **Real-Time Communication**: Uses WebSockets to provide bidirectional, low-latency communication between the server and clients.
- **Server-Authoritative Game State**: Manages a central game state using the `@inglorious/store` and acts as the single source of truth for all clients.
- **Scalable Architecture**: The server's logic is modular and split into dedicated files for handling game loading, the main game loop, and WebSocket events.
- **Dynamic Game Loading**: Supports loading game data from a specified JavaScript module, allowing you to easily run different game worlds without changing the server code.
- **Production-Ready Logging**: Uses `pino` for fast, structured logging, making it easy to monitor and debug in a production environment.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 22 or higher)
- [pnpm](https://pnpm.io/) (used for package management)

### Installation

1. Clone the Inglorious Engine repository:

```sh
git clone https://github.com/IngloriousCoderz/inglorious-engine.git
```

2. Navigate to the `@inglorious/server` directory:

```sh
cd packages/server
```

3. Install the dependencies:

```sh
pnpm install
```

## Usage

The server can be started using the `start` or `dev` scripts. You can optionally provide a path to a game module to load a specific game state.

### Running in Development Mode

To run the server with automatic restarts on file changes, use the `dev` script.

```sh
pnpm dev
```

### Running in Production Mode

To run the server in a production environment, use the `start` script.

```sh
pnpm start
```

### Loading a Specific Game

By default, the server will attempt to load a `./default-game.js` file. To load a different game, provide the file path as a command-line argument.

```sh
pnpm start ./path/to/your-game.js
```

## Project Structure

The server's code is split into several files to maintain a clear separation of concerns.

- `src/index.js`: The main entry point for the server. It orchestrates the setup of the HTTP and WebSocket servers and initializes the game store and its core handlers.
- `src/game-loader.js`: Handles the dynamic loading of the initial game state from a JavaScript module. It also includes a fallback state if the game file is not found.
- `src/game-loop.js`: Contains the core setInterval loop that drives the game logic by calling the store.update() function at a fixed tick rate (60 updates per second).
- `src/websocket-handler.js`: Manages all WebSocket events, including new connections, incoming messages, and disconnections. It dispatches client events to the store and broadcasts changes to all clients.

## Dependencies

- `@inglorious/store`: The state management solution for the game engine.
- `ws`: A simple and fast WebSocket library.
- `pino`: A highly performant logger for Node.js.

## License

MIT © [Matteo Antony Mistretta](https://github.com/IngloriousCoderz)

This is free and open-source software. Use it however you want!
