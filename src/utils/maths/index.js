const SQUARE = 2
const SQUARE_ROOT = 0.5
const INITIAL_SUM = 0
const HALF_CIRCLE_IN_DEGRESS = 180

export function clamp(num, min, max) {
  if (num < min) {
    return min
  }

  if (num > max) {
    return max
  }

  return num
}

export function sum(num1, num2) {
  return num1 + num2
}

export const pythagoras = hypothenuse

export function hypothenuse(...nums) {
  return (
    nums.reduce((acc, num) => acc + num ** SQUARE, INITIAL_SUM) ** SQUARE_ROOT
  )
}

export function sine(angle) {
  return Math.sin(angle)
}

export function cosine(angle) {
  return Math.cos(angle)
}

export function arctan(y, x) {
  return Math.atan2(y, x)
}

export function toRadians(degrees) {
  return (degrees * Math.PI) / HALF_CIRCLE_IN_DEGRESS
}

export function randomBinomial() {
  return Math.random() - Math.random()
}
