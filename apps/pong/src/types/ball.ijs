/* eslint-disable no-magic-numbers */
import { findCollision } from "@inglorious/engine/collision/detection"
import { renderRectangle } from "@inglorious/renderer-2d/shapes/rectangle"
import { extend } from "@inglorious/utils/data-structures/objects"
import { choose, random } from "@inglorious/utils/math/rng"
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
        entity.maxSpeed = entity.initialSpeed
        entity.orientation = choose(
          (1 / 6) * pi(),
          (5 / 6) * pi(),
          (7 / 6) * pi(),
          (11 / 6) * pi(),
        )
      },

      update(entity, dt, api) {
        type.update?.(entity, dt, api)

        entity.velocity = fromAngle(entity.orientation) * entity.maxSpeed

        const game = api.getEntity("game")
        const [gameWidth, gameHeight] = game.size

        if (entity.position[X] < 0 || entity.position[X] > gameWidth) {
          if (entity.position[X] < 0) {
            api.notify("playerScore", "player2")
          }

          if (entity.position[X] > gameWidth) {
            api.notify("playerScore", "player1")
          }

          api.notify("reset")
        }

        if (entity.position[Z] < 0 || entity.position[Z] > gameHeight) {
          entity.orientation *= REVERSE
        }

        const entities = api.getEntities()
        const collidingEntity = findCollision(entity, entities)
        if (collidingEntity) {
          const paddleHalfWidth = collidingEntity.size[X] / 2
          const ballHalfWidth = entity.size[X] / 2

          const isMovingLeft = entity.velocity[X] < 0

          let targetX
          if (isMovingLeft) {
            entity.orientation = random((-1 / 6) * pi(), (1 / 6) * pi())
            targetX =
              collidingEntity.position[X] + paddleHalfWidth + ballHalfWidth
          } else {
            entity.orientation = random((5 / 6) * pi(), (7 / 6) * pi())
            targetX =
              collidingEntity.position[X] - paddleHalfWidth - ballHalfWidth
          }

          entity.position[X] = targetX
          entity.maxSpeed *= SPEED_INCREASE
        }

        entity.velocity = fromAngle(entity.orientation) * entity.maxSpeed
        entity.position += entity.velocity * dt
      },
    }),
]
