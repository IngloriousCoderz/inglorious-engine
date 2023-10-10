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
          aware: [
            [0, 0],
            [4, 0],
          ],
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
          sleepy: [
            [4, 0],
            [4, 1],
            [4, 1],
            [3, 0],
            [3, 1],
            [3, 2],
            [3, 1],
            [3, 2],
            [3, 2],
          ],
          sleeping: [
            [2, 4],
            [2, 4],
            [3, 4],
            [3, 4],
          ],
        },
      },

      states: {
        idle: {
          'game:update'(instance, event, { instances }) {
            instance.sprite = 'idle'

            const target = instances.mouse
            const direction = subtract(target.position, instance.position)

            if (length(direction) < 200) {
              instance.state = 'aware'
            }
          },
        },

        aware: {
          'game:update'(instance) {
            instance.sprite = 'aware'
          },

          'sprite:animationEnd'(instance) {
            instance.state = 'chasing'
          },
        },

        chasing: {
          'game:update'(instance, event, { elapsed, instances }) {
            const target = instances.mouse
            const direction = subtract(target.position, instance.position)

            if (length(direction) >= 200) {
              instance.state = 'idle'
              instance.spriteFlip = ''
              return
            } else if (length(direction) < 10) {
              instance.state = 'sleepy'
              instance.spriteFlip = ''
              return
            }

            const theta = angle(direction)

            if (abs(theta) > pi() / 3 && abs(theta) < (pi() * 2) / 3) {
              instance.sprite = theta > 0 ? 'down' : 'up'
            } else if (
              (abs(theta) >= pi() / 6 && abs(theta) <= pi() / 3) ||
              (abs(theta) >= (pi() * 2) / 3 && abs(theta) <= (pi() * 5) / 6)
            ) {
              instance.sprite = theta > 0 ? 'rightDown' : 'rightUp'
            } else {
              instance.sprite = 'right'
            }

            instance.spriteFlip = direction[0] < 0 ? 'h' : ''

            merge(instance, arrive(instance, target, { elapsed }))

            if (length(direction) >= 200) {
              instance.state = 'idle'
              instance.spriteFlip = ''
            } else if (length(direction) < 10) {
              instance.state = 'sleepy'
              instance.spriteFlip = ''
            }
          },
        },

        sleepy: {
          'game:update'(instance, event, { instances }) {
            instance.sprite = 'sleepy'

            const target = instances.mouse
            const direction = subtract(target.position, instance.position)

            if (length(direction) >= 10) {
              instance.state = 'aware'
            }
          },

          'sprite:animationEnd'(instance) {
            instance.state = 'sleeping'
          },
        },

        sleeping: {
          'game:update'(instance, event, { instances }) {
            instance.sprite = 'sleeping'

            const target = instances.mouse
            const direction = subtract(target.position, instance.position)

            if (length(direction) >= 10) {
              instance.state = 'aware'
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
        state: 'idle',
        maxSpeed: 250,
        orientation: 0,
        position: [400, 0, 300],
      },
    },
  },
}
