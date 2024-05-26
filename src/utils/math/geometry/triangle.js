/* eslint-disable no-magic-numbers */

export function hypothenuse(...nums) {
  return nums.reduce((acc, num) => acc + num ** 2, 0) ** 0.5
}

export const pythagoras = hypothenuse
