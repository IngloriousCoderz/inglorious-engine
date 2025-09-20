import { to2D } from "@inglorious/utils/math/vector.js"

import { absolutePosition } from "./absolute-position.js"

const ORIGIN = 0
const DEFAULT_ZOOM = 1
const HALF = 2

const DEFAULT_LAYER = 0
const Y = 1
const Z = 2

export function renderingSystem(canvas) {
  const ctx = canvas.getContext("2d")

  return {
    update(state, dt, api) {
      const types = api.getTypes()
      const { game, ...worldEntities } = state.entities

      // 1. Clear canvas
      const [gameWidth, gameHeight] = game.size
      ctx.fillStyle = game.backgroundColor || "lightgrey"
      ctx.fillRect(ORIGIN, ORIGIN, gameWidth, gameHeight)

      // 2. Find active camera
      const camera = Object.values(state.entities).find(
        (entity) => entity.type === "camera" && entity.isActive,
      )

      // 3. Render world entities with camera transform
      ctx.save()

      if (camera && !game.devMode) {
        const [cameraX, cameraZ] = to2D(camera.position)
        const zoom = camera.zoom ?? DEFAULT_ZOOM

        // Center the view on the camera and apply zoom.
        // The order of operations is crucial here.
        ctx.translate(gameWidth / HALF, gameHeight / HALF)
        ctx.scale(zoom, zoom)
        // This vertical translation compensates for the coordinate system flip
        // that happens inside the absolutePosition decorator.
        ctx.translate(ORIGIN, -gameHeight)
        // This translation moves the world relative to the camera.
        ctx.translate(-cameraX, cameraZ)
      }

      Object.values(worldEntities)
        .concat(api.getAllActivePoolEntities())
        .filter(({ position }) => position)
        .toSorted(
          (a, b) =>
            (a.layer ?? DEFAULT_LAYER) - (b.layer ?? DEFAULT_LAYER) ||
            a.position[Y] - b.position[Y] ||
            b.position[Z] - a.position[Z],
        )
        .forEach((entity) => {
          const type = types[entity.type]
          const { render } = type
          if (render) {
            absolutePosition(render)(entity, ctx, { api })
          }
        })

      ctx.restore()
    },
  }
}
