import { modernControls } from "@inglorious/engine/behaviors/controls/kinematic/modern"
import { clamped } from "@inglorious/engine/behaviors/physics/clamped"
import { renderRectangle } from "@inglorious/renderer-2d/shapes/rectangle"
import { extend } from "@inglorious/utils/data-structures/objects.js"

export const paddle = [
  { render: renderRectangle },
  modernControls(),
  clamped(),
  (type) =>
    extend(type, {
      create(entity, entityId, api) {
        type.create?.(entity, entityId, api)

        if (entityId !== entity.id) return

        api.notify("reset", entityId)
      },

      reset(entity, entityId) {
        if (entityId != null && entityId !== entity.id) return

        entity.position = entity.initialPosition
      },
    }),
]
