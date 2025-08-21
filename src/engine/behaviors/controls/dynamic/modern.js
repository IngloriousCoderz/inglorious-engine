import { modernMove } from "@inglorious/engine/movement/dynamic/modern.js"
import { extend, merge } from "@inglorious/utils/data-structures/objects.js"
import { zero } from "@inglorious/utils/math/linear-algebra/vector.js"

const DEFAULT_PARAMS = {
  maxAcceleration: 500,
}
const X = 0
const Z = 2

export function modernControls(params) {
  params = extend(DEFAULT_PARAMS, params)

  return (type) =>
    extend(type, {
      update(entity, dt, api) {
        type.update?.(entity, dt, api)

        const maxAcceleration = entity.maxAcceleration ?? params.maxAcceleration

        const input0 = api.getEntity("input0")

        entity.acceleration = zero()

        if (input0.left) {
          entity.acceleration[X] = -maxAcceleration
        }
        if (input0.right) {
          entity.acceleration[X] = maxAcceleration
        }
        if (input0.down) {
          entity.acceleration[Z] = -maxAcceleration
        }
        if (input0.up) {
          entity.acceleration[Z] = maxAcceleration
        }

        if (input0.leftRight != null) {
          entity.acceleration[X] += input0.leftRight * maxAcceleration
        }
        if (input0.upDown != null) {
          entity.acceleration[Z] += -input0.upDown * maxAcceleration
        }

        merge(entity, modernMove(entity, dt))
      },
    })
}
