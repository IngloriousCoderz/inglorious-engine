import { face } from "@inglorious/engine/ai/movement/dynamic/face.js"
import { tankMove } from "@inglorious/engine/movement/dynamic/tank.js"
import { extend, merge } from "@inglorious/utils/data-structures/objects.js"
import { zero } from "@inglorious/utils/math/linear-algebra/vector.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

const FULL_CIRCLE = 2
const DEFAULT_PARAMS = {
  maxAngularSpeed: FULL_CIRCLE * pi(),
  maxSpeed: 250,
}
const X = 0
const Z = 2

export function shooterControls(params) {
  params = extend(DEFAULT_PARAMS, params)

  return (type) =>
    extend(type, {
      update(entity, dt, { api }) {
        entity.maxAngularSpeed =
          entity.maxAngularSpeed ?? params.maxAngularSpeed
        entity.maxAcceleration =
          entity.maxAcceleration ?? params.maxAcceleration
        entity.maxSpeed = entity.maxSpeed ?? params.maxSpeed

        const input0 = api.getEntity("input0")
        const mouse = api.getEntity("mouse")

        entity.acceleration = zero()

        if (input0.left) {
          entity.acceleration[Z] = -entity.maxAcceleration
        }
        if (input0.down) {
          entity.acceleration[X] = -entity.maxAcceleration
        }
        if (input0.right) {
          entity.acceleration[Z] = entity.maxAcceleration
        }
        if (input0.up) {
          entity.acceleration[X] = entity.maxAcceleration
        }

        merge(entity, face(entity, mouse, dt))
        merge(entity, tankMove(entity, dt))
      },
    })
}
