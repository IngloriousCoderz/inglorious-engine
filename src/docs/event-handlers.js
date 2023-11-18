import * as Character from '@inglorious/ui/canvas/character.js'
import { pi } from '@inglorious/utils/math/trigonometry.js'

const X = 0

export default {
  types: {
    ...Character.type({
      'game:update'(instance, event, { dt, config }) {
        const [left, , right] = config.bounds

        if (instance.position[X] > right) {
          instance.velocity[X] = -instance.maxSpeed
          instance.orientation = pi()
        } else if (instance.position[X] < left) {
          instance.velocity[X] = instance.maxSpeed
          instance.orientation = 0
        }

        instance.position[X] += instance.velocity[X] * dt
      },
    }),
  },

  state: {
    instances: {
      ...Character.instance({
        id: 'character1',
        maxSpeed: 250,
        position: [400, 0, 300],
        velocity: [250, 0, 0],
        orientation: 0,
      }),
    },
  },
}
