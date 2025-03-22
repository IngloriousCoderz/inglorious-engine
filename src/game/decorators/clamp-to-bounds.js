import { merge } from "@inglorious/utils/data-structures/objects.js"

import { clampToBounds } from "../bounds.js"

const DEFAULT_PARAMS = {
  onState: "default",
}

export function enableClampToBounds(params) {
  params = merge({}, DEFAULT_PARAMS, params)

  return (type) => ({
    ...type,

    states: {
      [params.onState]: {
        ...type.states?.[params.onState],

        "game:update"(instance, event, options) {
          type.states?.[params.onState]["game:update"]?.(
            instance,
            event,
            options,
          )

          clampToBounds(instance, options.config.bounds)
        },
      },
    },
  })
}
