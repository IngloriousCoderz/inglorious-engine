import { clampToBounds } from '@ezpz/utils/characters'
import { ZERO_VECTOR } from '@ezpz/utils/math/linear/vector'
import { subtract } from '@ezpz/utils/math/linear/vectors'

const CURSOR_SIZE = 16
const NO_Y = 0

export function mouseType(events = {}) {
  return {
    'mouse:move'(instance, { payload }, { engine }) {
      instance.position = subtract(payload, [CURSOR_SIZE, NO_Y, CURSOR_SIZE])

      clampToBounds(instance, engine.config.bounds)
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
