import face from '@inglorious/engine/ai/movement/kinematic/face.js'
import * as Input from '@inglorious/engine/input.js'
import * as Mouse from '@inglorious/engine/input/mouse.js'
import tank from '@inglorious/engine/player/kinematic/tank.js'
import * as Character from '@inglorious/ui/canvas/character.js'
import { clampToBounds } from '@inglorious/utils/character/bounds.js'
import { merge } from '@inglorious/utils/data-structures/objects.js'
import { pi } from '@inglorious/utils/math/trigonometry.js'

export default {
  types: {
    mouse: Mouse.type(),
    ...Input.type(),

    character: Character.type({
      'game:update'(instance, event, { dt, config, instances }) {
        const { input0, mouse } = instances

        instance.velocity = [0, 0, 0]
        if (input0.left) {
          instance.velocity[2] = -instance.maxSpeed
        }
        if (input0.down) {
          instance.velocity[0] = -instance.maxSpeed
        }
        if (input0.right) {
          instance.velocity[2] = instance.maxSpeed
        }
        if (input0.up) {
          instance.velocity[0] = instance.maxSpeed
        }

        merge(instance, face(instance, mouse, { dt }))
        merge(instance, tank(instance, { dt }))
        clampToBounds(instance, config.bounds)
      },
    }),
  },

  state: {
    instances: {
      mouse: Mouse.instance(),
      ...Input.instance(0, {
        ArrowLeft: 'left',
        ArrowRight: 'right',
        ArrowDown: 'down',
        ArrowUp: 'up',
        KeyA: 'left',
        KeyD: 'right',
        KeyS: 'down',
        KeyW: 'up',
      }),

      character: Character.instance({
        id: 'character',
        maxAngularSpeed: 2 * pi(),
        maxSpeed: 250,
        position: [400, 0, 300],
      }),
    },
  },
}
