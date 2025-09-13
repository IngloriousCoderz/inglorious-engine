import { defaults, extend } from "@inglorious/utils/data-structures/objects.js"
import { jump } from "@inglorious/utils/physics/jump.js"

const DEFAULT_PARAMS = {
  bounciness: 1,
}

export function bouncy(params) {
  params = extend(DEFAULT_PARAMS, params)

  return (type) =>
    extend(type, {
      create(entity, entityId, api) {
        type.create?.(entity, entityId, api)

        if (entityId !== entity.id) return

        defaults(entity, params)
      },

      land(entity, entityId) {
        if (entity.id === entityId) {
          entity.vy = jump(entity) * entity.bounciness
          entity.groundObject = undefined
        }
      },
    })
}
