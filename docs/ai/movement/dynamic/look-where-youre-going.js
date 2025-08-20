import {
  DEFAULT_SLOW_RADIUS,
  DEFAULT_TARGET_RADIUS,
  DEFAULT_TIME_TO_TARGET,
} from "@inglorious/engine/ai/movement/dynamic/align.js"
import { lookWhereYoureGoing } from "@inglorious/engine/ai/movement/dynamic/look-where-youre-going.js"
import {
  controlsEntities,
  controlsTypes,
} from "@inglorious/engine/behaviors/input/controls.js"
import { clampToBounds } from "@inglorious/engine/physics/bounds.js"
import { renderCharacter } from "@inglorious/ui/canvas/character.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"
import { sum } from "@inglorious/utils/math/linear-algebra/vectors.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

export default {
  types: {
    ...controlsTypes(),

    character: [
      { render: renderCharacter },
      {
        update(entity, dt, { entities }) {
          const { parameters, game } = entities
          const { fields } = parameters.groups.lookWhereYoureGoing

          const { input0 } = entities

          const target = { velocity: [0, 0, 0] }
          if (input0.left) {
            target.velocity[0] = -1
          }
          if (input0.down) {
            target.velocity[2] = -1
          }
          if (input0.right) {
            target.velocity[0] = 1
          }
          if (input0.up) {
            target.velocity[2] = 1
          }

          merge(entity, {
            velocity: target.velocity,
            position: sum(entity.position, target.velocity),
          })

          merge(
            entity,
            lookWhereYoureGoing(entity, dt, {
              targetRadius: fields.targetRadius.value,
              slowRadius: fields.slowRadius.value,
              timeToTarget: fields.timeToTarget.value,
            }),
          )

          clampToBounds(entity, game.bounds)
        },
      },
    ],

    form: {
      fieldChange(entity, { id, value }) {
        entity.groups.lookWhereYoureGoing.fields[id].value = value
      },
    },
  },

  entities: {
    ...controlsEntities("input0", {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowDown: "down",
      ArrowUp: "up",
    }),

    character: {
      type: "character",
      maxAngularAcceleration: 1000,
      maxAngularSpeed: pi() / 4,
      position: [400, 0, 300],
    },

    parameters: {
      type: "form",
      position: [800 - 328, 0, 600],
      groups: {
        lookWhereYoureGoing: {
          title: "Look Where You're Going",
          fields: {
            targetRadius: {
              label: "Target Radius",
              inputType: "number",
              defaultValue: DEFAULT_TARGET_RADIUS,
            },
            slowRadius: {
              label: "Slow Radius",
              inputType: "number",
              defaultValue: DEFAULT_SLOW_RADIUS,
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
