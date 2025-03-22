import { enableCharacter } from "@inglorious/game/decorators/character.js"
import { enableClampToBounds } from "@inglorious/game/decorators/clamp-to-bounds"
import { enableModernControls } from "@inglorious/game/decorators/controls/dynamic/modern.js"
import { enableDoubleJump } from "@inglorious/game/decorators/double-jump"
import {
  createControls,
  enableControls,
} from "@inglorious/game/decorators/input/controls.js"
import { enableJump } from "@inglorious/game/decorators/jump.js"

export default {
  types: {
    ...enableControls(),

    stats: {},

    character: [
      enableCharacter(),
      enableModernControls(),
      enableClampToBounds(),
      enableJump(),
      enableDoubleJump(),
      (type) => ({
        ...type,

        states: {
          ...type.states,

          default: {
            ...type.states?.default,

            "game:update"(instance, event, options) {
              type.states?.default["game:update"]?.(instance, event, options)

              stopFreeFalling(instance)
            },
          },

          jumping: {
            ...type.states?.jumping,

            "game:update"(instance, event, options) {
              type.states?.jumping["game:update"]?.(instance, event, options)

              stopFreeFalling(instance)
            },
          },

          doubleJumping: {
            ...type.states?.doubleJumping,

            "game:update"(instance, event, options) {
              type.states?.doubleJumping["game:update"]?.(
                instance,
                event,
                options,
              )

              stopFreeFalling(instance)
            },
          },
        },
      }),
    ],
  },

  state: {
    instances: {
      ...createControls(0, {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
        Space: "jump",
        KeyW: "up",
        KeyS: "down",
        KeyA: "left",
        KeyD: "right",
        Btn12: "up",
        Btn13: "down",
        Btn14: "left",
        Btn15: "right",
        Btn0: "jump",
        Axis0: "leftRight",
        Axis1: "upDown",
      }),

      stats: {
        type: "stats",
        position: [600, 0, 600],
        target: "character",
      },

      character: {
        id: "character",
        type: "character",
        maxSpeed: 250,
        position: [400, 0, 300],
        maxJump: 100,
        maxLeap: 100,
        state: "default",
      },
    },
  },
}

function stopFreeFalling(instance) {
  if (instance.py <= 0) {
    instance.vy = 0
    instance.py = 0
    instance.state = "default"
  }
}
