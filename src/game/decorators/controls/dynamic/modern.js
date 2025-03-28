import modernMove from "@inglorious/engine/movement/dynamic/modern.js"
import { extend, merge } from "@inglorious/utils/data-structures/objects.js"
import { zero } from "@inglorious/utils/math/linear-algebra/vector.js"

const DEFAULT_PARAMS = {
  onState: "default",
  maxAcceleration: 500,
}
const X = 0
const Z = 2

export function enableModernControls(params) {
  params = extend(DEFAULT_PARAMS, params)

  return (type) =>
    extend(type, {
      states: {
        [params.onState]: {
          "game:update"(instance, event, options) {
            const { instances } = options

            type.states?.[params.onState]["game:update"]?.(
              instance,
              event,
              options,
            )

            const maxAcceleration =
              instance.maxAcceleration ?? params.maxAcceleration

            const { input0 } = instances
            instance.acceleration = zero()

            if (input0.left) {
              instance.acceleration[X] = -maxAcceleration
            }
            if (input0.right) {
              instance.acceleration[X] = maxAcceleration
            }
            if (input0.down) {
              instance.acceleration[Z] = -maxAcceleration
            }
            if (input0.up) {
              instance.acceleration[Z] = maxAcceleration
            }

            if (input0.leftRight != null) {
              instance.acceleration[X] += input0.leftRight * maxAcceleration
            }
            if (input0.upDown != null) {
              instance.acceleration[Z] += -input0.upDown * maxAcceleration
            }

            merge(instance, modernMove(instance, options))
          },
        },
      },
    })
}
