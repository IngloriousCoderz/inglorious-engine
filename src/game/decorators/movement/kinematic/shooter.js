import face from '@inglorious/engine/ai/movement/kinematic/face.js'
import tank from '@inglorious/engine/player/kinematic/tank.js'
import { merge } from '@inglorious/utils/data-structures/objects.js'
import { zero } from '@inglorious/utils/math/linear-algebra/vector.js'
import { pi } from '@inglorious/utils/math/trigonometry.js'

const FULL_CIRCLE = 2
const DEFAULT_PARAMS = {
  onState: 'default',
  maxAngularSpeed: FULL_CIRCLE * pi(),
  maxSpeed: 250,
}
const X = 0
const Z = 2

export function enableShooter(params) {
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
          instance.maxSpeed = instance.maxSpeed ?? params.maxSpeed

          const { input0, mouse } = options.instances
          instance.velocity = zero()

          if (input0.left) {
            instance.velocity[Z] = -instance.maxSpeed
          }
          if (input0.down) {
            instance.velocity[X] = -instance.maxSpeed
          }
          if (input0.right) {
            instance.velocity[Z] = instance.maxSpeed
          }
          if (input0.up) {
            instance.velocity[X] = instance.maxSpeed
          }

          merge(instance, face(instance, mouse, options))
          merge(instance, tank(instance, options))
        },
      },
    },
  })
}
