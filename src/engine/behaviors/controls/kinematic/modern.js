import { modernMove } from "@inglorious/engine/movement/kinematic/modern.js"
import { extend, merge } from "@inglorious/utils/data-structures/objects.js"
import { zero } from "@inglorious/utils/math/linear-algebra/vector.js"

const DEFAULT_PARAMS = {
  onState: "default",
  movementStrategy: "kinematic",
  maxSpeed: 250,
}
const X = 0
const Z = 2

export function modernControls(params) {
  params = extend(DEFAULT_PARAMS, params)

  return (type) =>
    extend(type, {
      update(entity, dt, options) {
        type.update?.(entity, dt, options)

        const maxSpeed = entity.maxSpeed ?? params.maxSpeed

        const { input0 } = options.entities
        entity.velocity = zero()

        if (input0.left) {
          entity.velocity[X] = -maxSpeed
        }
        if (input0.down) {
          entity.velocity[Z] = -maxSpeed
        }
        if (input0.right) {
          entity.velocity[X] = maxSpeed
        }
        if (input0.up) {
          entity.velocity[Z] = maxSpeed
        }

        if (input0.leftRight != null) {
          entity.velocity[X] += input0.leftRight * maxSpeed
        }
        if (input0.upDown != null) {
          entity.velocity[Z] += -input0.upDown * maxSpeed
        }

        merge(entity, modernMove(entity, dt))
      },
    })
}
