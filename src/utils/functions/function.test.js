import { expect, test } from 'vitest'

import { curry } from './function'

test('it should allow to invoke a non-curried version of the curried function', () => {
  const sum = (a, b) => a + b
  const curriedSum = curry(sum)

  expect(curriedSum(2, 3)).toBe(5)
})

test('it should allow to invoke the curried function', () => {
  const sum = (a, b) => a + b
  const curriedSum = curry(sum)

  expect(curriedSum(2)(3)).toBe(5)
})
