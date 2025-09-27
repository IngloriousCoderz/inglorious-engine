import "./style.css"

import { Engine } from "@inglorious/engine/core/engine.js"
import { createRenderer } from "@inglorious/renderer-2d/index.js"

import game from "./game.ijs"

window.addEventListener("load", async () => {
  const canvas = document.getElementById("canvas")
  const renderer = createRenderer(canvas)
  const engine = new Engine(renderer, game)
  await engine.init()
  engine.start()
})
