import { modernMove } from "@inglorious/engine/movement/dynamic/modern.js"
import { extend, merge } from "@inglorious/utils/data-structures/objects.js"
import { zero } from "@inglorious/utils/math/linear-algebra/vector.js"

import { createMovementEventHandlers } from "../event-handlers.js"

const DEFAULT_PARAMS = {
  maxAcceleration: 500,
  associatedInput: "input0",
}
const X = 0
const Z = 2

export function modernControls(params) {
  params = extend(DEFAULT_PARAMS, params)

  return (type) =>
    extend(type, {
      ...createMovementEventHandlers([
        "moveLeft",
        "moveRight",
        "moveUp",
        "moveDown",
        "moveLeftRight",
        "moveUpDown",
      ]),

      start(entity, api) {
        type.start?.(entity, api)

        entity.maxAcceleration ??= params.maxAcceleration
        entity.associatedInput ??= params.associatedInput
        entity.movement ??= {}
      },

      update(entity, dt, api) {
        type.update?.(entity, dt, api)

        const { movement, maxAcceleration } = entity
        entity.acceleration = zero()

        if (movement.moveLeft) {
          entity.acceleration[X] = -maxAcceleration
        }
        if (movement.moveRight) {
          entity.acceleration[X] = maxAcceleration
        }
        if (movement.moveUp) {
          entity.acceleration[Z] = maxAcceleration
        }
        if (movement.moveDown) {
          entity.acceleration[Z] = -maxAcceleration
        }

        if (movement.moveLeftRight) {
          entity.acceleration[X] += movement.moveLeftRight * maxAcceleration
        }
        if (movement.moveUpDown) {
          entity.acceleration[Z] += -movement.moveUpDown * maxAcceleration
        }

        merge(entity, modernMove(entity, dt))
      },
    })
}
