import { cos, sin } from '@inglorious/utils/math/trigonometry'

const HALF = 2
const Y_AXIS = [0, 1, 0] // eslint-disable-line no-magic-numbers

export function quaternion(angle, axis = Y_AXIS) {
  return [cos(angle / HALF), ...axis.map((coord) => coord * sin(angle / HALF))]
}
