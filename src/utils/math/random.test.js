import { expect, test } from 'vitest'

import { randomBinomial } from './random'

test('it should create a random number between - 1 and 1', () => {
  const randomNumber = randomBinomial()

  expect(randomNumber).toBeGreaterThan(-1)
  expect(randomNumber).toBeLessThan(1)
})
