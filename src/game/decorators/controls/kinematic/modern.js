import move from '@inglorious/engine/player/kinematic/move.js'
import { merge } from '@inglorious/utils/data-structures/objects.js'
import { zero } from '@inglorious/utils/math/linear-algebra/vector.js'

const DEFAULT_PARAMS = {
  onState: 'default',
  movementStrategy: 'kinematic',
  maxSpeed: 250,
}
const X = 0
const Z = 2

export function enableModernControls(params) {
  params = merge({}, DEFAULT_PARAMS, params)

  return (type) => ({
    ...type,

    states: {
      ...type.states,

      [params.onState]: {
        ...type.states?.[params.onState],

        'game:update'(instance, event, options) {
          type.states?.[params.onState]['game:update']?.(
            instance,
            event,
            options
          )

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

          merge(instance, move(instance, options))
        },
      },
    },
  })
}
