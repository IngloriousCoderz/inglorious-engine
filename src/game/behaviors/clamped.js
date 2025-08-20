import { extend } from "@inglorious/utils/data-structures/objects.js"

import { clampToBounds } from "../bounds.js"

export function clamped() {
  return (type) =>
    extend(type, {
      update(instance, dt, options) {
        type.update?.(instance, dt, options)

        const { game } = options.instances
        clampToBounds(instance, game.bounds)
      },
    })
}
