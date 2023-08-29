import * as m from '../maths'

const X = 0
const Z = 2
const LAST_COORDINATE = 1
const UNIT_LENGTH = 1
const NO_Y = 0

export function angle(vector) {
  return m.arctan(vector[vector.length - LAST_COORDINATE], vector[X])
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
      m.clamp(coordinate, min[index], max[index])
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
  return m.hypothenuse(...vector)
}

export function mod(vector, divisor) {
  return vector.map((coordinate) => coordinate % divisor)
}

export function multiply(vector, scalar) {
  return vector.map((coordinate) => coordinate * scalar)
}

export function normalize(vector) {
  const radius = magnitude(vector)
  return vector.map((coordinate) => coordinate / radius)
}

export const remainder = mod

export function rotate(vector, angle) {
  const [magnitude, fromAngle] = toPolar(vector)
  const [x, z] = toCartesian([magnitude, fromAngle + angle])
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
  return [magnitude * m.cosine(angle), magnitude * m.sine(angle)]
}

export function toCylindrical(vector) {
  const radius = magnitude(vector)
  const theta = angle(vector)
  return [radius * m.cosine(theta), radius * m.sine(theta), vector[Z]]
}

export function toPolar(vector) {
  return [magnitude(vector), angle(vector)]
}

// TODO: add toSpherical(vector), as described in https://www.cs.mcgill.ca/~rwest/wikispeedia/wpcd/wp/p/Polar_coordinate_system.htm#:~:text=Polar%20coordinates%20can%20also%20be,as%20in%20the%20polar%20coordinates).
