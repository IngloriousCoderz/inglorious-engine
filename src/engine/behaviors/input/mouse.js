import { findCollision } from "@inglorious/engine/collision/detection.js"
import { clampToBounds } from "@inglorious/engine/physics/bounds.js"

const NO_Y = 0

export function mouse() {
  return {
    mouseMove(entity, position, api) {
      const game = api.getEntity("game")

      entity.position = position

      clampToBounds(entity, game.bounds)
    },

    mouseClick(entity, position, api) {
      const clickedEntity = findCollision(entity, { api })
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

  return { onMouseMove: handleMouseMove, onClick: handleClick }
}

function createHandler(type, parent, { notify, dispatch }) {
  return (event) => {
    event.stopPropagation()

    if (parent == null) {
      return
    }

    const payload = calculatePosition({
      clientX: event.clientX,
      clientY: event.clientY,
      parent,
    })

    notify?.(type, payload)
    dispatch?.({ type, payload })
  }
}

function calculatePosition({ clientX, clientY, parent }) {
  const bounds = parent.getBoundingClientRect()

  const x = clientX - bounds.left
  const z = bounds.bottom - clientY

  return [x, NO_Y, z]
}
