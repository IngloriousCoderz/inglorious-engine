/* eslint-disable no-magic-numbers */
import { findCollision } from "@inglorious/engine/collision/detection"
import { renderRectangle } from "@inglorious/renderer-2d/shapes/rectangle"
import { extend } from "@inglorious/utils/data-structures/objects"
import { choose } from "@inglorious/utils/math/rng"
import { pi } from "@inglorious/utils/math/trigonometry"
import { fromAngle } from "@inglorious/utils/math/vector"

const X = 0
const Z = 2
const REVERSE = -1
const SPEED_INCREASE = 1.03

export const ball = [
  { render: renderRectangle },
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
        entity.orientation = choose(
          (1 / 6) * pi(),
          (5 / 6) * pi(),
          (7 / 6) * pi(),
          (11 / 6) * pi(),
        )
        entity.maxSpeed = entity.initialSpeed
      },

      update(entity, dt, api) {
        type.update?.(entity, dt, api)

        const game = api.getEntity("game")

        entity.velocity = fromAngle(entity.orientation) * entity.maxSpeed

        const [, gameHeight] = game.size
        if (entity.position[Z] < 0 || entity.position[Z] > gameHeight) {
          entity.velocity[Z] *= REVERSE
        }

        const entities = api.getEntities()
        const collidingEntity = findCollision(entity, entities)
        if (collidingEntity) {
          entity.velocity[X] *= SPEED_INCREASE * REVERSE
          const correctionX =
            collidingEntity.position[X] +
            (collidingEntity.size[X] / 2) *
              (entity.velocity[X] < 0 ? REVERSE : 1) -
            entity.position[X]
          entity.position[X] += correctionX
        }

        entity.position += entity.velocity * dt
      },
    }),
]
