import Engine from '@inglorious/engine.js'
import { absolutePosition } from '@inglorious/utils/canvas/absolute-position.js'

import { trackMouse } from './canvas/mouse.js'

const Z = 2

export function start(game) {
  const engine = new Engine(game, { render })
  engine.start()

  document.addEventListener('keypress', (event) => {
    if (event.key === 'p') {
      engine.isRunning ? engine.stop() : engine.start()
    }
  })

  const canvas = document.getElementById('canvas')
  trackMouse(canvas, { notify: engine.notify })

  function render(options) {
    const { config, instances } = options

    const [x, y, width, height] = config.bounds
    const canvas = document.getElementById('canvas')
    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext('2d')

    ctx.imageSmoothingEnabled = false
    ctx.fillStyle = 'lightgrey'
    ctx.fillRect(x, y, width, height)

    Object.values(instances)
      .toSorted((a, b) => a.py - b.py || b.position?.[Z] - a.position?.[Z])
      .forEach((instance) => {
        const type = config.types[instance.type]
        const draw = type?.states[instance.state]?.draw || type?.draw

        if (draw) {
          absolutePosition(draw)(ctx, { ...options, instance })
        }
      })
  }
}
