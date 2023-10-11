import { expect, test } from 'vitest'

import { heapify, pop, push } from './heap'

test('it should not convert an array in existing heap form into a heap', () => {
  const arr = [1, 2, 3, 4, 5, 6, 7]
  const expectedResult = [1, 2, 3, 4, 5, 6, 7]

  expect(heapify(arr)).toStrictEqual(expectedResult)
})

test('it should convert an array into a heap', () => {
  const arr = [7, 6, 5, 4, 3, 2, 1]
  const expectedResult = [1, 4, 2, 7, 5, 6, 3]

  expect(heapify(arr)).toStrictEqual(expectedResult)
})

test('it should push the first element of the heap', () => {
  const heap = []
  const value = 7
  const expectedResult = [7]

  expect(push(value, heap)).toStrictEqual(expectedResult)
})

test('it should push the biggest value at the end of the heap', () => {
  const heap = [3, 13, 19, 33, 42, 23, 21]
  const value = 50
  const expectedResult = [3, 13, 19, 33, 42, 23, 21, 50]

  expect(push(value, heap)).toStrictEqual(expectedResult)
})

test('it should push a value in the right spot of a heap', () => {
  const heap = [3, 13, 19, 33, 42, 23, 21]
  const value = 7
  const expectedResult = [3, 7, 19, 13, 42, 23, 21, 33]

  expect(push(value, heap)).toStrictEqual(expectedResult)
})

test('it should pop the lowest value from the end of the heap', () => {
  const heap = [3, 13, 19, 33, 42, 23, 21]
  const expectedResult = [13, 21, 19, 33, 42, 23]

  expect(pop(heap)).toStrictEqual(expectedResult)
})
