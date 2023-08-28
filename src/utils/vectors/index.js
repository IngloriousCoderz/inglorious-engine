import * as maths from '../maths'

const X = 0
const Z = 2
const LAST_COORDINATE = 1

export const add = sum

export function conjugate(vector) {
  return vector.map((coordinate, index) => (index ? -coordinate : coordinate))
}

export function sum(...vectors) {
  return vectors.reduce(sumCoordinates)
}

export function subtract(...vectors) {
  return vectors.reduce(subtractCoordinates)
}

export const length = magnitude

export function magnitude(vector) {
  return maths.hypothenuse(...vector)
}

export function angle(vector) {
  return maths.arctan(vector[vector.length - LAST_COORDINATE], vector[X])
}

export const setLength = setMagnitude

export function setMagnitude(vector, length) {
  const normalized = normalize(vector)
  return multiply(normalized, length)
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
      maths.clamp(coordinate, min[index], max[index])
    )
  }

  return vector
}

export const times = multiply

export function multiply(vector, scalar) {
  return vector.map((coordinate) => coordinate * scalar)
}

export const scalarProduct = dotProduct

export function dotProduct(...vectors) {
  return vectors.reduce(dotMultiplyCoordinates).reduce(maths.sum)
}

export const vectorProduct = crossProduct

/* NOTE: only valid in 3 and 7 dimensions! */
export function crossProduct(...vectors) {
  return vectors.reduce(crossMultiplyCoordinates)
}

export function divide(vector, scalar) {
  return vector.map((coordinate) => coordinate / scalar)
}

export const remainder = mod

export function mod(vector, divisor) {
  return vector.map((coordinate) => coordinate % divisor)
}

export function shift(vector, index) {
  return [...vector.slice(index), ...vector.slice(X, index)]
}

export function toCartesian([magnitude, angle]) {
  return [magnitude * maths.cosine(angle), magnitude * maths.sine(angle)]
}

export function toPolar(vector) {
  return [magnitude(vector), angle(vector)]
}

export function toCylindrical(vector) {
  const radius = magnitude(vector)
  const theta = angle(vector)
  return [radius * maths.cosine(theta), radius * maths.sine(theta), vector[Z]]
}

// TODO: add toSpherical(vector), as described in https://www.cs.mcgill.ca/~rwest/wikispeedia/wpcd/wp/p/Polar_coordinate_system.htm#:~:text=Polar%20coordinates%20can%20also%20be,as%20in%20the%20polar%20coordinates).

export function normalize(vector) {
  const radius = magnitude(vector)
  return vector.map((coordinate) => coordinate / radius)
}

function sumCoordinates(vector1, vector2) {
  return vector1.map((coordinate, index) => coordinate + vector2[index])
}

function subtractCoordinates(vector1, vector2) {
  return vector1.map((coordinate, index) => coordinate - vector2[index])
}

export function dotMultiplyCoordinates(vector1, vector2) {
  return vector1.map((coordinate, index) => coordinate * vector2[index])
}

function crossMultiplyCoordinates(vector1, vector2) {
  const indexes = Array(vector1.length)
    .fill(null)
    .map((_, index) => index)

  return indexes.map((_, index) => {
    const [index1, index2] = shift(
      indexes.filter((_, i) => i !== index),
      index
    )
    return vector1[index1] * vector2[index2] - vector1[index2] * vector2[index1]
  })
}
