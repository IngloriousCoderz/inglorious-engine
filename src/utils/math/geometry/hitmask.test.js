import { expect, test } from "vitest"

import { findCollisions } from "./hitmask"

test("it should prove that a rectangle touching a wall intersects with it", () => {
  const hitmask = {
    position: [0, 0, 0],
    tileSize: [1, 1],
    columns: 4,
    heights: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
  }
  const rectangle = {
    shape: "rectangle",
    position: [2.5, 0, 1.5],
    size: [1, 1, 1],
  }

  expect(findCollisions(hitmask, rectangle)).toBe(true)
})

test("it should prove that shifting operands does not change the outcome", () => {
  const SHIFT = 10
  const hitmask = {
    position: [0 + SHIFT, 0, 0 + SHIFT],
    tileSize: [1, 1],
    columns: 4,
    heights: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
  }
  const rectangle = {
    shape: "rectangle",
    position: [2.5 + SHIFT, 0, 1.5 + SHIFT],
    size: [1, 1, 1],
  }

  expect(findCollisions(hitmask, rectangle)).toBe(true)
})

test("it should prove that a rectangle not touching a wall does not intersect with it", () => {
  const hitmask = {
    position: [0, 0, 0],
    tileSize: [1, 1],
    columns: 4,
    heights: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
  }
  const rectangle = {
    shape: "rectangle",
    position: [0.5, 0, 0.5],
    size: [1, 1, 1],
  }

  expect(findCollisions(hitmask, rectangle)).toBe(false)
})

test("it should prove that a rectangle above the tile of a hitmask does not intersect with it", () => {
  const hitmask = {
    position: [0, 0, 0],
    tileSize: [1, 1],
    columns: 4,
    heights: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
  }
  const rectangle = {
    shape: "rectangle",
    position: [2.5, 1, 1.5],
    size: [1, 1, 1],
  }

  expect(findCollisions(hitmask, rectangle)).toBe(false)
})

test("it should prove that a rectangle outside of a hitmask does not intersect with it", () => {
  const hitmask = {
    position: [0, 0, 0],
    tileSize: [1, 1],
    columns: 4,
    heights: [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
  }
  const rectangle = {
    shape: "rectangle",
    position: [5, 0, 1],
    size: [1, 1, 1],
  }

  expect(findCollisions(hitmask, rectangle)).toBe(false)
})
