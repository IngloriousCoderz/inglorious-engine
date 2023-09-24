import { expect, test } from 'vitest'

import * as t from './trigonometry'

test('it should convert radians to degrees', () => {
  const radians = 0.7853981633974483
  const expectedResult = 45

  expect(t.toDegrees(radians)).toBe(expectedResult)
})

test('it should convert an angle greater than pi to a range between -pi and pi', () => {
  const angle = (5 / 4) * Math.PI
  const expectedResult = (-3 / 4) * Math.PI

  expect(t.toRange(angle)).toBe(expectedResult)
})

// test('it should convert an angle less than pi to a range between -pi and pi', () => {
//   const angle = (-5 / 4) * Math.PI
//   const expectedResult = (3 / 4) * Math.PI

//   expect(t.toRange(angle)).toBe(expectedResult)
// })

test('it should convert radians to degrees', () => {
  const degrees = 45
  const expectedResult = 0.7853981633974483

  expect(t.toRadians(degrees)).toBe(expectedResult)
})
