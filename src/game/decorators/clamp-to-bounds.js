import { extend } from "@inglorious/utils/data-structures/objects.js"

import { clampToBounds } from "../bounds.js"

export function enableClampToBounds() {
  return (type) =>
    extend(type, {
      "game:update"(instance, event, options) {
        type["game:update"]?.(instance, event, options)

        const { instances } = options
        clampToBounds(instance, instances.game.bounds)
      },
    })
}
