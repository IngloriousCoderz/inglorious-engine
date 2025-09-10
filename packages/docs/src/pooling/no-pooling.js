import { add } from "@inglorious/utils/math/linear-algebra/vectors.js"
import { scale } from "@inglorious/utils/math/linear-algebra/vector.js"
import { random } from "@inglorious/utils/math/rng.js"
import { renderCircle } from "@inglorious/renderer-2d/shapes/circle.js"
import { extend } from "@inglorious/utils/data-structures/objects.js"
import { renderText } from "@inglorious/renderer-2d/text.js"
import { renderFps } from "@inglorious/renderer-2d/fps.js"
import { fps } from "@inglorious/engine/behaviors/fps.js"
import { game } from "@inglorious/engine/behaviors/game.js"

let NEXT_ID = 0

function velocity() {
  return (type) =>
    extend(type, {
      update(entity, dt, api) {
        type.update?.(entity, dt, api)

        entity.position = add(entity.position, scale(entity.velocity, dt))
      },
    })
}

function spawning() {
  return (type) =>
    extend(type, {
      start(entity, event, api) {
        for (let i = 0; i < 1000; i++) {
          api.notify("add", {
            id: `asteroid-${NEXT_ID++}`,
            type: "asteroid",
            position: [random(0, 800), 0, random(0, 600)],
            velocity: [random(-50, 50), 0, random(-50, 50)],
            color: getRandomColor(),
          })
        }
      },

      update(entity, dt, api) {
        type.update?.(entity, dt, api)

        const activeAsteroids = Object.values(api.getEntities()).filter(
          (entity) => entity.type === "asteroid",
        )

        if (activeAsteroids.length < 1000) {
          api.notify("add", {
            id: `asteroid-${NEXT_ID++}`,
            type: "asteroid",
            position: [random(0, 800), 0, random(0, 600)],
            velocity: [random(-50, 50), 0, random(-50, 50)],
            color: getRandomColor(),
          })
        }
      },
    })
}

function despawning() {
  return (type) =>
    extend(type, {
      update(entity, dt, api) {
        type.update?.(entity, dt, api)

        const { bounds } = api.getEntity("game")
        const [minX, minY, maxX, maxY] = bounds
        const [x, y, z] = entity.position

        if (
          x < minX ||
          x > maxX ||
          y < minY ||
          y > maxY ||
          z < minY ||
          z > maxY
        ) {
          api.notify("remove", entity.id)
        }
      },
    })
}

export default {
  types: {
    game: [game(), spawning()],

    asteroid: [{ render: renderCircle }, velocity(), despawning()],

    fps: [{ render: renderFps }, fps()],

    activeAsteroids: [
      { render: renderText },
      {
        update(entity, dt, api) {
          const entities = api.getEntities()
          entity.value = `Active asteroids: ${Object.values(entities).filter(({ type }) => type === "asteroid").length}`
        },
      },
    ],
  },

  entities: {
    game: { devMode: true },

    fps: {
      type: "fps",
      position: [0, 0, 600],
      layer: 1,
    },

    activeAsteroids: {
      type: "activeAsteroids",
      position: [0, 0, 572],
      layer: 1,
    },
  },
}

function getRandomColor() {
  const letters = "0123456789ABCDEF"
  let color = "#"
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
