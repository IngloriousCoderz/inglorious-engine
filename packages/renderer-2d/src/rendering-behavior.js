import { track } from "@inglorious/engine/behaviors/input/mouse.js"

export function rendering(canvas) {
  const ctx = canvas.getContext("2d")

  let _onMouseMove = null
  let _onClick = null
  let _onWheel = null

  return {
    init(entity, event, api) {
      const game = api.getEntity("game")
      const [, , width, height] = game.bounds

      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      const dpi = window.devicePixelRatio
      canvas.width = width * dpi
      canvas.height = height * dpi
      ctx.scale(dpi, dpi)

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

    destroy() {
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
