import Engine from "@inglorious/engine.js"
import { track } from "@inglorious/game/decorators/input/mouse.js"

import { absolutePosition } from "./canvas/absolute-position.js"

const Z = 2

export function start(game, canvas) {
  const ctx = canvas.getContext("2d")
  const engine = new Engine(game, { render: render(ctx) })

  const { bounds, pixelated } = engine._store.getState().instances.game
  const [, , width, height] = bounds
  canvas.width = width
  canvas.height = height
  if (pixelated) {
    canvas.style.imageRendering = "pixelated"
    ctx.textRendering = "geometricPrecision"
  }

  document.addEventListener("keypress", (event) => {
    if (event.key === "p") {
      engine.isRunning ? engine.stop() : engine.start()
    }
  })

  const { onMouseMove, onClick } = track(canvas, {
    notify: engine.notify,
  })

  canvas.addEventListener("mousemove", onMouseMove)
  canvas.addEventListener("click", onClick)

  engine.start()
}

function render(ctx) {
  return (options) => {
    const { types, instances } = options

    if (types.game.pixelated) {
      ctx.imageSmoothingEnabled = false
    }

    const [x, y, width, height] = instances.game.bounds
    ctx.fillStyle = "lightgrey"
    ctx.fillRect(x, y, width, height)

    const { mouse, ...rest } = instances
    Object.values(rest)
      .filter(({ position }) => position)
      .toSorted((a, b) => a.py - b.py || b.position[Z] - a.position[Z])
      .forEach((instance) => draw(ctx, instance, options))
    if (mouse) {
      draw(ctx, mouse, options)
    }
  }
}

function draw(ctx, instance, options) {
  const { types } = options
  const type = types[instance.type]
  const draw = type.states[instance.state]?.draw || type.draw

  if (draw) {
    absolutePosition(draw)(ctx, { ...options, ...type, ...instance })
  }
}
