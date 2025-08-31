import { arrive } from "@inglorious/engine/ai/movement/dynamic/arrive.js"
import { camera } from "@inglorious/engine/behaviors/camera.js"
import { mouse } from "@inglorious/engine/behaviors/input/mouse.js"
import { renderCamera } from "@inglorious/renderers/canvas/camera.js"
import { renderCharacter } from "@inglorious/renderers/canvas/character.js"
import { renderMouse } from "@inglorious/renderers/canvas/mouse.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"

export default {
  types: {
    mouse: [{ render: renderMouse }, mouse()],

    character: {
      render: renderCharacter,
      update(entity, dt, api) {
        const mouse = api.getEntity("mouse")
        merge(entity, arrive(entity, mouse, dt))
      },
    },

    camera: [{ render: renderCamera }, camera()],
  },

  entities: {
    game: {
      type: "game",
      devMode: true,
    },

    mouse: {
      type: "mouse",
      position: [0, 0, 0],
    },

    player: {
      id: "player",
      type: "character",
      maxSpeed: 250,
      position: [0, 0, 0],
    },

    camera: {
      type: "camera",
      isActive: true,
      targetId: "player",
      maxSpeed: 150, // Slower than player for a smooth follow
      position: [0, 0, 0],
      zoom: 1.5,
      minZoom: 0.5,
      maxZoom: 4,
      zoomSpeed: 0.05,
      size: [400, 300], // Camera viewport size
      // for dev mode rectangle
      color: "red",
      backgroundColor: "rgba(255, 0, 0, 0.1)",
    },
  },
}
