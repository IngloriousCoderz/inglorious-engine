import { hypothenuse } from '@inglorious/utils/math/geometry'
import {
  abs as nAbs,
  clamp as nClamp,
  mod as nMod,
} from '@inglorious/utils/math/numbers'
import { atan2, cos, sin } from '@inglorious/utils/math/trigonometry'

import { from2D, to2D } from '../2d'
import { quaternion } from '../quaternion'
import { cross, sum } from '../vectors'

export const ZERO_VECTOR = [0, 0, 0] // eslint-disable-line no-magic-numbers
const UNIT_VECTOR = [1, 0, 0] // eslint-disable-line no-magic-numbers

const X = 0
const Z = 2
const LAST_COORDINATE = 1
const TWO_COORDINATES = 2
const NO_Y = 0
const DEFAULT_DECIMALS = 0

export function abs(vector) {
  return vector.map(nAbs)
}

export function angle(vector) {
  return atan2(vector[vector.length - LAST_COORDINATE], vector[X])
}

export function clamp(vector, min, max) {
  const length = magnitude(vector)

  if (typeof min === 'number' && length < min) {
    return setMagnitude(vector, min)
  }

  if (typeof max === 'number' && length > max) {
    return setMagnitude(vector, max)
  }

  if (typeof min !== 'number' && typeof max !== 'number') {
    return vector.map((coordinate, index) =>
      nClamp(coordinate, min[index], max[index])
    )
  }

  return vector
}

export function conjugate(vector) {
  return vector.map((coordinate, index) => (index ? -coordinate : coordinate))
}

export function divide(vector, scalar) {
  return vector.map((coordinate) => coordinate / scalar)
}

export function fromAngle(angle) {
  return rotate(UNIT_VECTOR, angle)
}

export const length = magnitude

export function magnitude(vector) {
  return hypothenuse(...vector)
}

export function mod(vector, divisor) {
  return vector.map((coordinate) => nMod(coordinate, divisor))
}

export function multiply(vector, scalar) {
  return vector.map((coordinate) => coordinate * scalar)
}

export function normalize(vector) {
  const length = magnitude(vector)
  return vector.map((coordinate) => coordinate / length)
}

export const remainder = mod

export function rotate(vector, angle) {
  const is2D = vector.length === TWO_COORDINATES

  let v = is2D ? from2D(vector) : vector

  let result = rotateWithQuaternion(v, angle)

  return is2D ? to2D(result) : result
}

export function setAngle(vector, angle) {
  const length = magnitude(vector)
  const [x, z] = toCartesian([length, angle])
  return [x, NO_Y, z]
}

export const setLength = setMagnitude

export function setMagnitude(vector, length) {
  const normalized = normalize(vector)
  return multiply(normalized, length)
}

export function shift(vector, index) {
  return [...vector.slice(index), ...vector.slice(X, index)]
}

export const times = multiply

export function toCartesian([magnitude, angle]) {
  return [magnitude * cos(angle), magnitude * sin(angle)]
}

export function toCylindrical(vector) {
  const radius = magnitude(vector)
  const theta = angle(vector)
  return [radius * cos(theta), radius * sin(theta), vector[Z]]
}

export function toPolar(vector) {
  return [magnitude(vector), angle(vector)]
}

export function toString(vector, decimals = DEFAULT_DECIMALS) {
  return `[${vector
    .map((coordinate) => coordinate.toFixed(decimals))
    .join(', ')}]`
}

// TODO: add toSpherical(vector), as described in https://www.cs.mcgill.ca/~rwest/wikispeedia/wpcd/wp/p/Polar_coordinate_system.htm#:~:text=Polar%20coordinates%20can%20also%20be,as%20in%20the%20polar%20coordinates).

export function unit(angle) {
  if (!angle) {
    return UNIT_VECTOR
  }

  return setAngle(UNIT_VECTOR, angle)
}

function rotateWithQuaternion(v, angle) {
  // @see https://en.wikipedia.org/wiki/Quaternions_and_spatial_rotation#Performance_comparisons
  const [w, ...r] = quaternion(angle)
  const result = sum(
    v,
    cross(multiply(r, 2), sum(cross(r, v), multiply(v, w))) // eslint-disable-line no-magic-numbers
  )

  return conjugate(result) // HACK: not really sure why I should invert the result, it just works this way
}
