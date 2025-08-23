import { tankMove } from "@inglorious/engine/movement/kinematic/tank.js"
import { extend, merge } from "@inglorious/utils/data-structures/objects.js"
import { zero } from "@inglorious/utils/math/linear-algebra/vector.js"

import { createMovementEventHandlers } from "../event-handlers.js"

const DEFAULT_PARAMS = {
  maxAngularSpeed: 10,
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
        entity.maxSpeed = entity.maxSpeed ?? params.maxSpeed

        const { movement = {} } = entity
        entity.velocity = zero()

        if (movement.turnLeft) {
          entity.orientation += entity.maxAngularSpeed * dt
        }
        if (movement.turnRight) {
          entity.orientation -= entity.maxAngularSpeed * dt
        }
        if (movement.moveForward) {
          entity.velocity[X] = entity.maxSpeed
        }
        if (movement.moveBackward) {
          entity.velocity[X] = -entity.maxSpeed
        }

        if (movement.strafe) {
          entity.velocity[Z] += movement.strafe * entity.maxSpeed
        }
        if (movement.move) {
          entity.velocity[X] += -movement.move * entity.maxSpeed
        }
        if (movement.turn) {
          entity.orientation += -movement.turn * entity.maxAngularSpeed * dt
        }

        merge(entity, tankMove(entity, dt))
      },
    })
}
