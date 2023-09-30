import { hypothenuse } from '@ezpz/utils/math/geometry'
import { clamp as nClamp, mod as nMod } from '@ezpz/utils/math/numbers'
import { arctan, cosine, sine } from '@ezpz/utils/math/trigonometry'

import { quaternion } from './quaternion'
import { cross, sum } from './vectors'

const X = 0
const Z = 2
const LAST_COORDINATE = 1
const UNIT_LENGTH = 1
const NO_Y = 0

export const ZERO_VECTOR = [0, 0, 0] // eslint-disable-line no-magic-numbers
const UNIT_VECTOR = [1, 0, 0] // eslint-disable-line no-magic-numbers

export function angle(vector) {
  return arctan(vector[vector.length - LAST_COORDINATE], vector[X])
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
  const [x, z] = toCartesian([UNIT_LENGTH, angle])
  return [x, NO_Y, z]
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
  const [w, ...r] = quaternion(angle)

  return sum(
    vector,
    cross(multiply(r, 2), sum(cross(r, vector), multiply(vector, w))) // eslint-disable-line no-magic-numbers
  )
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
  return [magnitude * cosine(angle), magnitude * sine(angle)]
}

export function toCylindrical(vector) {
  const radius = magnitude(vector)
  const theta = angle(vector)
  return [radius * cosine(theta), radius * sine(theta), vector[Z]]
}

export function toPolar(vector) {
  return [magnitude(vector), angle(vector)]
}

// TODO: add toSpherical(vector), as described in https://www.cs.mcgill.ca/~rwest/wikispeedia/wpcd/wp/p/Polar_coordinate_system.htm#:~:text=Polar%20coordinates%20can%20also%20be,as%20in%20the%20polar%20coordinates).

export function unit(angle) {
  if (!angle) {
    return UNIT_VECTOR
  }

  return setAngle(UNIT_VECTOR, angle)
}
