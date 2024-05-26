import { expect, test } from 'vitest'

import { overlapsPoint, overlapsCircle, overlapsRectangle } from './point.js'

test('it should prove that two equal points overlap', () => {
  const point1 = [1.5, 0, 1.5]
  const point2 = [1.5, 0, 1.5]

  expect(overlapsPoint(point1, point2)).toBe(true)
})

test('it should prove that two different points do not overlap', () => {
  const point1 = [1.5, 0, 1.5]
  const point2 = [2, 0, 1]

  expect(overlapsPoint(point1, point2)).toBe(false)
})

test('it should prove that a point inside of a circle overlaps with it', () => {
  const point = [1.5, 0, 1.5]
  const circle = {
    position: [1, 0, 1],
    radius: 1,
  }

  expect(overlapsCircle(point, circle)).toBe(true)
})

test('it should prove that a point on the border of a circle overlaps with it', () => {
  const point = [2, 0, 1]
  const circle = {
    position: [1, 0, 1],
    radius: 1,
  }

  expect(overlapsCircle(point, circle)).toBe(true)
})

test('it should prove that a point outside of a circle does not overlap with it', () => {
  const point = [2, 0, 2]
  const circle = {
    position: [1, 0, 1],
    radius: 1,
  }

  expect(overlapsCircle(point, circle)).toBe(false)
})

test('it should prove that a point inside of a rectangle overlaps with it', () => {
  const point = [1.5, 0, 1.5]
  const rectangle = {
    position: [1, 0, 1],
    size: [2, 2],
  }

  expect(overlapsRectangle(point, rectangle)).toBe(true)
})

test('it should prove that a point on the border of a rectangle overlaps with it', () => {
  const point = [2, 0, 1]
  const retangle = {
    position: [1, 0, 1],
    size: [2, 2],
  }

  expect(overlapsRectangle(point, retangle)).toBe(true)
})

test('it should prove that a point outside of a rectangle does not overlap with it', () => {
  const point = [2.5, 0, 2.5]
  const rectangle = {
    position: [1, 0, 1],
    size: [2, 2],
  }

  expect(overlapsRectangle(point, rectangle)).toBe(false)
})
