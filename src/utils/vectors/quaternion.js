import { cosine, sine } from '@ezpz/utils/math/trigonometry'

const HALF = 2
const Y_AXIS = [0, 1, 0] // eslint-disable-line no-magic-numbers

export function quaternion(angle, axis = Y_AXIS) {
  return [
    cosine(angle / HALF),
    ...axis.map((coord) => coord * sine(angle / HALF)),
  ]
}
