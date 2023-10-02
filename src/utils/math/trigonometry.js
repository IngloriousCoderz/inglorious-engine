import { mod } from '@ezpz/utils/math/numbers'

const HALF_CIRCLE_IN_DEGRESS = 180
const FULL_CIRCLE = 2

export function arctan(y, x) {
  return Math.atan2(y, x)
}

export const cos = cosine

export function cosine(angle) {
  return Math.cos(angle)
}

export function pi() {
  return Math.PI
}

export const sin = sine

export function sine(angle) {
  return Math.sin(angle)
}

export function toDegrees(radians) {
  return (radians * HALF_CIRCLE_IN_DEGRESS) / pi()
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

export function toRadians(degrees) {
  return (degrees * pi()) / HALF_CIRCLE_IN_DEGRESS
}
