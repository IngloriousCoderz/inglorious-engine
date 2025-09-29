import { findCollision } from "@inglorious/engine/collision/detection.js"
import { clampToBounds } from "@inglorious/engine/physics/bounds.js"
import { magnitude, zero } from "@inglorious/utils/math/vector.js"
import { subtract } from "@inglorious/utils/math/vectors.js"
import { v } from "@inglorious/utils/v.js"

const NO_Y = 0
const MOVEMENT_THRESHOLD = 5
const HALF = 2

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

export function trackTouch(parent, api) {
  const handleTouchStart = createHandler("touchStart", parent, api)
  const handleTouchMove = createHandler("touchMove", parent, api)
  const handleTouchEnd = createHandler("touchEnd", parent, api)

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

function createHandler(type, parent, api) {
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

    const payload = calculatePosition(event, parent, api)
    api.notify(type, payload)
  }
}

function calculatePosition(event, parent, api) {
  const [touch] = event.touches
  const { clientX, clientY } = touch
  const {
    left,
    bottom,
    width: canvasWidth,
    height: canvasHeight,
  } = parent.getBoundingClientRect()

  const x = clientX - left
  const y = bottom - clientY

  const game = api.getEntity("game")
  const [gameWidth, gameHeight] = game.size

  const scaleX = canvasWidth / gameWidth
  const scaleY = canvasHeight / gameHeight
  const scale = Math.min(scaleX, scaleY)

  const scaledGameWidth = gameWidth * scale
  const scaledGameHeight = gameHeight * scale

  const offsetX = (canvasWidth - scaledGameWidth) / HALF
  const offsetY = (canvasHeight - scaledGameHeight) / HALF

  const gameX = (x - offsetX) / scale
  const gameY = (y - offsetY) / scale

  return v(gameX, NO_Y, gameY)
}
