import face from "@inglorious/engine/ai/movement/dynamic/face.js"
import move from "@inglorious/engine/movement/dynamic/tank.js"
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

export function enableShooterControls(params) {
  params = extend(DEFAULT_PARAMS, params)

  return (type) =>
    extend(type, {
      update(instance, dt, options) {
        instance.maxAngularSpeed =
          instance.maxAngularSpeed ?? params.maxAngularSpeed
        instance.maxAcceleration =
          instance.maxAcceleration ?? params.maxAcceleration
        instance.maxSpeed = instance.maxSpeed ?? params.maxSpeed

        const { input0, mouse } = options.instances
        instance.acceleration = zero()

        if (input0.left) {
          instance.acceleration[Z] = -instance.maxAcceleration
        }
        if (input0.down) {
          instance.acceleration[X] = -instance.maxAcceleration
        }
        if (input0.right) {
          instance.acceleration[Z] = instance.maxAcceleration
        }
        if (input0.up) {
          instance.acceleration[X] = instance.maxAcceleration
        }

        merge(instance, face(instance, mouse, dt, options))
        merge(instance, move(instance, dt))
      },
    })
}
