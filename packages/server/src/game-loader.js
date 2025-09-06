import path from "node:path"
import { fileURLToPath } from "node:url"

/**
 * Dynamically loads the initial game state from a module and provides a fallback.
 * @param {string} gameFilePath The path to the game module.
 * @param {object} logger A Pino logger instance.
 * @returns {Promise<{initialTypes: object, initialEntities: object}>} The initial game state.
 */
export async function loadGame(gameFilePath, logger) {
  let gameConfig = {}

  try {
    // Dynamically import the game module.
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    const modulePath = path.resolve(__dirname, gameFilePath)
    const { default: config } = await import(`file://${modulePath}`)
    gameConfig = config
    gameConfig.types ??= {}
    gameConfig.entities ??= {}

    logger.info(`Loaded game data from ${gameFilePath}`)
  } catch (error) {
    logger.error(`Failed to load game module: ${gameFilePath}`)
    logger.error(error)
    // Fallback to a basic initial state if loading fails.
    gameConfig = {
      types: {
        player: {
          move: (entity, payload) => {
            logger.info(
              `Player ${entity.id} moved to ${payload.x}, ${payload.y}`,
            )
          },
        },
        box: {},
      },

      entities: {
        player1: { id: "player1", type: "player", x: 0, y: 0 },
        box1: { id: "box1", type: "box", x: 10, y: 10 },
      },
    }
    logger.warn("Using default game state as a fallback.")
  }

  return gameConfig
}
