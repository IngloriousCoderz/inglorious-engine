import { extend } from "@inglorious/utils/data-structures/objects.js"

const DEFAULT_PARAMS = {
  onState: "default",
}

export function enableCollisions(params) {
  params = extend(DEFAULT_PARAMS, params)

  return (type) =>
    extend(type, {
      states: {
        [params.onState]: {
          "game:update"(instance, dt, options) {
            type.states?.[params.onState]["game:update"]?.(
              instance,
              dt,
              options,
            )
          },
        },
      },
    })
}
