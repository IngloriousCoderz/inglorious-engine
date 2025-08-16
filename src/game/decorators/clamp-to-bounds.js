import { extend } from "@inglorious/utils/data-structures/objects.js"

import { clampToBounds } from "../bounds.js"

export function enableClampToBounds() {
  return (type) =>
    extend(type, {
      "game:update"(instance, dt, options) {
        type["game:update"]?.(instance, dt, options)

        const { game } = options.instances
        clampToBounds(instance, game.bounds)
      },
    })
}
