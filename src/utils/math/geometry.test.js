import { expect, test } from 'vitest'

import { hypothenuse, isPointInCircle, isPointInRectangle } from './geometry.js'

test('it should compute the hypothenuse of two catheti (aka pythagoras)', () => {
  const cat1 = 3
  const cat2 = 4
  const expectedResult = 5

  expect(hypothenuse(cat1, cat2)).toBe(expectedResult)
})

test('it should prove that a point in a circle is inside', () => {
  const point = [1.5, 0, 1.5]
  const circle = {
    position: [1, 0, 1],
    radius: 1,
  }

  expect(isPointInCircle(point, circle)).toBe(true)
})

test('it should prove that a point on the border of a circle is inside', () => {
  const point = [2, 0, 1]
  const circle = {
    position: [1, 0, 1],
    radius: 1,
  }

  expect(isPointInCircle(point, circle)).toBe(true)
})

test('it should prove that a point outside of a circle is outside', () => {
  const point = [2, 0, 2]
  const circle = {
    position: [1, 0, 1],
    radius: 1,
  }

  expect(isPointInCircle(point, circle)).toBe(false)
})

test('it should prove that a point in a rectangle is inside', () => {
  const point = [1.5, 0, 1.5]
  const rectangle = {
    position: [1, 0, 1],
    size: [2, 2],
  }

  expect(isPointInRectangle(point, rectangle)).toBe(true)
})

test('it should prove that a point on the border of a rectangle is inside', () => {
  const point = [2, 0, 1]
  const retangle = {
    position: [1, 0, 1],
    size: [2, 2],
  }

  expect(isPointInRectangle(point, retangle)).toBe(true)
})

test('it should prove that a point outside of a rectangle is outside', () => {
  const point = [2.5, 0, 2.5]
  const rectangle = {
    position: [1, 0, 1],
    size: [2, 2],
  }

  expect(isPointInRectangle(point, rectangle)).toBe(false)
})
