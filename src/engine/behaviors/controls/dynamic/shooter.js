import { face } from "@inglorious/engine/ai/movement/dynamic/face.js"
import { tankMove } from "@inglorious/engine/movement/dynamic/tank.js"
import { extend, merge } from "@inglorious/utils/data-structures/objects.js"
import { zero } from "@inglorious/utils/math/linear-algebra/vector.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

import { createMovementEventHandlers } from "../event-handlers.js"

const FULL_CIRCLE = 2
const DEFAULT_PARAMS = {
  maxAngularSpeed: FULL_CIRCLE * pi(),
  maxSpeed: 250,
}
const X = 0
const Z = 2

export function shooterControls(params) {
  params = extend(DEFAULT_PARAMS, params)

  const DEADZONE = 0.1
  const NO_MOVEMENT = 0

  return (type) =>
    extend(type, {
      ...createMovementEventHandlers([
        "moveLeft",
        "moveRight",
        "moveUp",
        "moveDown",
        "strafe",
        "move",
        "turn",
      ]),

      update(entity, dt, api) {
        entity.maxAngularSpeed =
          entity.maxAngularSpeed ?? params.maxAngularSpeed
        entity.maxAcceleration =
          entity.maxAcceleration ?? params.maxAcceleration
        entity.maxSpeed = entity.maxSpeed ?? params.maxSpeed

        const mouse = api.getEntity("mouse")

        const { movement = {} } = entity
        entity.acceleration = zero()

        if (movement.moveLeft) {
          entity.acceleration[Z] = -entity.maxAcceleration
        }
        if (movement.moveRight) {
          entity.acceleration[Z] = entity.maxAcceleration
        }
        if (movement.moveUp) {
          entity.acceleration[X] = entity.maxAcceleration
        }
        if (movement.moveDown) {
          entity.acceleration[X] = -entity.maxAcceleration
        }

        if (movement.strafe) {
          entity.acceleration[Z] += movement.strafe * entity.maxAcceleration
        }
        if (movement.move) {
          entity.acceleration[X] += -movement.move * entity.maxAcceleration
        }
        if (movement.turn) {
          entity.orientation += -movement.turn * entity.maxAngularSpeed * dt
        }

        const isUsingAnalogMovement =
          Math.abs(movement.move ?? NO_MOVEMENT) > DEADZONE ||
          Math.abs(movement.strafe ?? NO_MOVEMENT) > DEADZONE

        if (!isUsingAnalogMovement) {
          merge(entity, face(entity, mouse, dt))
        }
        merge(entity, tankMove(entity, dt))
      },
    })
}
