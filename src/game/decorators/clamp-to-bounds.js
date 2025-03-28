import { extend } from "@inglorious/utils/data-structures/objects.js"

import { clampToBounds } from "../bounds.js"

const DEFAULT_PARAMS = {
  onState: "default",
}

export function enableClampToBounds(params) {
  params = extend(DEFAULT_PARAMS, params)

  return (type) =>
    extend(type, {
      states: {
        [params.onState]: {
          "game:update"(instance, event, options) {
            const { instances } = options

            type.states?.[params.onState]["game:update"]?.(
              instance,
              event,
              options,
            )

            clampToBounds(instance, instances.game.bounds)
          },
        },
      },
    })
}
