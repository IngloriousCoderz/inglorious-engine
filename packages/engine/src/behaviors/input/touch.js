import { findCollision } from "@inglorious/engine/collision/detection.js"
import { clampToBounds } from "@inglorious/engine/physics/bounds.js"
import { magnitude, zero } from "@inglorious/utils/math/vector.js"
import { subtract } from "@inglorious/utils/math/vectors.js"
import { v } from "@inglorious/utils/v.js"

const MOVEMENT_THRESHOLD = 5

export function touch() {
  return {
    create(entity, entityId) {
      if (entityId !== entity.id) return

      entity.collisions ??= {}
      entity.collisions.bounds ??= { shape: "point" }
    },

    touchStart(entity, position) {
      entity.isSwiping = false
      entity.position = position
    },

    touchMove(entity, position, api) {
      const game = api.getEntity("game")

      const delta = subtract(position, entity.position)

      if (magnitude(delta) > MOVEMENT_THRESHOLD) {
        entity.isSwiping = true
      }

      entity.position = position

      clampToBounds(entity, game.size)
    },

    touchEnd(entity, _, api) {
      if (entity.isSwiping) {
        api.notify("swipe", v(...entity.position))
        entity.isSwiping = false
        return
      }

      const entities = api.getEntities()
      const clickedEntity = findCollision(entity, entities)
      if (clickedEntity) {
        api.notify("entityTouch", clickedEntity.id)
      } else {
        api.notify("sceneTouch", v(...entity.position))
      }
    },
  }
}

export function trackTouch(parent, api, toGamePosition) {
  const handleTouchStart = createHandler(
    "touchStart",
    parent,
    api,
    toGamePosition,
  )
  const handleTouchMove = createHandler(
    "touchMove",
    parent,
    api,
    toGamePosition,
  )
  const handleTouchEnd = createHandler("touchEnd", parent, api, toGamePosition)

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  }
}

export function createTouch(overrides = {}) {
  return {
    type: "touch",
    layer: 999, // A high layer value to ensure it's always rendered on top
    position: zero(),
    ...overrides,
  }
}

function createHandler(type, parent, api, toGamePosition) {
  return (event) => {
    event.preventDefault()
    event.stopPropagation()

    if (parent == null) {
      return
    }

    if (type === "touchEnd") {
      api.notify(type)
      return
    }

    const [touch] = event.touches
    const { clientX, clientY } = touch

    const payload = toGamePosition(clientX, clientY)
    api.notify(type, payload)
  }
}
