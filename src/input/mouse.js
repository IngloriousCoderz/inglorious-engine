import engine from '../engine'
import { clampToBounds } from '../utils/characters'
import { subtract, ZERO_VECTOR } from '../utils/vectors'

const CURSOR_SIZE = 16
const NO_Y = 0

export function mouseType(events = {}) {
  return {
    'mouse:move'(instance, { payload }) {
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
