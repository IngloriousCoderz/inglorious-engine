import {
  DEFAULT_TARGET_RADIUS,
  DEFAULT_TIME_TO_TARGET,
} from "@inglorious/engine/ai/movement/kinematic/align.js"
import { face } from "@inglorious/engine/ai/movement/kinematic/face.js"
import { mouse } from "@inglorious/engine/behaviors/input/mouse.js"
import { clampToBounds } from "@inglorious/engine/physics/bounds.js"
import { renderCharacter } from "@inglorious/ui/canvas/character.js"
import { renderMouse } from "@inglorious/ui/canvas/mouse.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

export default {
  types: {
    mouse: [{ render: renderMouse }, mouse()],

    character: [
      { render: renderCharacter },
      {
        update(entity, dt, { entities }) {
          const { mouse, parameters, game } = entities
          const { fields } = parameters.groups.face

          merge(
            entity,
            face(entity, mouse, dt, {
              targetRadius: fields.targetRadius.value,
              timeToTarget: fields.timeToTarget.value,
            }),
          )

          clampToBounds(entity, game.bounds)
        },
      },
    ],

    form: {
      fieldChange(entity, { id, value }) {
        entity.groups.face.fields[id].value = value
      },
    },
  },

  entities: {
    mouse: {
      type: "mouse",
      position: [400, 0, 300],
    },

    character: {
      type: "character",
      maxAngularSpeed: pi() / 4,
      maxAngularAcceleration: 1000,
      position: [400, 0, 300],
    },

    parameters: {
      type: "form",
      position: [800 - 328, 0, 600],
      groups: {
        face: {
          title: "Face",
          fields: {
            targetRadius: {
              label: "Target Radius",
              inputType: "number",
              step: 0.1,
              defaultValue: DEFAULT_TARGET_RADIUS,
            },
            timeToTarget: {
              label: "Time To Target",
              inputType: "number",
              step: 0.1,
              defaultValue: DEFAULT_TIME_TO_TARGET,
            },
          },
        },
      },
    },
  },
}
