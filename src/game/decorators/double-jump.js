import { extend, merge } from "@inglorious/utils/data-structures/objects.js"
import { jump } from "@inglorious/utils/physics/jump.js"

const DEFAULT_PARAMS = {
  onState: "default",
  onInput: "input0",
  maxSpeed: 250,
  maxJump: 100,
  maxLeap: 100,
}

export function enableDoubleJump(params) {
  params = extend(DEFAULT_PARAMS, params)

  return (type) =>
    extend(type, {
      states: {
        jumping: {
          "input:press"(instance, event, options) {
            type.states?.jumping["input:press"]?.(instance, event, options)

            instance.onInput = instance.onInput ?? params.onInput
            instance.maxJump = instance.maxJump ?? params.maxJump
            instance.maxLeap = instance.maxLeap ?? params.maxLeap
            instance.maxSpeed = instance.maxSpeed ?? params.maxSpeed

            const { id, action } = event.payload
            if (id.endsWith(instance.onInput) && action === "jump") {
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
