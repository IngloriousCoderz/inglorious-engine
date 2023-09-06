export function clamp(num, min, max) {
  if (num < min) {
    return min
  }

  if (num > max) {
    return max
  }

  return num
}

export function mod(dividend, divisor) {
  return ((dividend % divisor) + divisor) % divisor
}
