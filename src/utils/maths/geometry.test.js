import { expect, test } from 'vitest'

import * as g from './geometry'

test('it should compute the hypothenuse of two catheti (aka pythagoras)', () => {
  const cat1 = 3
  const cat2 = 4
  const expectedResult = 5

  expect(g.hypothenuse(cat1, cat2)).toBe(expectedResult)
})
