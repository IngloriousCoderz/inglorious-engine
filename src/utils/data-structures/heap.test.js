import { expect, test } from 'vitest'

import { contains, heapify, min, pop, push, remove } from './heap.js'

test('it should check if a heap contains a value', () => {
  const heap = [3, 2, 6, 1, 7, 4, 5]
  const item = 1
  const expectedResult = true

  expect(contains(heap, item)).toBe(expectedResult)
})

test('it should check if a heap contains an object', () => {
  const heap = [
    { value: 3 },
    { value: 2 },
    { value: 6 },
    { value: 1 },
    { value: 7 },
    { value: 4 },
    { value: 5 },
  ]
  const item = heap[3]
  const expectedResult = true

  expect(contains(heap, item)).toBe(expectedResult)
})

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

test('it should convert an array into a maxheap', () => {
  const arr = [1, 2, 3, 4, 5, 6, 7]
  const comparator = (a, b) => a - b
  const expectedResult = [7, 4, 6, 1, 3, 2, 5]

  expect(heapify(arr, comparator)).toStrictEqual(expectedResult)
})

test('it should find the minimum value in a min heap', () => {
  const heap = [1, 4, 2, 7, 5, 6, 3]
  const expectedResult = 1

  expect(min(heap)).toBe(expectedResult)
})

test('it should push the first element of the heap', () => {
  const heap = []
  const value = 7
  const expectedResult = [7]

  expect(push(heap, value)).toStrictEqual(expectedResult)
})

test('it should push the biggest value at the end of the heap', () => {
  const heap = [3, 13, 19, 33, 42, 23, 21]
  const value = 50
  const expectedResult = [3, 13, 19, 33, 42, 23, 21, 50]

  expect(push(heap, value)).toStrictEqual(expectedResult)
})

test('it should push a value in the right spot of a heap', () => {
  const heap = [3, 13, 19, 33, 42, 23, 21]
  const value = 7
  const expectedResult = [3, 7, 19, 13, 42, 23, 21, 33]

  expect(push(heap, value)).toStrictEqual(expectedResult)
})

test('it should pop the lowest value from the end of the heap', () => {
  const heap = [3, 13, 19, 33, 42, 23, 21]
  const expectedResult = [13, 21, 19, 33, 42, 23]

  expect(pop(heap)).toStrictEqual(expectedResult)
})

test('it should push the biggest value at the beginning of a maxheap', () => {
  const heap = [3, 13, 19, 33, 42, 23, 21]
  const comparator = (a, b) => a - b
  const value = 50
  const expectedResult = [50, 3, 19, 13, 42, 23, 21, 33]

  expect(push(heap, value, comparator)).toStrictEqual(expectedResult)
})

test("it should remove the heap's root element", () => {
  const heap = [3, 13, 19, 33, 42, 23, 21]
  const expectedResult = [13, 21, 19, 33, 42, 23]

  expect(remove(heap)).toStrictEqual(expectedResult)
})
