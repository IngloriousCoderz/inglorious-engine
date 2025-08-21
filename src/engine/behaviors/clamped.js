import { extend } from "@inglorious/utils/data-structures/objects.js"

import { clampToBounds } from "../physics/bounds.js"

export function clamped() {
  return (type) =>
    extend(type, {
      update(entity, dt, options) {
        type.update?.(entity, dt, options)

        const game = options.api.getEntity("game")
        clampToBounds(entity, game.bounds)
      },
    })
}
