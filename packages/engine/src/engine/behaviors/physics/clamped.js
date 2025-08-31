import { clampToBounds } from "@inglorious/engine/physics/bounds.js"
import { extend, merge } from "@inglorious/utils/data-structures/objects.js"

const DEFAULT_PARAMS = {
  collisionGroup: "bounds",
  depthAxis: "y",
}

export function clamped(params) {
  params = extend(DEFAULT_PARAMS, params)

  return (type) =>
    extend(type, {
      start(entity, api) {
        type.start?.(entity, api)

        entity.collisions ??= {}
        entity.collisions[params.collisionGroup] ??= {}
        entity.collisions[params.collisionGroup].shape ??= "rectangle"
      },

      update(entity, dt, api) {
        type.update?.(entity, dt, api)

        const game = api.getEntity("game")
        merge(entity, {
          position: clampToBounds(
            entity,
            game.bounds,
            params.collisionGroup,
            params.depthAxis,
          ),
        })
      },
    })
}
