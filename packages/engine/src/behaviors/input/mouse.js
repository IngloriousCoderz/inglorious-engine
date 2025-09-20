import { findCollision } from "@inglorious/engine/collision/detection.js"
import { clampToBounds } from "@inglorious/engine/physics/bounds.js"
import { zero } from "@inglorious/utils/math/linear-algebra/vector.js"

const DEFAULT_PARAMS = {
  name: "mouse",
}

const NO_Y = 0

export function mouse() {
  return {
    create(entity, entityId) {
      if (entityId !== entity.id) return

      entity.collisions ??= {}
      entity.collisions.bounds ??= { shape: "point" }
    },

    mouseMove(entity, position, api) {
      const game = api.getEntity("game")

      entity.position = position

      clampToBounds(entity, game.size)
    },

    mouseClick(entity, position, api) {
      const entities = api.getEntities()
      const clickedEntity = findCollision(entity, entities)
      if (clickedEntity) {
        api.notify("entityClick", clickedEntity.id)
      } else {
        api.notify("sceneClick", position)
      }
    },
  }
}

export function track(parent, options) {
  const handleMouseMove = createHandler("mouseMove", parent, options)
  const handleClick = createHandler("mouseClick", parent, options)
  const handleWheel = createHandler("mouseWheel", parent, options)

  return {
    onMouseMove: handleMouseMove,
    onClick: handleClick,
    onWheel: handleWheel,
  }
}

export function createMouse(name = DEFAULT_PARAMS.name, overrides = {}) {
  return {
    id: name,
    type: "mouse",
    layer: 999, // A high layer value to ensure it's always rendered on top
    position: zero(),
    ...overrides,
  }
}

function createHandler(type, parent, api) {
  return (event) => {
    event.stopPropagation()

    if (parent == null) {
      return
    }

    // For wheel events, the payload is different from other mouse events.
    if (type === "mouseWheel") {
      api.notify(type, { deltaY: event.deltaY })
      return
    }

    // For move and click events, the payload is the calculated position.
    const payload = calculatePosition(event, parent)
    api.notify(type, payload)
  }
}

function calculatePosition(event, parent) {
  const { clientX, clientY } = event
  const { left, bottom } = parent.getBoundingClientRect()

  const x = clientX - left
  const z = bottom - clientY

  return [x, NO_Y, z]
}
