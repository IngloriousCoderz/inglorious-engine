import http from "node:http"

import { createStore } from "@inglorious/store"
import pino from "pino"
import { WebSocketServer } from "ws"

import { loadGame } from "./game-loader.js"
import { start as startGameLoop } from "./game-loop.js"
import { setup as setupWebSocketHandler } from "./ws-handler.js"

// The server's port. You can change this or use an environment variable.
const PORT = 3000
const HTTP_STATUS_OK = 200

const logger = pino({ name: "Inglorious Server", level: "info" })

// =========================================================================
// Initial Game State
// =========================================================================

// Get the game file path from command-line arguments.
let [, , gameFilePath] = process.argv
gameFilePath ??= "./default-game.js"

const gameConfig = await loadGame(gameFilePath, logger)

// =========================================================================
// Server Setup
// =========================================================================

// Create a minimal HTTP server. The WebSocket server will be "attached" to this.
const httpServer = http.createServer((req, res) => {
  res.writeHead(HTTP_STATUS_OK, { "Content-Type": "text/plain" })
  res.end("Inglorious Server is running.")
})

// Create the WebSocket server.
const wss = new WebSocketServer({ server: httpServer })
const clients = new Set() // A Set to keep track of all connected clients.

// Initialize the game store. This is the central source of truth.
const store = createStore(gameConfig)

// A small-scale API for your systems and events to interact with the world.
// This can be expanded as needed.
const api = {
  // A simple broadcast function.
  broadcast: (event) => {
    // Stringify the event for transmission.
    const message = JSON.stringify(event)
    for (const client of clients) {
      client.send(message)
    }
  },
}

// =========================================================================
// Start Game Loop and WebSocket Handling
// =========================================================================

// Start the core game loop.
startGameLoop(store, api)

// Set up the WebSocket event handlers.
setupWebSocketHandler(wss, store, clients, logger)

// Start the server and listen on the specified port.
httpServer.listen(PORT, () => {
  logger.info(`Listening on http://localhost:${PORT}`)
})
