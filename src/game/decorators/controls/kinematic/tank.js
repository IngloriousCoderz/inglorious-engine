import tankMove from "@inglorious/engine/movement/kinematic/tank.js"
import { extend, merge } from "@inglorious/utils/data-structures/objects.js"
import { zero } from "@inglorious/utils/math/linear-algebra/vector.js"

const DEFAULT_PARAMS = {
  onState: "default",
  maxAngularSpeed: 10,
  maxSpeed: 250,
}
const X = 0
const Z = 2

export function enableTankControls(params) {
  params = merge({}, DEFAULT_PARAMS, params)

  return (type) =>
    extend(type, {
      states: {
        [params.onState]: {
          "game:update"(instance, event, options) {
            instance.maxAngularSpeed =
              instance.maxAngularSpeed ?? params.maxAngularSpeed
            instance.maxSpeed = instance.maxSpeed ?? params.maxSpeed

            const { input0 } = options.instances
            instance.velocity = zero()

            if (input0.left) {
              instance.orientation += 0.1
            }
            if (input0.down) {
              instance.velocity[X] = -instance.maxSpeed
            }
            if (input0.right) {
              instance.orientation -= 0.1
            }
            if (input0.up) {
              instance.velocity[X] = instance.maxSpeed
            }

            if (input0.leftRight != null) {
              instance.orientation +=
                -input0.leftRight * instance.maxAngularSpeed * options.dt
            }
            if (input0.upDown != null) {
              instance.velocity[X] += -input0.upDown * instance.maxSpeed
            }
            if (input0.strafe != null) {
              instance.velocity[Z] += input0.strafe * instance.maxSpeed
            }

            merge(instance, tankMove(instance, options))
          },
        },
      },
    })
}
