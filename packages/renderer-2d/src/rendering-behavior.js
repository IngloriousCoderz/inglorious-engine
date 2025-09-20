import { track } from "@inglorious/engine/behaviors/input/mouse.js"

const ORIGIN = 0
const HALF = 2

export function rendering(canvas) {
  const ctx = canvas.getContext("2d")

  let _onMouseMove = null
  let _onClick = null
  let _onWheel = null

  return {
    init(entity, event, api) {
      const game = api.getEntity("game")
      const [gameWidth, gameHeight] = game.size

      const canvasWidth = canvas.width
      const canvasHeight = canvas.height

      const scaleX = canvasWidth / gameWidth
      const scaleY = canvasHeight / gameHeight
      const scale = Math.min(scaleX, scaleY)
      const scaledGameWidth = gameWidth * scale
      const scaledGameHeight = gameHeight * scale

      const offsetX = (canvasWidth - scaledGameWidth) / HALF
      const offsetY = (canvasHeight - scaledGameHeight) / HALF

      const dpi = window.devicePixelRatio

      ctx.clearRect(ORIGIN, ORIGIN, canvasWidth, canvasHeight)
      ctx.fillStyle = "black"
      ctx.fillRect(ORIGIN, ORIGIN, canvasWidth, canvasHeight)

      ctx.translate(offsetX, offsetY)
      ctx.scale(dpi * scale, dpi * scale)

      if (game.pixelated) {
        canvas.style.imageRendering = "pixelated"
        ctx.textRendering = "geometricPrecision"
        ctx.imageSmoothingEnabled = false
      }

      const { onMouseMove, onClick, onWheel } = track(canvas, api)
      _onMouseMove = onMouseMove
      _onClick = onClick
      _onWheel = onWheel

      canvas.addEventListener("mousemove", _onMouseMove)
      canvas.addEventListener("click", _onClick)
      canvas.addEventListener("wheel", _onWheel)
    },

    destroy(entity, id) {
      if (id !== entity.id) return

      if (_onMouseMove) {
        canvas.removeEventListener("mousemove", _onMouseMove)
      }
      if (_onClick) {
        canvas.removeEventListener("click", _onClick)
      }
      if (_onWheel) {
        canvas.removeEventListener("wheel", _onWheel)
      }
    },
  }
}
