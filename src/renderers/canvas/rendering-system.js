import { to2D } from "@inglorious/utils/math/linear-algebra/2d.js"

import { absolutePosition } from "./absolute-position.js"

const ORIGIN = 0
const DEFAULT_ZOOM = 1
const HALF = 2

const Y = 1
const Z = 2

function getRenderFunction(types, entity) {
  const typeInfo = types[entity.type]
  if (!typeInfo) {
    return null
  }

  // A type can be a single object or an array of behaviors
  const behaviorWithRender = Array.isArray(typeInfo)
    ? typeInfo.find((b) => b.render)
    : typeInfo

  return behaviorWithRender?.render
}

export function createRenderingSystem(ctx) {
  return {
    update(state, dt, api) {
      const types = api.getTypes()
      const { game, mouse, ...worldEntities } = state.entities

      // 1. Clear canvas
      const [, , width, height] = game.bounds
      ctx.fillStyle = game.backgroundColor || "lightgrey"
      ctx.fillRect(ORIGIN, ORIGIN, width, height)

      // 2. Find active camera
      const camera = Object.values(state.entities).find(
        (entity) => entity.type === "camera" && entity.isActive,
      )

      // 3. Render world entities with camera transform
      ctx.save()

      if (camera && !game.devMode) {
        const [cameraX, cameraZ] = to2D(camera.position)
        const zoom = camera.zoom ?? DEFAULT_ZOOM

        // Center the view on the camera and apply zoom
        ctx.translate(width / HALF, height / HALF)
        ctx.scale(zoom, zoom)
        ctx.translate(-cameraX, -cameraZ)
      }

      Object.values(worldEntities)
        .filter(({ position }) => position)
        .toSorted(
          (a, b) =>
            a.layer - b.layer ||
            a.position[Y] - b.position[Y] ||
            b.position[Z] - a.position[Z],
        )
        .forEach((entity) => {
          const render = getRenderFunction(types, entity)
          if (render) {
            absolutePosition(render)(entity, ctx, { api })
          }
        })

      ctx.restore()

      // 4. Render UI entities (like mouse) in screen space
      if (mouse) {
        const render = getRenderFunction(types, mouse)
        render && absolutePosition(render)(mouse, ctx, { api })
      }
    },
  }
}
