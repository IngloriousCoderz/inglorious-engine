import { collidesWith } from "@inglorious/engine/collision/detection.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"
import { applyGravity } from "@inglorious/utils/physics/gravity.js"
import { jump } from "@inglorious/utils/physics/jump.js"

const DEFAULT_PARAMS = {
  onState: "default",
  maxSpeed: 250,
  maxJump: 100,
  maxLeap: 100,
}
const INPUT_0 = 0
const FALLING = 0
const Z = 2

export function enableJump(params) {
  params = merge({}, DEFAULT_PARAMS, params)

  const freeFall = createFreeFall(params)

  return (type) => ({
    ...type,

    states: {
      ...type.states,

      [params.onState]: {
        ...type.states?.[params.onState],

        "game:update"(instance, event, options) {
          type.states?.[params.onState]["game:update"]?.(
            instance,
            event,
            options,
          )

          freeFall(instance, event, options)
        },

        "input:press"(instance, event, options) {
          type.states?.[params.onState]["input:press"]?.(
            instance,
            event,
            options,
          )

          instance.maxJump = instance.maxJump ?? params.maxJump
          instance.maxLeap = instance.maxLeap ?? params.maxLeap
          instance.maxSpeed = instance.maxSpeed ?? params.maxSpeed

          const { id, action } = event.payload
          if (id === INPUT_0 && action === "jump" && !instance.vy) {
            instance.state = "jumping"
            merge(instance, jump(instance, options))
          }
        },
      },

      jumping: {
        "game:update"(instance, event, options) {
          type.states?.[params.onState]["game:update"]?.(
            instance,
            event,
            options,
          )

          freeFall(instance, event, options)
        },
      },
    },
  })
}

function createFreeFall(params) {
  return (instance, event, options) => {
    instance.maxLeap = instance.maxLeap ?? params.maxLeap

    merge(instance, applyGravity(instance, options))

    const { instances } = options
    const targets = Object.values(instances).filter(
      ({ type }) => type === "platform",
    )

    targets.forEach((target) => {
      if (instance.vy < FALLING && collidesWith(instance, target, "platform")) {
        instance.vy = 0
        instance.py = 0
        instance.position[Z] =
          target.position[Z] + instance.collisions.platform.radius
        instance.state = params.onState
      }
    })
  }
}
