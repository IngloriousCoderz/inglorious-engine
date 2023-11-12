import * as Mouse from '@inglorious/ui/canvas/mouse.js'
import { clampToBounds } from '@inglorious/utils/character/bounds.js'
import { ZERO_VECTOR } from '@inglorious/utils/math/linear-algebra/vector.js'

export function mouseType(events = {}) {
  return {
    mouse: {
      'mouse:move'(instance, event, { config }) {
        instance.position = event.payload

        clampToBounds(instance, config.bounds)
      },

      draw: Mouse.draw,

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
