const NO_Y = 0

export function from2D(vector) {
  const [x, z] = vector
  return [x, NO_Y, z]
}

export function to2D(vector) {
  const [x, , z] = vector
  return [x, z]
}
