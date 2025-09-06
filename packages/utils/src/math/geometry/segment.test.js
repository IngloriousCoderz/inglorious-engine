import { expect, test } from "vitest"

import { isClose } from "../numbers.js"
import {
  closestPoint,
  coefficients,
  distanceFromPoint,
  intersectsCircle,
} from "./segment.js"

expect.extend({
  toStrictEqualVector(received, expected) {
    const { isNot } = this
    return {
      pass: received.every((coord, index) => isClose(coord, expected[index])),
      message: () =>
        `${received} is ${isNot ? "" : "not"} close to ${expected}`,
    }
  },
})

test("it should retrieve values of *a*, *b*, and *c* from a segment, so it looks like a line in the form *ax + by + c = 0*", () => {
  const segment = {
    from: [0, 0, 0],
    to: [1, 0, 2],
  }
  const expectedResult = [-2, 1, 0]

  expect(coefficients(segment)).toStrictEqual(expectedResult)
})

test("it should find the closest point in a segment to a point projectable on it", () => {
  const segment = {
    from: [0, 0, 0],
    to: [2, 0, 2],
  }
  const point = [2, 0, 0]
  const expectedResult = [1, 0, 1]

  expect(closestPoint(segment, point)).toStrictEqualVector(expectedResult)
})

test("it should find the closest point as the point itself when resting on the segment", () => {
  const segment = {
    from: [0, 0, 0],
    to: [2, 0, 2],
  }
  const point = [1, 0, 1]
  const expectedResult = [1, 0, 1]

  expect(closestPoint(segment, point)).toStrictEqualVector(expectedResult)
})

test("it return the start of a segment when the point is close to its start", () => {
  const segment = {
    from: [0, 0, 0],
    to: [3, 0, 4],
  }
  const point = [-2, 0, 0]
  const expectedResult = [0, 0, 0]

  expect(closestPoint(segment, point)).toStrictEqualVector(expectedResult)
})

test("it should return the end of a segment when the point is close to its end", () => {
  const segment = {
    from: [0, 0, 0],
    to: [3, 0, 4],
  }
  const point = [5, 0, 4]
  const expectedResult = [3, 0, 4]

  expect(closestPoint(segment, point)).toStrictEqualVector(expectedResult)
})

test("it should compute the distance between a segment and a point projectable on it", () => {
  const segment = {
    from: [0, 0, 0],
    to: [3, 0, 4],
  }
  const point = [5, 0, 0]
  const expectedResult = 4

  expect(distanceFromPoint(segment, point)).toBe(expectedResult)
})

test("it should compute the distance between a segment and a point resting on it", () => {
  const segment = {
    from: [0, 0, 0],
    to: [2, 0, 2],
  }
  const point = [1, 0, 1]
  const expectedResult = 0

  expect(distanceFromPoint(segment, point)).toBeCloseTo(expectedResult)
})

test("it should compute the distance between a segment and a point close to the start", () => {
  const segment = {
    from: [0, 0, 0],
    to: [3, 0, 4],
  }
  const point = [-2, 0, 0]
  const expectedResult = 2

  expect(distanceFromPoint(segment, point)).toBe(expectedResult)
})

test("it should compute the distance between a segment and a point close to the end", () => {
  const segment = {
    from: [0, 0, 0],
    to: [3, 0, 4],
  }
  const point = [5, 0, 4]
  const expectedResult = 2

  expect(distanceFromPoint(segment, point)).toBeCloseTo(expectedResult)
})

test("it should prove that a segment that crosses a circle intersects with it", () => {
  const segment = {
    from: [0, 0, 0],
    to: [2, 0, 2],
  }
  const circle = {
    position: [1, 0, 1],
    radius: 1,
  }

  expect(intersectsCircle(segment, circle)).toBe(true)
})

test("it should prove that a segment tangent to a circle intersects with it", () => {
  const segment = {
    from: [0, 0, 0],
    to: [0, 0, 2],
  }
  const circle = {
    position: [1, 0, 1],
    radius: 1,
  }

  expect(intersectsCircle(segment, circle)).toBe(true)
})

test("it should prove that a segment inside of a circle intersects with it", () => {
  const segment = {
    from: [0.5, 0, 0.5],
    to: [1.5, 0, 1.5],
  }
  const circle = {
    position: [1, 0, 1],
    radius: 1,
  }

  expect(intersectsCircle(segment, circle)).toBe(true)
})

test("it should prove that a segment that does not cross a circle does not intersect with it", () => {
  const segment = {
    from: [0, 0, 0],
    to: [-2, 0, 2],
  }
  const circle = {
    position: [1, 0, 1],
    radius: 1,
  }

  expect(intersectsCircle(segment, circle)).toBe(false)
})

test("it should prove that a segment that reaches outside of a circle does not intersect with it", () => {
  const segment = {
    from: [0, 0, 0],
    to: [-1, 0, -2],
  }
  const circle = {
    position: [1, 0, 1],
    radius: 1,
  }

  expect(intersectsCircle(segment, circle)).toBe(false)
})
