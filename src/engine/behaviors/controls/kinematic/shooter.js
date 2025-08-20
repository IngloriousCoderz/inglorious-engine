import { face } from "@inglorious/engine/ai/movement/kinematic/face.js"
import { tankMove } from "@inglorious/engine/movement/kinematic/tank.js"
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
      update(entity, dt, options) {
        entity.maxAngularSpeed =
          entity.maxAngularSpeed ?? params.maxAngularSpeed
        entity.maxSpeed = entity.maxSpeed ?? params.maxSpeed

        const { input0, mouse } = options.entities
        entity.velocity = zero()

        if (input0.left) {
          entity.velocity[Z] = -entity.maxSpeed
        }
        if (input0.down) {
          entity.velocity[X] = -entity.maxSpeed
        }
        if (input0.right) {
          entity.velocity[Z] = entity.maxSpeed
        }
        if (input0.up) {
          entity.velocity[X] = entity.maxSpeed
        }

        merge(entity, face(entity, mouse, dt, options))
        merge(entity, tankMove(entity, dt))
      },
    })
}
