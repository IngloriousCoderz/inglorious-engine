import { expect, test } from "vitest"

import {
  intersectsCircle,
  intersectsPlatform,
  intersectsPoint,
  intersectsRectangle,
} from "./circle.js"

test("it should prove that a circle around a point intersects with it", () => {
  const circle = {
    position: [1, 0, 1],
    radius: 1,
  }
  const point = [1.5, 0, 1.5]

  expect(intersectsPoint(circle, point)).toBe(true)
})

test("it should prove that two equal circles intersect", () => {
  const circle1 = { position: [1, 0, 1], radius: 1 }
  const circle2 = { position: [1, 0, 1], radius: 1 }

  expect(intersectsCircle(circle1, circle2)).toBe(true)
})

test("it should prove that two circles shifted by a small x intersect", () => {
  const circle1 = { position: [1, 0, 1], radius: 1 }
  const circle2 = { position: [2, 0, 1], radius: 1 }

  expect(intersectsCircle(circle1, circle2)).toBe(true)
})

test("it should prove that two touching circles intersect", () => {
  const circle1 = { position: [1, 0, 1], radius: 1 }
  const circle2 = { position: [3, 0, 1], radius: 1 }

  expect(intersectsCircle(circle1, circle2)).toBe(true)
})

test("it should prove that two non-touching circles do not intersect", () => {
  const circle1 = { position: [1, 0, 1], radius: 1 }
  const circle2 = { position: [4, 0, 1], radius: 1 }

  expect(intersectsCircle(circle1, circle2)).toBe(false)
})

test("it should prove that a circle inside of a rectangle intersects with it", () => {
  const circle = {
    position: [1, 0, 1],
    radius: 1,
  }
  const rectangle = {
    position: [-1, 0, -1],
    size: [4, 4],
  }

  expect(intersectsRectangle(circle, rectangle)).toBe(true)
})

test("it should prove that a circle on the border of a rectangle intersects with it", () => {
  const circle = {
    position: [1, 0, 1],
    radius: 1,
  }
  const rectangle = {
    position: [-2, 0, 0],
    size: [2, 2],
  }

  expect(intersectsRectangle(circle, rectangle)).toBe(true)
})

test("it should prove that a circle crossing a rectangle intersects with it", () => {
  const circle = {
    position: [1, 0, 1],
    radius: 1,
  }
  const rectangle = {
    position: [-1, 0, -1],
    size: [2, 2],
  }

  expect(intersectsRectangle(circle, rectangle)).toBe(true)
})

test("it should prove that a circle outside of a rectangle does not intersect with it", () => {
  const circle = {
    position: [1, 0, 1],
    radius: 1,
  }
  const rectangle = {
    position: [-3, 0, 0],
    size: [2, 2],
  }

  expect(intersectsRectangle(circle, rectangle)).toBe(false)
})

test("it should prove that a circle right above a platform intersects with it", () => {
  const circle = {
    position: [1, 0, 1],
    radius: 1,
  }
  const platform = {
    position: [-1, 0, 0],
    size: [2, 1],
  }

  expect(intersectsPlatform(circle, platform)).toBe(true)
})

test("it should prove that a circle way above a platform intersects with it", () => {
  const circle = {
    position: [1, 0, 1],
    radius: 1,
  }
  const platform = {
    position: [0, 0, -2],
    size: [2, 1],
  }

  expect(intersectsPlatform(circle, platform)).toBe(false)
})

test("it should prove that a circle crossing a platform does not intersect with it", () => {
  const circle = {
    position: [1, 0, 1],
    radius: 1,
  }
  const platform = {
    position: [-1, 0, -1],
    size: [2, 2],
  }

  expect(intersectsPlatform(circle, platform)).toBe(false)
})

test("it should prove that a circle below a platform does not intersect with it", () => {
  const circle = {
    position: [1, 0, 1],
    radius: 1,
  }
  const platform = {
    position: [0, 0, 2],
    size: [2, 1],
  }

  expect(intersectsPlatform(circle, platform)).toBe(false)
})

test("it should prove that a circle not crossing a platform horizontally does not intersect with it", () => {
  const circle = {
    position: [1, 0, 1],
    radius: 1,
  }
  const platform = {
    position: [-3, 0, -1],
    size: [2, 1],
  }

  expect(intersectsPlatform(circle, platform)).toBe(false)
})
