import { tankMove } from "@inglorious/engine/movement/dynamic/tank.js"
import { extend, merge } from "@inglorious/utils/data-structures/objects.js"
import { zero } from "@inglorious/utils/math/linear-algebra/vector.js"

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
      update(entity, dt, { entities }) {
        entity.maxAngularSpeed =
          entity.maxAngularSpeed ?? params.maxAngularSpeed
        entity.maxAcceleration =
          entity.maxAcceleration ?? params.maxAcceleration
        entity.maxSpeed = entity.maxSpeed ?? params.maxSpeed

        entity.acceleration = zero()

        const { input0 } = entities
        if (input0.left) {
          entity.orientation += 0.1
        }
        if (input0.down) {
          entity.acceleration[X] = -entity.maxAcceleration
        }
        if (input0.right) {
          entity.orientation -= 0.1
        }
        if (input0.up) {
          entity.acceleration[X] = entity.maxAcceleration
        }

        if (input0.leftRight != null) {
          entity.orientation += -input0.leftRight * entity.maxAngularSpeed * dt
        }
        if (input0.upDown != null) {
          entity.acceleration[X] += -input0.upDown * entity.maxAcceleration
        }
        if (input0.strafe != null) {
          entity.acceleration[Z] += input0.strafe * entity.maxAcceleration
        }

        merge(entity, tankMove(entity, dt))
      },
    })
}
