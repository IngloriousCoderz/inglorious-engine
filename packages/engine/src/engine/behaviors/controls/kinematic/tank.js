import { tankMove } from "@inglorious/engine/movement/kinematic/tank.js"
import { extend, merge } from "@inglorious/utils/data-structures/objects.js"
import { zero } from "@inglorious/utils/math/linear-algebra/vector.js"

import { createMovementEventHandlers } from "../event-handlers.js"

const DEFAULT_PARAMS = {
  maxSpeed: 250,
  maxAngularSpeed: 10,
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

      start(entity, api) {
        type.start?.(entity, api)

        entity.maxSpeed ??= params.maxSpeed
        entity.maxAngularSpeed ??= params.maxAngularSpeed
        entity.movement ??= {}
      },

      update(entity, dt) {
        const { movement, maxSpeed, maxAngularSpeed } = entity
        entity.velocity = zero()

        if (movement.turnLeft) {
          entity.orientation += maxAngularSpeed * dt
        }
        if (movement.turnRight) {
          entity.orientation -= maxAngularSpeed * dt
        }
        if (movement.moveForward) {
          entity.velocity[X] = maxSpeed
        }
        if (movement.moveBackward) {
          entity.velocity[X] = -maxSpeed
        }

        if (movement.strafe) {
          entity.velocity[Z] += movement.strafe * maxSpeed
        }
        if (movement.move) {
          entity.velocity[X] += -movement.move * maxSpeed
        }
        if (movement.turn) {
          entity.orientation += -movement.turn * maxAngularSpeed * dt
        }

        merge(entity, tankMove(entity, dt))
      },
    })
}
