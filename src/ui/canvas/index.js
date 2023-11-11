import Engine from '@inglorious/engine'

import { trackMouse } from './mouse'

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

    ctx.fillStyle = 'lightgrey'
    ctx.fillRect(x, y, width, height)

    Object.values(instances).map((instance) => {
      const type = config.types[instance.type]
      type?.draw?.(instance, { ...options, ctx })
      type?.states[instance.state]?.draw?.(instance, { ...options, ctx })
    })
  }
}
