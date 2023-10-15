/* eslint-disable no-magic-numbers */

const DEFAULT_FILLER = () => null
const DEFAULT_CELL_TO_STRING = (cell) => `${cell}`

export function createBoard([rows, columns], filler = DEFAULT_FILLER) {
  return new Array(rows)
    .fill(null)
    .map((_, i) => new Array(columns).fill(null).map((_, j) => filler(i, j)))
}

export function down([i, j], [rows]) {
  if (i === rows - 1) {
    throw new Error()
  }

  return [i + 1, j]
}

export function downLeft(coords, size) {
  return down(left(coords, size), size)
}

export function downRight(coords, size) {
  return down(right(coords, size), size)
}

export function left([i, j]) {
  if (j === 0) {
    throw new Error()
  }

  return [i, j - 1]
}

export function right([i, j], [, columns]) {
  if (j === columns - 1) {
    throw new Error()
  }

  return [i, j + 1]
}

export function toString(board, cellToString = DEFAULT_CELL_TO_STRING) {
  return `${board
    .map((row, i) => row.map((cell, j) => cellToString(cell, i, j)).join(' '))
    .join('\n')}`
}

export function up([i, j]) {
  if (i === 0) {
    throw new Error()
  }

  return [i - 1, j]
}

export function upLeft(coords, size) {
  return up(left(coords, size), size)
}

export function upRight(coords, size) {
  return up(right(coords, size), size)
}
