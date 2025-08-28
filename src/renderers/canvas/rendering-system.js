import { absolutePosition } from "./absolute-position.js"

const Y = 1
const Z = 2

export function createRenderingSystem(ctx) {
  return {
    update(state, dt, api) {
      const types = api.getTypes()
      const { game, mouse, ...rest } = state.entities

      const [x, y, width, height] = game.bounds
      ctx.fillStyle = "lightgrey"
      ctx.fillRect(x, y, width, height)

      Object.values(rest)
        .filter(({ position }) => position)
        .toSorted(
          (a, b) =>
            a.layer - b.layer ||
            a.position[Y] - b.position[Y] ||
            b.position[Z] - a.position[Z],
        )
        .forEach((entity) => {
          const { render } = types[entity.type]
          if (render) {
            absolutePosition(render)(entity, ctx, { api })
          }
        })

      mouse && absolutePosition(types[mouse.type].render)(mouse, ctx, { api })
    },
  }
}
