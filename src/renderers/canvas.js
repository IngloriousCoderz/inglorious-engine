import { track } from "@inglorious/engine/behaviors/input/mouse.js"

import { createRenderingSystem } from "./canvas/rendering-system.js"

export class CanvasRenderer {
  _onKeyPress = null
  _onMouseMove = null
  _onClick = null

  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
  }

  getSystems() {
    return [createRenderingSystem(this.ctx)]
  }

  init(engine) {
    const game = engine._api.getEntity("game")
    const [, , width, height] = game.bounds

    this.canvas.style.width = `${width}px`
    this.canvas.style.height = `${height}px`
    const dpi = window.devicePixelRatio
    this.canvas.width = width * dpi
    this.canvas.height = height * dpi
    this.ctx.scale(dpi, dpi)

    if (game.pixelated) {
      this.canvas.style.imageRendering = "pixelated"
      this.ctx.textRendering = "geometricPrecision"
      this.ctx.imageSmoothingEnabled = false
    }

    this._onKeyPress = (event) => {
      if (event.key === "p") {
        engine.isRunning ? engine.stop() : engine.start()
      }
    }
    document.addEventListener("keypress", this._onKeyPress)

    const { onMouseMove, onClick } = track(this.canvas, engine._api)
    this._onMouseMove = onMouseMove
    this._onClick = onClick

    this.canvas.addEventListener("mousemove", this._onMouseMove)
    this.canvas.addEventListener("click", this._onClick)
  }

  destroy() {
    if (this._onKeyPress) {
      document.removeEventListener("keypress", this._onKeyPress)
    }
    if (this._onMouseMove) {
      this.canvas.removeEventListener("mousemove", this._onMouseMove)
    }
    if (this._onClick) {
      this.canvas.removeEventListener("click", this._onClick)
    }
  }
}
