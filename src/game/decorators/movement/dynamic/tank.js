import tank from '@inglorious/engine/player/dynamic/tank.js'
import { merge } from '@inglorious/utils/data-structures/objects.js'
import { zero } from '@inglorious/utils/math/linear-algebra/vector.js'

const DEFAULT_PARAMS = {
  onState: 'default',
  maxAngularSpeed: 10,
  maxAcceleration: 500,
  maxSpeed: 250,
}
const X = 0
const Z = 2

export function enableTank(params) {
  params = merge({}, DEFAULT_PARAMS, params)

  return (type) => ({
    ...type,

    states: {
      ...type.states,

      [params.onState]: {
        ...type.states?.[params.onState],

        'game:update'(instance, event, options) {
          instance.maxAngularSpeed =
            instance.maxAngularSpeed ?? params.maxAngularSpeed
          instance.maxAcceleration =
            instance.maxAcceleration ?? params.maxAcceleration
          instance.maxSpeed = instance.maxSpeed ?? params.maxSpeed

          const { input0 } = options.instances

          instance.acceleration = zero()
          if (input0.left) {
            instance.orientation += 0.1
          }
          if (input0.down) {
            instance.acceleration[X] = -instance.maxAcceleration
          }
          if (input0.right) {
            instance.orientation -= 0.1
          }
          if (input0.up) {
            instance.acceleration[X] = instance.maxAcceleration
          }

          if (input0.leftRight != null) {
            instance.orientation +=
              -input0.leftRight * instance.maxAngularSpeed * options.dt
          }
          if (input0.upDown != null) {
            instance.acceleration[X] +=
              -input0.upDown * instance.maxAcceleration
          }
          if (input0.strafe != null) {
            instance.acceleration[Z] += input0.strafe * instance.maxAcceleration
          }

          merge(instance, tank(instance, options))
        },
      },
    },
  })
}
