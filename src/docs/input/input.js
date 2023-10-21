import move from '@inglorious/engine/ai/movement/kinematic/move'
import { inputInstances, inputType } from '@inglorious/engine/input'
import { merge } from '@inglorious/utils/data-structures/objects'

export default {
  types: {
    ...inputType({
      ArrowUp: 'up',
      ArrowDown: 'down',
      ArrowLeft: 'left',
      ArrowRight: 'right',
      KeyW: 'up',
      KeyS: 'down',
      KeyA: 'left',
      KeyD: 'right',
      Btn12: 'up',
      Btn13: 'down',
      Btn14: 'left',
      Btn15: 'right',
      Axis0: 'leftRight',
      Axis1: 'upDown',
    }),

    fps: {
      'game:update'(instance, event, { dt }) {
        instance.value = dt
      },
    },

    character: {
      'game:update'(instance, event, { dt, instances }) {
        const { input1 } = instances

        instance.velocity = [0, 0, 0]

        if (input1.left) {
          instance.velocity[0] = -instance.maxSpeed
        }
        if (input1.down) {
          instance.velocity[2] = -instance.maxSpeed
        }
        if (input1.right) {
          instance.velocity[0] = instance.maxSpeed
        }
        if (input1.up) {
          instance.velocity[2] = instance.maxSpeed
        }

        if (input1.leftRight != null) {
          instance.velocity[0] += input1.leftRight * instance.maxSpeed
        }
        if (input1.upDown != null) {
          instance.velocity[2] += -input1.upDown * instance.maxSpeed
        }

        merge(instance, move(instance, { dt }))
      },
    },
  },

  state: {
    instances: {
      ...inputInstances(),

      debug: {
        type: 'fps',
        value: 0,
      },

      character: {
        type: 'character',
        maxSpeed: 250,
        position: [400, 0, 300],
      },
    },
  },
}
