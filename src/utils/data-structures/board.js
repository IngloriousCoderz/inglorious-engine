/**
 * Default filler function for board cells.
 * @returns {null} Default value for a cell.
 */
const DEFAULT_FILLER = () => null

/**
 * Default function to convert a cell to a string.
 * @param {*} cell - The cell value.
 * @returns {string} String representation of the cell.
 */
const DEFAULT_CELL_TO_STRING = (cell) => `${cell}`

const FIRST_ROW = 0 // The index of the first row in the board.
const FIRST_COLUMN = 0 // The index of the first column in the board.
const LAST_ROW_OFFSET = 1 // Offset used to calculate the last row index.
const LAST_COLUMN_OFFSET = 1 // Offset used to calculate the last column index.
const MOVE_DOWN = 1 // Value representing a downward movement.
const MOVE_LEFT = -1 // Value representing a leftward movement.
const MOVE_RIGHT = 1 // Value representing a rightward movement.
const MOVE_UP = -1 // Value representing an upward movement.

/**
 * Creates a 2D board with the specified dimensions and fills it using the provided filler function.
 * @param {[number, number]} dimensions - Array containing the number of rows and columns.
 * @param {Function} [filler=DEFAULT_FILLER] - Function to fill each cell of the board.
 * @returns {any[][]} The created board.
 */
export function createBoard([rows, columns], filler = DEFAULT_FILLER) {
  return new Array(rows)
    .fill(null)
    .map((_, i) => new Array(columns).fill(null).map((_, j) => filler(i, j)))
}

/**
 * Moves the given coordinates one step down.
 * @param {[number, number]} coords - The current coordinates [row, column].
 * @param {[number]} size - Array containing the number of rows.
 * @returns {[number, number]} The new coordinates after moving down.
 * @throws {Error} If the movement goes out of bounds.
 */
export function down([i, j], [rows]) {
  if (i === rows - LAST_ROW_OFFSET) {
    throw new Error()
  }

  return [i + MOVE_DOWN, j]
}

/**
 * Moves the given coordinates one step down and one step left.
 * @param {[number, number]} coords - The current coordinates [row, column].
 * @param {[number, number]} size - Array containing the number of rows and columns.
 * @returns {[number, number]} The new coordinates after moving down-left.
 */
export function downLeft(coords, size) {
  return down(left(coords, size), size)
}

/**
 * Moves the given coordinates one step down and one step right.
 * @param {[number, number]} coords - The current coordinates [row, column].
 * @param {[number, number]} size - Array containing the number of rows and columns.
 * @returns {[number, number]} The new coordinates after moving down-right.
 */
export function downRight(coords, size) {
  return down(right(coords, size), size)
}

/**
 * Moves the given coordinates one step left.
 * @param {[number, number]} coords - The current coordinates [row, column].
 * @returns {[number, number]} The new coordinates after moving left.
 * @throws {Error} If the movement goes out of bounds.
 */
export function left([i, j]) {
  if (j === FIRST_COLUMN) {
    throw new Error()
  }

  return [i, j + MOVE_LEFT]
}

/**
 * Moves the given coordinates one step right.
 * @param {[number, number]} coords - The current coordinates [row, column].
 * @param {[number, number]} size - Array containing the number of rows and columns.
 * @returns {[number, number]} The new coordinates after moving right.
 * @throws {Error} If the movement goes out of bounds.
 */
export function right([i, j], [, columns]) {
  if (j === columns - LAST_COLUMN_OFFSET) {
    throw new Error()
  }

  return [i, j + MOVE_RIGHT]
}

/**
 * Converts the board to a string representation.
 * @param {any[][]} board - The board to convert.
 * @param {Function} [cellToString=DEFAULT_CELL_TO_STRING] - Function to convert each cell to a string.
 * @returns {string} The string representation of the board.
 */
export function toString(board, cellToString = DEFAULT_CELL_TO_STRING) {
  return `${board
    .map((row, i) => row.map((cell, j) => cellToString(cell, i, j)).join(" "))
    .join("\n")}`
}

/**
 * Moves the given coordinates one step up.
 * @param {[number, number]} coords - The current coordinates [row, column].
 * @returns {[number, number]} The new coordinates after moving up.
 * @throws {Error} If the movement goes out of bounds.
 */
export function up([i, j]) {
  if (i === FIRST_ROW) {
    throw new Error()
  }

  return [i + MOVE_UP, j]
}

/**
 * Moves the given coordinates one step up and one step left.
 * @param {[number, number]} coords - The current coordinates [row, column].
 * @param {[number, number]} size - Array containing the number of rows and columns.
 * @returns {[number, number]} The new coordinates after moving up-left.
 */
export function upLeft(coords, size) {
  return up(left(coords, size), size)
}

/**
 * Moves the given coordinates one step up and one step right.
 * @param {[number, number]} coords - The current coordinates [row, column].
 * @param {[number, number]} size - Array containing the number of rows and columns.
 * @returns {[number, number]} The new coordinates after moving up-right.
 */
export function upRight(coords, size) {
  return up(right(coords, size), size)
}
