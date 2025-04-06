import { expect, test } from "vitest"

import { intersectsCircle, intersectsRectangle } from "./platform"

test("it should prove that a circle right above a platform intersects with it", () => {
  const platform = {
    position: [-1, 0, 0],
    size: [2, 1, 0],
  }
  const circle = {
    position: [1, 1, 0],
    radius: 1,
  }

  expect(intersectsCircle(platform, circle)).toBe(true)
})

test("it should prove that a circle way above a platform intersects with it", () => {
  const platform = {
    position: [0, 0, -2],
    size: [2, 1, 0],
  }
  const circle = {
    position: [1, 1, 0],
    radius: 1,
  }

  expect(intersectsCircle(platform, circle)).toBe(false)
})

test("it should prove that a circle crossing a platform does not intersect with it", () => {
  const platform = {
    position: [-1, -1, 0],
    size: [2, 2, 0],
  }
  const circle = {
    position: [1, 1, 0],
    radius: 1,
  }

  expect(intersectsCircle(platform, circle)).toBe(false)
})

test("it should prove that a circle below a platform does not intersect with it", () => {
  const platform = {
    position: [0, 2, 0],
    size: [2, 1, 0],
  }
  const circle = {
    position: [1, 1, 0],
    radius: 1,
  }

  expect(intersectsCircle(platform, circle)).toBe(false)
})

test("it should prove that a circle not crossing a platform horizontally does not intersect with it", () => {
  const platform = {
    position: [-3, -1, 0],
    size: [2, 1, 0],
  }
  const circle = {
    position: [1, 1, 0],
    radius: 1,
  }

  expect(intersectsCircle(platform, circle)).toBe(false)
})

test("it should prove that a rectangle crossing a platform from above intersects with it", () => {
  const platform = {
    position: [0, -1, 0],
    size: [2, 2, 0],
  }
  const rectangle = {
    position: [0, 0, 0],
    size: [2, 2, 0],
  }

  expect(intersectsRectangle(platform, rectangle)).toBe(true)
})

test("it should prove that a rectangle right on top of a platform intersects with it", () => {
  const platform = {
    position: [0, -2, 0],
    size: [2, 2, 0],
  }
  const rectangle = {
    position: [0, 0, 0],
    size: [2, 2, 0],
  }

  expect(intersectsRectangle(platform, rectangle)).toBe(true)
})

test("it should prove that a rectangle crossing a platform from below does not intersect with it", () => {
  const platform = {
    position: [0, 1, 0],
    size: [2, 2, 0],
  }
  const rectangle = {
    position: [0, 0, 0],
    size: [2, 2, 0],
  }

  expect(intersectsRectangle(platform, rectangle)).toBe(false)
})

test("it should prove that a rectangle below a platform does not intersect with it", () => {
  const platform = {
    position: [0, -3, 0],
    size: [2, 2, 0],
  }
  const rectangle = {
    position: [0, 0, 0],
    size: [2, 2, 0],
  }

  expect(intersectsRectangle(platform, rectangle)).toBe(false)
})

test("it should prove that a rectangle not crossing a platform horizontally does not intersect with it", () => {
  const platform = {
    position: [-3, 0, 0],
    size: [2, 2, 0],
  }
  const rectangle = {
    position: [0, 0, 0],
    size: [2, 2, 0],
  }

  expect(intersectsRectangle(platform, rectangle)).toBe(false)
})
