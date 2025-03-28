import Engine from "@inglorious/engine.js"
import { track } from "@inglorious/game/decorators/input/mouse.js"

import { absolutePosition } from "./canvas/absolute-position.js"

const Z = 2

export function start(config, canvas) {
  const ctx = canvas.getContext("2d")
  const engine = new Engine(config, { render: render(ctx) })

  const { game } = engine._store.getState().instances
  const [, , width, height] = game.bounds
  canvas.width = width
  canvas.height = height
  if (game.pixelated) {
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

    const { game, mouse, ...rest } = instances

    const [x, y, width, height] = game.bounds
    ctx.fillStyle = "lightgrey"
    ctx.fillRect(x, y, width, height)
    if (game.pixelated) {
      ctx.imageSmoothingEnabled = false
    }

    Object.values(rest)
      .filter(({ position }) => position)
      .toSorted((a, b) => a.py - b.py || b.position[Z] - a.position[Z])
      .forEach((instance) =>
        draw(ctx, instance, { ...options, type: types[instance.type] }),
      )

    if (mouse) {
      draw(ctx, mouse, { ...options, type: types[mouse.type] })
    }
  }
}

function draw(ctx, instance, options) {
  const { type } = options
  const state = type.states[instance.state]
  const draw = state?.draw || type.draw

  if (draw) {
    absolutePosition(draw)(ctx, instance, { ...options, ...type })
  }
}
