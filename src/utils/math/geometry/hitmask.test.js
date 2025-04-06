import { expect, test } from "vitest"

import { findCollisions } from "./hitmask"

test("it should prove that a circle right above the tile of a hitmask intersects with it", () => {
  const hitmask = {
    position: [0, 0, 0],
    tileSize: [2, 2],
    columns: 1,
    heights: [0],
  }
  const circle = {
    shape: "circle",
    position: [1, 1, 1],
    radius: 1,
  }

  expect(findCollisions(hitmask, circle)).toStrictEqual([true])
})

test("it should prove that a circle way above the tile of a hitmask does not intersect with it", () => {
  const hitmask = {
    position: [0, -1, 0],
    tileSize: [2, 2],
    columns: 1,
    heights: [0],
  }
  const circle = {
    shape: "circle",
    position: [1, 1, 1],
    radius: 1,
  }

  expect(findCollisions(hitmask, circle)).toStrictEqual([false])
})

test("it should prove that a rectangle right above the tile of a hitmask intersects with it", () => {
  const hitmask = {
    position: [0, -1, 0],
    tileSize: [2, 2],
    columns: 1,
    heights: [1],
  }
  const rectangle = {
    shape: "rectangle",
    position: [0, 0, 0],
    size: [2, 2, 2],
  }

  expect(findCollisions(hitmask, rectangle)).toStrictEqual([true])
})

test("it should prove that a rectangle way above the tile of a hitmask does not intersect with it", () => {
  const hitmask = {
    position: [0, -1, 0],
    tileSize: [2, 2],
    columns: 1,
    heights: [0],
  }
  const rectangle = {
    shape: "rectangle",
    position: [0, 0, 0],
    size: [2, 2, 2],
  }

  expect(findCollisions(hitmask, rectangle)).toStrictEqual([false])
})

test("it should prove that a rectangle right next to the tile of a hitmask intersects with it", () => {
  const hitmask = {
    position: [0, 0, 0],
    tileSize: [2, 2],
    columns: 2,
    heights: [-1, 0],
  }
  const rectangle = {
    shape: "rectangle",
    position: [0, 0, 0],
    size: [2, 2, 2],
  }

  expect(findCollisions(hitmask, rectangle)).toStrictEqual([false, true])
})

test("it should prove that a rectangle right below to the tile of a hitmask intersects with it", () => {
  const hitmask = {
    position: [0, 0, 0],
    tileSize: [2, 2],
    columns: 1,
    heights: [-1, 0],
  }
  const rectangle = {
    shape: "rectangle",
    position: [0, 0, 0],
    size: [2, 2, 2],
  }

  expect(findCollisions(hitmask, rectangle)).toStrictEqual([false, true])
})
