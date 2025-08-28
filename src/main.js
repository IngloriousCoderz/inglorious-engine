import { Engine } from "@inglorious/engine/core/engine.js"
import { CanvasRenderer } from "@inglorious/renderers/canvas/canvas-renderer.js"
import game from "game"

const canvas = document.getElementById("canvas")
window.addEventListener("load", () => {
  const renderer = new CanvasRenderer(canvas)
  const engine = new Engine({ ...game, renderer })
  engine.start()
})
