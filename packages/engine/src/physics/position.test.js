import { v } from "@inglorious/utils/math/linear-algebra/vector.js"
import { expect, test } from "vitest"

import { calculateLandingPosition } from "./position.js"

test("it should calculate the landing position for a point entity on a platform", () => {
  const entity = {
    collisions: {
      platform: { shape: "point" },
    },
  }
  const target = {
    position: v(0, 0, 0),
    collisions: {
      platform: { size: v(20, 10, 0) },
    },
  }
  const collisionGroup = "platform"

  const py = calculateLandingPosition(entity, target, collisionGroup)

  expect(py).toBe(5)
})

test("it should calculate the landing position for a circular entity on a platform", () => {
  const entity = {
    collisions: {
      platform: { shape: "circle", radius: 5 },
    },
  }
  const target = {
    position: v(0, 0, 0),
    collisions: {
      platform: { size: v(20, 10, 0) },
    },
  }
  const collisionGroup = "platform"

  const py = calculateLandingPosition(entity, target, collisionGroup)

  expect(py).toBe(10)
})

test("it should calculate the landing position for a rectangular entity on a platform", () => {
  const entity = {
    size: v(10, 10, 0),
    collisions: {
      platform: { shape: "rectangle" },
    },
  }
  const target = {
    position: v(0, 0, 0),
    collisions: {
      platform: { size: v(20, 10, 0) },
    },
  }
  const collisionGroup = "platform"

  const py = calculateLandingPosition(entity, target, collisionGroup)

  expect(py).toBe(10)
})

test("it should fallback to a rectangular calculation for an unknown entity shape", () => {
  const entity = {
    collisions: {
      platform: { shape: "triangle" },
    },
  }
  const target = {
    position: v(0, 0, 0),
    collisions: {
      platform: { size: v(20, 10, 0) },
    },
  }
  const collisionGroup = "platform"

  const py = calculateLandingPosition(entity, target, collisionGroup)

  expect(py).toBe(5)
})
