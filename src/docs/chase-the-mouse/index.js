import arrive from '@ezpz/engine/ai/movement/kinematic/arrive'
import { mouseInstance, mouseType } from '@ezpz/engine/input/mouse'
import { merge } from '@ezpz/utils/data-structures/objects'
import { angle, length } from '@ezpz/utils/math/linear-algebra/vector'
import { subtract } from '@ezpz/utils/math/linear-algebra/vectors'
import { abs } from '@ezpz/utils/math/numbers'
import { pi } from '@ezpz/utils/math/trigonometry'

import neko from './neko.png'

export default {
  types: {
    mouse: mouseType(),

    cat: {
      sprite: {
        src: neko,
        width: 192,
        height: 192,
        rows: 6,
        cols: 6,
        scale: 2,
        speed: 0.2,
        states: {
          idle: [[4, 0]],
          down: [
            [1, 0],
            [0, 1],
          ],
          up: [
            [4, 4],
            [0, 5],
          ],
          rightDown: [
            [1, 2],
            [2, 2],
          ],
          rightUp: [
            [5, 3],
            [5, 4],
          ],
          right: [
            [4, 2],
            [4, 3],
          ],
        },
      },

      states: {
        idle: {
          'game:update'(instance, event, { instances }) {
            const target = instances.mouse
            const direction = subtract(target.position, instance.position)

            instance.spriteState = 'idle'

            if (length(direction) < 200) {
              instance.state = 'chasing'
            }
          },
        },

        chasing: {
          'game:update'(instance, event, { elapsed, instances }) {
            const target = instances.mouse
            const direction = subtract(target.position, instance.position)
            const theta = angle(direction)

            if (abs(theta) > pi() / 3 && abs(theta) < (pi() * 2) / 3) {
              instance.spriteState = theta > 0 ? 'down' : 'up'
            } else if (
              (abs(theta) >= pi() / 6 && abs(theta) <= pi() / 3) ||
              (abs(theta) >= (pi() * 2) / 3 && abs(theta) <= (pi() * 5) / 6)
            ) {
              instance.spriteState = theta > 0 ? 'rightDown' : 'rightUp'
            } else {
              instance.spriteState = 'right'
            }

            instance.spriteFlip = direction[0] < 0 ? 'h' : ''

            merge(instance, arrive(instance, target, { elapsed }))

            if (length(direction) >= 200) {
              instance.state = 'idle'
            }
          },
        },
      },
    },
  },

  state: {
    instances: {
      mouse: mouseInstance(),

      neko: {
        type: 'cat',
        state: 'chasing',
        maxSpeed: 250,
        orientation: 0,
        position: [400, 0, 300],
      },
    },
  },
}
