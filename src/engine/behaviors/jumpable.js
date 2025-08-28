import { findCollision } from "@inglorious/engine/collision/detection.js"
import { extend } from "@inglorious/utils/data-structures/objects.js"
import {
  angle,
  magnitude,
  zero,
} from "@inglorious/utils/math/linear-algebra/vector.js"
import { applyGravity } from "@inglorious/utils/physics/gravity.js"
import { jump } from "@inglorious/utils/physics/jump.js"

const DEFAULT_PARAMS = {
  maxSpeed: 250,
  maxJump: 100,
  maxLeap: 100,
  maxJumps: 1,
}

const DOUBLE = 2
const HALF = 2
const X = 0
const Y = 1
const NO_VELOCITY = 0
const NO_PENETRAION = 0

export function jumpable(params) {
  params = extend(DEFAULT_PARAMS, params)

  return (type) =>
    extend(type, {
      start(entity, api) {
        type.start?.(entity, api)

        entity.maxSpeed ??= params.maxSpeed
        entity.maxJump ??= params.maxJump
        entity.maxLeap ??= params.maxLeap
        entity.maxJumps ??= params.maxJumps
        entity.jumpsLeft ??= entity.maxJumps

        entity.velocity ??= zero()
        entity.vy ??= 0
      },

      jump(entity, { entityId }) {
        if (entityId === entity.id && entity.jumpsLeft) {
          entity.vy = jump(entity)
          entity.groundObject = undefined
          entity.jumpsLeft--
        }
      },

      update(entity, dt, api) {
        type.update?.(entity, dt, api)

        const entities = api.getEntities()

        entity.collisions ??= {}
        entity.collisions.platform ??= {}
        entity.collisions.platform.shape ??= "rectangle"

        let width, height
        if (entity.collisions.platform.shape === "circle") {
          width = entity.collisions.platform.radius * DOUBLE
          height = entity.collisions.platform.radius * DOUBLE
        } else {
          ;[width, height] = entity.size
        }
        const [prevX, prevY] = [...entity.position]

        // 1. HORIZONTAL MOVEMENT & RESOLUTION
        entity.position[X] += entity.velocity[X] * dt
        const entityLeft = entity.position[X] - width / HALF
        const entityRight = entity.position[X] + width / HALF

        const collisionX = findCollision(entity, entities, "platform")
        if (collisionX) {
          const vx = entity.velocity[X]

          // Check if moving right and crossing the platform's left edge
          const prevRight = prevX + width / HALF
          const platformLeft =
            collisionX.position[X] - collisionX.size[X] / HALF
          if (vx > NO_VELOCITY && prevRight <= platformLeft) {
            const penetration = entityRight - platformLeft
            if (penetration > NO_PENETRAION) entity.position[X] -= penetration
            entity.velocity[X] = 0
          }

          // Check if moving left and crossing the platform's right edge
          const prevLeft = prevX - width / HALF
          const platformRight =
            collisionX.position[X] + collisionX.size[X] / HALF
          if (vx < NO_VELOCITY && prevLeft >= platformRight) {
            const penetration = platformRight - entityLeft
            if (penetration > NO_PENETRAION) entity.position[X] += penetration
            entity.velocity[X] = 0
          }
        }

        // 2. VERTICAL MOVEMENT & RESOLUTION
        const { vy, position: nextGravityPosition } = applyGravity(entity, dt)
        entity.vy = vy
        entity.position[Y] = nextGravityPosition[Y]

        entity.groundObject = undefined

        const collisionY = findCollision(entity, entities, "platform")
        if (collisionY) {
          const prevBottom = prevY - height / HALF
          const platformTop = collisionY.position[Y] + collisionY.size[Y] / HALF

          // Landing on top of a platform (one-way platform logic)
          if (entity.vy <= NO_VELOCITY && prevBottom >= platformTop) {
            const entityBottom = entity.position[Y] - height / HALF
            const penetration = platformTop - entityBottom
            if (penetration > NO_PENETRAION) entity.position[Y] += penetration
            entity.vy = 0
            entity.groundObject = collisionY
            entity.jumpsLeft = entity.maxJumps
            api.notify("landed", {
              entityId: entity.id,
              targetId: collisionY.id,
            })
          }

          // Hitting head on bottom of a platform
          // else if (entity.vy > 0) {
          //   const prevTop = prevY + height / HALF
          //   const platformBottom =
          //     collisionY.position[Y] - collisionY.size[Y] / HALF
          //   if (prevTop <= platformBottom) {
          //     const entityTop = entity.position[Y] + height / HALF
          //     const penetration = entityTop - platformBottom
          //     if (penetration > 0) entity.position[Y] -= penetration
          //     entity.vy = 0
          //   }
          // }
        }

        entity.orientation = magnitude(entity.velocity)
          ? angle(entity.velocity)
          : entity.orientation
      },
    })
}
