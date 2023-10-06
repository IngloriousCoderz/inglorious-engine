import { mod } from '@ezpz/utils/math/numbers'

const HALF_CIRCLE_IN_DEGRESS = 180
const FULL_CIRCLE = 2

export function atan2(y, x) {
  return Math.atan2(y, x)
}

export function cos(angle) {
  return Math.cos(angle)
}

export const cosine = cos

export function pi() {
  return Math.PI
}

export function sin(angle) {
  return Math.sin(angle)
}

export const sine = sin

export function toDegrees(radians) {
  return (radians * HALF_CIRCLE_IN_DEGRESS) / pi()
}

export function toRadians(degrees) {
  return (degrees * pi()) / HALF_CIRCLE_IN_DEGRESS
}

export function toRange(angle) {
  if (angle > -pi() && angle < pi()) {
    return angle
  }

  angle = mod(angle, FULL_CIRCLE * pi())

  if (angle > pi()) {
    angle -= FULL_CIRCLE * pi()
  }

  return angle
}
