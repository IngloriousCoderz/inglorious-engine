import { clampToBounds } from '@ezpz/utils/character'
import { ZERO_VECTOR } from '@ezpz/utils/math/linear-algebra/vector'
import { subtract } from '@ezpz/utils/math/linear-algebra/vectors'

const CURSOR_SIZE = 16
const NO_Y = 0

export function mouseType(events = {}) {
  return {
    size: 1,
    'mouse:move'(instance, event, { config }) {
      instance.position = subtract(event.payload, [
        CURSOR_SIZE,
        NO_Y,
        CURSOR_SIZE,
      ])

      clampToBounds(instance, config.bounds)
    },

    ...events,
  }
}

export function mouseInstance() {
  return {
    type: 'mouse',
    velocity: ZERO_VECTOR,
    position: ZERO_VECTOR,
    orientation: 0,
  }
}
