const SQUARE = 2
const SQUARE_ROOT = 0.5
const INITIAL_SUM = 0

export function hypothenuse(...nums) {
  return (
    nums.reduce((acc, num) => acc + num ** SQUARE, INITIAL_SUM) ** SQUARE_ROOT
  )
}

export const pythagoras = hypothenuse
