import { tankMove } from "@inglorious/engine/movement/kinematic/tank.js"
import { extend, merge } from "@inglorious/utils/data-structures/objects.js"
import { zero } from "@inglorious/utils/math/linear-algebra/vector.js"

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
      update(entity, dt, api) {
        entity.maxAngularSpeed =
          entity.maxAngularSpeed ?? params.maxAngularSpeed
        entity.maxSpeed = entity.maxSpeed ?? params.maxSpeed

        const input0 = api.getEntity("input0")
        entity.velocity = zero()

        if (input0.left) {
          entity.orientation += 0.1
        }
        if (input0.down) {
          entity.velocity[X] = -entity.maxSpeed
        }
        if (input0.right) {
          entity.orientation -= 0.1
        }
        if (input0.up) {
          entity.velocity[X] = entity.maxSpeed
        }

        if (input0.leftRight != null) {
          entity.orientation += -input0.leftRight * entity.maxAngularSpeed * dt
        }
        if (input0.upDown != null) {
          entity.velocity[X] += -input0.upDown * entity.maxSpeed
        }
        if (input0.strafe != null) {
          entity.velocity[Z] += input0.strafe * entity.maxSpeed
        }

        merge(entity, tankMove(entity, dt))
      },
    })
}
