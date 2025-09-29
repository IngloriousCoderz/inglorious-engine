/* eslint-disable no-magic-numbers */
import { findCollision } from "@inglorious/engine/collision/detection"
import { renderRectangle } from "@inglorious/renderer-2d/shapes/rectangle"
import { choose, random } from "@inglorious/utils/math/rng"
import { pi } from "@inglorious/utils/math/trigonometry"
import { fromAngle } from "@inglorious/utils/math/vector"

const X = 0
const Z = 2
const REVERSE = -1
const SPEED_INCREASE = 1.03

export const ball = {
  render: renderRectangle,

  create(entity, entityId) {
    if (entityId !== entity.id) return

    entity.initialSpeed = entity.maxSpeed
    entity.initialPosition = entity.position
  },

  serve(entity, servingPlayer) {
    entity.position = entity.initialPosition
    entity.maxSpeed = entity.initialSpeed

    switch (servingPlayer) {
      case "player1":
        entity.orientation = choose((-1 / 6) * pi(), (1 / 6) * pi())
        break

      case "player2":
        entity.orientation = choose((5 / 6) * pi(), (7 / 6) * pi())
        break
    }
  },

  update(entity, dt, api) {
    const game = api.getEntity("game")
    if (game.state !== "play") return

    const [gameWidth, gameHeight] = game.size

    if (entity.position[X] < 0 || entity.position[X] > gameWidth) {
      api.notify("soundPlay", "score")

      if (entity.position[X] < 0) {
        api.notify("playerScore", "player2")
      }

      if (entity.position[X] > gameWidth) {
        api.notify("playerScore", "player1")
      }
      return
    }

    if (entity.position[Z] < 0 || entity.position[Z] > gameHeight) {
      api.notify("soundPlay", "wallHit")

      entity.orientation *= REVERSE
    }

    const entities = api.getEntities()
    const collidingEntity = findCollision(entity, entities)
    if (collidingEntity) {
      api.notify("soundPlay", "paddleHit")

      const paddleHalfWidth = collidingEntity.size[X] / 2
      const ballHalfWidth = entity.size[X] / 2

      const isMovingLeft = entity.velocity[X] < 0

      let targetX
      if (isMovingLeft) {
        entity.orientation = random((-1 / 6) * pi(), (1 / 6) * pi())
        targetX = collidingEntity.position[X] + paddleHalfWidth + ballHalfWidth
      } else {
        entity.orientation = random((5 / 6) * pi(), (7 / 6) * pi())
        targetX = collidingEntity.position[X] - paddleHalfWidth - ballHalfWidth
      }

      entity.position[X] = targetX
      entity.maxSpeed *= SPEED_INCREASE
    }

    entity.velocity = fromAngle(entity.orientation) * entity.maxSpeed
    entity.position += entity.velocity * dt
  },
}
