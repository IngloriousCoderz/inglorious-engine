import { v } from "@inglorious/utils/v.js"

const NO_Y = 0
const HALF = 2

export function createCoordinateConverter(canvas, api) {
  return (clientX, clientY) => {
    const {
      left,
      bottom,
      width: canvasWidth,
      height: canvasHeight,
    } = canvas.getBoundingClientRect()

    const x = clientX - left
    const y = bottom - clientY

    const game = api.getEntity("game")
    const [gameWidth, gameHeight] = game.size

    const scaleX = canvasWidth / gameWidth
    const scaleY = canvasHeight / gameHeight
    const scale = Math.min(scaleX, scaleY)

    const scaledGameWidth = gameWidth * scale
    const scaledGameHeight = gameHeight * scale

    const offsetX = (canvasWidth - scaledGameWidth) / HALF
    const offsetY = (canvasHeight - scaledGameHeight) / HALF

    return v((x - offsetX) / scale, NO_Y, (y - offsetY) / scale)
  }
}
