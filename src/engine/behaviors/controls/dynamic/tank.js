import { tankMove } from "@inglorious/engine/movement/dynamic/tank.js"
import { extend, merge } from "@inglorious/utils/data-structures/objects.js"
import { zero } from "@inglorious/utils/math/linear-algebra/vector.js"

import { createMovementEventHandlers } from "../event-handlers.js"

const DEFAULT_PARAMS = {
  maxAngularSpeed: 10,
  maxAcceleration: 500,
  maxSpeed: 250,
}
const X = 0
const Z = 2

export function tankControls(params) {
  params = extend(DEFAULT_PARAMS, params)

  return (type) =>
    extend(type, {
      ...createMovementEventHandlers([
        "turnLeft",
        "turnRight",
        "moveForward",
        "moveBackward",
        "strafe",
        "move",
        "turn",
      ]),

      update(entity, dt) {
        entity.maxAngularSpeed =
          entity.maxAngularSpeed ?? params.maxAngularSpeed
        entity.maxAcceleration =
          entity.maxAcceleration ?? params.maxAcceleration
        entity.maxSpeed = entity.maxSpeed ?? params.maxSpeed

        const { movement = {} } = entity
        entity.acceleration = zero()

        if (movement.turnLeft) {
          entity.orientation += 0.1
        }
        if (movement.turnRight) {
          entity.orientation -= 0.1
        }
        if (movement.moveForward) {
          entity.acceleration[X] = entity.maxAcceleration
        }
        if (movement.moveBackward) {
          entity.acceleration[X] = -entity.maxAcceleration
        }

        if (movement.strafe != null) {
          entity.acceleration[Z] += movement.strafe * entity.maxAcceleration
        }
        if (movement.move) {
          entity.acceleration[X] += -movement.move * entity.maxAcceleration
        }
        if (movement.turn) {
          entity.orientation += -movement.turn * entity.maxAngularSpeed * dt
        }

        merge(entity, tankMove(entity, dt))
      },
    })
}
