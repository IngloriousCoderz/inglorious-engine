import { shift } from '@ezpz/utils/math/linear/vector'

export const add = sum

/* NOTE: only valid in 3 and 7 dimensions! */
export function cross(...vectors) {
  return vectors.reduce(crossMultiplyCoordinates)
}

export function dot(...vectors) {
  return vectors
    .reduce(dotMultiplyCoordinates)
    .reduce((coord1, coord2) => coord1 + coord2)
}

export const scalarProduct = dot

export function subtract(...vectors) {
  return vectors.reduce(subtractCoordinates)
}

export function sum(...vectors) {
  return vectors.reduce(sumCoordinates)
}

export const vectorProduct = cross

function sumCoordinates(vector1, vector2) {
  return vector1.map((coordinate, index) => coordinate + vector2[index])
}

function subtractCoordinates(vector1, vector2) {
  return vector1.map((coordinate, index) => coordinate - vector2[index])
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

function dotMultiplyCoordinates(vector1, vector2) {
  return vector1.map((coordinate, index) => coordinate * vector2[index])
}
