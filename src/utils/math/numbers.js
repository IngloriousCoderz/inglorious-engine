const DEFAULT_PRECISION = 1
const DEFAULT_TOLERANCE = 0.1
const SQUARE_ROOT = 0.5

export function abs(num) {
  return Math.abs(num)
}

export function clamp(num, min, max) {
  if (num < min) {
    return min
  }

  if (num > max) {
    return max
  }

  return num
}

export function isClose(num1, num2, tolerance = DEFAULT_TOLERANCE) {
  return abs(num1 - num2) <= tolerance
}

export function mod(dividend, divisor) {
  return ((dividend % divisor) + divisor) % divisor
}

export function snap(num, precision = DEFAULT_PRECISION) {
  return Math.round(num / precision) * precision
}

export const remainder = mod

export function sign(num) {
  if (!num) {
    return num
  }

  return num / abs(num)
}

export function sqrt(num) {
  return num ** SQUARE_ROOT
}
