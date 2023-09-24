import { mod } from '.'

const HALF_CIRCLE_IN_DEGRESS = 180
const FULL_CIRCLE = 2

export function arctan(y, x) {
  return Math.atan2(y, x)
}

export function cosine(angle) {
  return Math.cos(angle)
}

export function pi() {
  return Math.PI
}

export function sine(angle) {
  return Math.sin(angle)
}

export function toDegrees(radians) {
  return (radians * HALF_CIRCLE_IN_DEGRESS) / pi()
}

export function toRange(angle) {
  if (angle > pi()) {
    const multipleOfPi = angle - mod(angle, pi())
    return angle - FULL_CIRCLE * multipleOfPi
  }
  if (angle < pi()) {
    const multipleOfPi = angle - mod(angle, -pi())
    return angle - FULL_CIRCLE * -multipleOfPi
  }
  return angle
}

export function toRadians(degrees) {
  return (degrees * pi()) / HALF_CIRCLE_IN_DEGRESS
}
