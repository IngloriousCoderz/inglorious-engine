import modernMove from "@inglorious/engine/movement/kinematic/modern.js"
import { extend, merge } from "@inglorious/utils/data-structures/objects.js"
import { zero } from "@inglorious/utils/math/linear-algebra/vector.js"

const DEFAULT_PARAMS = {
  onState: "default",
  movementStrategy: "kinematic",
  maxSpeed: 250,
}
const X = 0
const Z = 2

export function enableModernControls(params) {
  params = extend(DEFAULT_PARAMS, params)

  return (type) =>
    extend(type, {
      "game:update"(instance, event, options) {
        type["game:update"]?.(instance, event, options)

        const maxSpeed = instance.maxSpeed ?? params.maxSpeed

        const { input0 } = options.instances
        instance.velocity = zero()

        if (input0.left) {
          instance.velocity[X] = -maxSpeed
        }
        if (input0.down) {
          instance.velocity[Z] = -maxSpeed
        }
        if (input0.right) {
          instance.velocity[X] = maxSpeed
        }
        if (input0.up) {
          instance.velocity[Z] = maxSpeed
        }

        if (input0.leftRight != null) {
          instance.velocity[X] += input0.leftRight * maxSpeed
        }
        if (input0.upDown != null) {
          instance.velocity[Z] += -input0.upDown * maxSpeed
        }

        merge(instance, modernMove(instance, options))
      },
    })
}
