import Engine from '@inglorious/engine.js'
import * as Mouse from '@inglorious/game/types/mouse.js'

import { absolutePosition } from './canvas/absolute-position.js'

const Z = 2

export function start(game) {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  const engine = new Engine(game, { render: render(ctx) })

  const { bounds, pixelated } = engine.config
  const [, , width, height] = bounds
  canvas.width = width
  canvas.height = height
  if (pixelated) {
    canvas.style.imageRendering = 'pixelated'
    ctx.textRendering = 'geometricPrecision'
  }

  document.addEventListener('keypress', (event) => {
    if (event.key === 'p') {
      engine.isRunning ? engine.stop() : engine.start()
    }
  })

  const { onMouseMove, onClick } = Mouse.track(canvas, {
    notify: engine.notify,
  })

  canvas.addEventListener('mousemove', onMouseMove)
  canvas.addEventListener('click', onClick)

  engine.start()
}

function render(ctx) {
  return (options) => {
    const { config, instances } = options

    if (config.pixelated) {
      ctx.imageSmoothingEnabled = false
    }

    const [x, y, width, height] = config.bounds
    ctx.fillStyle = 'lightgrey'
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
  const type = options.config.types[instance.type]
  const draw = type?.states[instance.state]?.draw || type?.draw

  if (draw) {
    absolutePosition(draw)(ctx, { ...options, ...type, ...instance })
  }
}
