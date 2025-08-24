import { expect, test } from "vitest"

import { calculateLandingPosition } from "./position.js"

test("it should calculate the landing position for a rectangular entity on a platform", () => {
  const entity = {
    collisions: {
      platform: { shape: "rectangle" },
    },
  }
  const target = {
    position: [0, 100, 0],
    collisions: {
      platform: { size: [50, 10, 0] },
    },
  }
  const collisionGroup = "platform"

  const py = calculateLandingPosition(entity, target, collisionGroup)

  expect(py).toBe(110)
})

test("it should calculate the landing position for a circular entity on a platform", () => {
  const entity = {
    collisions: {
      platform: { shape: "circle", radius: 15 },
    },
  }
  const target = {
    position: [0, 100, 0],
    size: [50, 20],
    collisions: {
      platform: { size: [50, 10, 0] },
    },
  }
  const collisionGroup = "platform"

  const py = calculateLandingPosition(entity, target, collisionGroup)

  expect(py).toBe(125)
})

test("it should fallback to a rectangular calculation for an unknown entity shape", () => {
  const entity = {
    collisions: {
      platform: { shape: "triangle" },
    },
  }
  const target = {
    position: [0, 100, 0],
    collisions: {
      platform: { size: [50, 10, 0] },
    },
  }
  const collisionGroup = "platform"

  const py = calculateLandingPosition(entity, target, collisionGroup)

  expect(py).toBe(110)
})
