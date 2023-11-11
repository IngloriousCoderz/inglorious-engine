import { clampToBounds } from '@inglorious/utils/character'
import { ZERO_VECTOR } from '@inglorious/utils/math/linear-algebra/vector'

export function mouseType(events = {}) {
  return {
    mouse: {
      'mouse:move'(instance, event, { config }) {
        instance.position = event.payload

        clampToBounds(instance, config.bounds)
      },

      draw(instance, { ctx, config }) {
        const [, , , screenHeight] = config.bounds
        const [x, , z] = instance.position
        ctx.translate(x, screenHeight - z)

        ctx.strokeStyle = 'black'
        ctx.fillStyle = 'black'
        ctx.lineWidth = 1

        ctx.beginPath()
        ctx.moveTo(-6, 0)
        ctx.lineTo(-3, 0)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(4, 0)
        ctx.lineTo(7, 0)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(0, -6)
        ctx.lineTo(0, -3)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(0, 4)
        ctx.lineTo(0, 7)
        ctx.stroke()

        ctx.fillRect(0, 0, 1, 1)

        ctx.resetTransform()
      },

      ...events,
    },
  }
}

export function mouseInstance() {
  return {
    mouse: {
      type: 'mouse',
      velocity: ZERO_VECTOR,
      position: ZERO_VECTOR,
      orientation: 0,
    },
  }
}
