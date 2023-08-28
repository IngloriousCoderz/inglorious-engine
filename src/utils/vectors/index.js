import * as maths from '../maths'

export const add = sum

export function conjugate(vector) {
  return vector.map((coordinate, index) =>
    index === 0 ? coordinate : -coordinate
  )
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
  return maths.arctan(vector[vector.length - 1], vector[0])
}

export const times = multiply

export function multiply(scalar, vector) {
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

export const remainder = mod

export function mod(vector, divisor) {
  return vector.map((coordinate) => coordinate % divisor)
}

export function shift(vector, index) {
  return [...vector.slice(index), ...vector.slice(0, index)]
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
  return [radius * maths.cosine(theta), radius * maths.sine(theta), vector[2]]
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
