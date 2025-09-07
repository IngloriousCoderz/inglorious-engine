import http from "node:http"

import { createStore } from "@inglorious/store"
import pino from "pino"

import { loadGame } from "./game-loader.js"
import * as gameLoop from "./game-loop.js"
import * as wsHandler from "./ws-handler.js"

const ERROR_CODE = 1
const DEFAULT_PORT = 3000

const logger = pino({ name: "Inglorious Server", level: "info" })

bootstrap().catch((error) => {
  logger.error(error, "Failed to start the server.")
  process.exit(ERROR_CODE)
})

async function bootstrap() {
  let [, , gameFilePath] = process.argv
  const gameConfig = await loadGame(gameFilePath, logger)

  const store = createStore(gameConfig)

  const httpServer = http.createServer()

  wsHandler.setup(httpServer, store, logger)

  gameLoop.start(store)

  const port = process.env.PORT || DEFAULT_PORT
  httpServer.listen(port, () => {
    logger.info(`Listening on http://localhost:${port}`)
  })
}
