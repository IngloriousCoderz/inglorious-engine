import { collidesWith } from '@inglorious/engine/collision/detection.js'
import move from '@inglorious/engine/player/kinematic/move.js'
import { clampToBounds } from '@inglorious/game/bounds.js'
import { enableCharacter } from '@inglorious/game/decorators/character.js'
import * as Input from '@inglorious/game/types/input.js'
import * as Platform from '@inglorious/game/types/platform.js'
import { merge } from '@inglorious/utils/data-structures/objects.js'
import { applyGravity } from '@inglorious/utils/physics/gravity.js'
import { jump } from '@inglorious/utils/physics/jump.js'

export default {
  types: {
    ...Input.type(),

    character: [
      enableCharacter(),
      {
        states: {
          notJumping: {
            'game:update'(instance, event, options) {
              const { input0 } = options.instances

              instance.velocity = [0, 0, 0]
              if (input0.left) {
                instance.velocity[0] = -instance.maxSpeed
              }
              if (input0.right) {
                instance.velocity[0] = instance.maxSpeed
              }

              if (input0.leftRight != null) {
                instance.velocity[0] += input0.leftRight * instance.maxSpeed
              }

              act(instance, event, options)
            },

            'input:press'(instance, event, { dt }) {
              const { id, action } = event.payload
              if (id === 0 && action === 'jump' && !instance.vy) {
                instance.state = 'jumping'
                merge(instance, jump(instance, { dt }))
              }
            },
          },

          jumping: {
            'game:update'(instance, event, options) {
              act(instance, event, options)
            },
          },
        },
      },
    ],

    platform: Platform.type(),
  },

  state: {
    instances: {
      ...Input.instance(0, {
        ArrowLeft: 'left',
        ArrowRight: 'right',
        Space: 'jump',
        KeyA: 'left',
        KeyD: 'right',
        Btn0: 'jump',
        Btn14: 'left',
        Btn15: 'right',
        Axis0: 'leftRight',
      }),

      character: {
        id: 'character',
        type: 'character',
        position: [200, 0, 62],
        orientation: 0,
        maxSpeed: 250,
        maxJump: 100,
        maxLeap: 100,
        state: 'notJumping',
        collisions: {
          platform: {
            shape: 'circle',
            radius: 12,
          },
        },
      },
      ground: {
        id: 'ground',
        type: 'platform',
        position: [0, 0, 50],
        size: [800, 50],
        collisions: {
          platform: {
            shape: 'platform',
          },
        },
      },
      platform: {
        id: 'platform',
        type: 'platform',
        position: [600, 0, 100],
        size: [80, 20],
        collisions: {
          platform: {
            shape: 'platform',
          },
        },
      },
    },
  },
}

function act(instance, event, options) {
  merge(instance, move(instance, options))
  clampToBounds(instance, options.config.bounds)

  merge(instance, applyGravity(instance, options))

  const { instances } = options
  const targets = Object.values(instances).filter(
    ({ type }) => type === 'platform'
  )

  targets.forEach((target) => {
    if (instance.vy < 0 && collidesWith(instance, target, 'platform')) {
      instance.vy = 0
      instance.py = 0
      instance.position[2] =
        target.position[2] + instance.collisions.platform.radius
      instance.state = 'notJumping'
    }
  })
}
