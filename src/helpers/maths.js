export function sum(num1, num2) {
  return num1 + num2
}

export const pythagoras = hypothenuse

export function hypothenuse(...nums) {
  return nums.reduce((acc, num) => acc + num ** 2, 0) ** 0.5
}

export function sine(angle) {
  return Math.sin(angle)
}

export function cosine(angle) {
  return Math.cos(angle)
}

export function arctan(angle) {
  return Math.atan(angle)
}

export function toRadians(degrees) {
  return (degrees * Math.PI) / 180
}
