import * as Mouse from '@inglorious/ui/canvas/mouse.js'
import { clampToBounds } from '@inglorious/utils/character/bounds.js'
import { ZERO_VECTOR } from '@inglorious/utils/math/linear-algebra/vector.js'
import * as Point from '@inglorious/utils/physics/collisions/point.js'

export function type(events = {}) {
  return {
    'mouse:move'(instance, event, { config }) {
      instance.position = event.payload

      clampToBounds(instance, config.bounds)
    },

    'mouse:click'(instance, event, options) {
      const { notify } = options

      const clickedInstance = Point.findCollision(event.payload, options)
      if (clickedInstance) {
        notify({ id: 'instance:click', payload: clickedInstance.id })
      } else {
        notify({ id: 'scene:click', payload: event.payload })
      }
    },

    draw: Mouse.draw,

    ...events,
  }
}

export function instance() {
  return {
    type: 'mouse',
    velocity: ZERO_VECTOR,
    position: ZERO_VECTOR,
    orientation: 0,
  }
}
