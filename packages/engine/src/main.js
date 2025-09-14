import { Engine } from "@inglorious/engine/core/engine.js"
import { createRenderer } from "@inglorious/renderer-2d/index.js"
import game from "game"

const canvas = document.getElementById("canvas")
window.addEventListener("load", async () => {
  const renderer = createRenderer(canvas)
  const engine = new Engine(renderer, game)
  await engine.init()
  engine.start()
})
