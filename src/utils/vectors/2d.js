const TWO_COORDINATES = 2
const NO_Y = 0

export function from2D(vector) {
  const [x, z] = vector
  return [x, NO_Y, z]
}

export function is2D(vector) {
  return vector.length === TWO_COORDINATES
}

export function to2D(vector) {
  const [x, , z] = vector
  return [x, z]
}
