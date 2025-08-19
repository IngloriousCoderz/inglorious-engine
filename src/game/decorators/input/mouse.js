import { findCollision } from "@inglorious/engine/collision/detection.js"
import { clampToBounds } from "@inglorious/game/bounds.js"
import draw from "@inglorious/ui/canvas/mouse.js"

const NO_Y = 0

export function enableMouse() {
  return {
    draw,

    "mouse:move"(instance, position, { instances }) {
      instance.position = position

      const { game } = instances
      clampToBounds(instance, game.bounds)
    },

    "mouse:click"(instance, position, options) {
      const { notify } = options

      const clickedInstance = findCollision(instance, options)
      if (clickedInstance) {
        notify("instance:click", clickedInstance.id)
      } else {
        notify("scene:click", position)
      }
    },
  }
}

export function track(parent, options) {
  const handleMouseMove = createHandler("mouse:move", parent, options)
  const handleClick = createHandler("mouse:click", parent, options)

  return { onMouseMove: handleMouseMove, onClick: handleClick }
}

function createHandler(type, parent, { notify }) {
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

    notify(type, payload)
  }
}

function calculatePosition({ clientX, clientY, parent }) {
  const bounds = parent.getBoundingClientRect()

  const x = clientX - bounds.left
  const z = bounds.bottom - clientY

  return [x, NO_Y, z]
}
