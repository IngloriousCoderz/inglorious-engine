import { findCollision } from "@inglorious/engine/collision/detection.js"
import { clampToBounds } from "@inglorious/game/bounds.js"
import draw from "@inglorious/ui/canvas/mouse.js"

const NO_Y = 0

export function enableMouse() {
  return {
    draw,

    "mouse:move"(instance, event, { instances }) {
      instance.position = event.payload

      clampToBounds(instance, instances.game.bounds)
    },

    "mouse:click"(instance, event, options) {
      const { notify } = options

      const clickedInstance = findCollision(instance, options)
      if (clickedInstance) {
        notify({ id: "instance:click", payload: clickedInstance.id })
      } else {
        notify({ id: "scene:click", payload: event.payload })
      }
    },
  }
}

export function track(parent, options) {
  const handleMouseMove = createHandler("mouse:move", parent, options)
  const handleClick = createHandler("mouse:click", parent, options)

  return { onMouseMove: handleMouseMove, onClick: handleClick }
}

function createHandler(id, parent, { notify }) {
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

    notify({ id, payload })
  }
}

function calculatePosition({ clientX, clientY, parent }) {
  const bounds = parent.getBoundingClientRect()

  const scaleX = (parent.width || parent.clientWidth) / bounds.width
  const scaleY = (parent.height || parent.clientHeight) / bounds.height

  const x = (clientX - bounds.left) * scaleX
  const z = (bounds.bottom - clientY) * scaleY

  return [x, NO_Y, z]
}
