import { Engine } from "@inglorious/engine/core/engine.js"
import { Renderer2D } from "@inglorious/renderer-2d/index.js"
import game from "game"

const canvas = document.getElementById("canvas")
window.addEventListener("load", async () => {
  const renderer = new Renderer2D(canvas)
  const engine = new Engine({ ...game, renderer })
  await engine.init()
  engine.start()
})
