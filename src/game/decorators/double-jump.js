import { merge } from "@inglorious/utils/data-structures/objects.js"
import { jump } from "@inglorious/utils/physics/jump.js"

const DEFAULT_PARAMS = {
  onState: "default",
  maxSpeed: 250,
  maxJump: 100,
  maxLeap: 100,
}
const INPUT_0 = 0

export function enableDoubleJump(params) {
  params = merge({}, DEFAULT_PARAMS, params)

  return (type) => ({
    ...type,

    states: {
      ...type.states,

      jumping: {
        ...type.states?.jumping,

        "input:press"(instance, event, options) {
          type.states?.jumping["input:press"]?.(instance, event, options)

          instance.maxJump = instance.maxJump ?? params.maxJump
          instance.maxLeap = instance.maxLeap ?? params.maxLeap
          instance.maxSpeed = instance.maxSpeed ?? params.maxSpeed

          const { id, action } = event.payload
          if (id === INPUT_0 && action === "jump") {
            instance.state = "doubleJumping"
            merge(instance, jump(instance, options))
          }
        },
      },

      doubleJumping: {
        "game:update"(instance, event, options) {
          type.states?.[params.onState]["game:update"]?.(
            instance,
            event,
            options,
          )
        },
      },
    },
  })
}
