import {
  DEFAULT_TIME_TO_TARGET,
  matchVelocity,
} from "@inglorious/engine/ai/movement/dynamic/match-velocity.js"
import {
  controlsEntities,
  controlsTypes,
} from "@inglorious/engine/behaviors/input/controls.js"
import { clampToBounds } from "@inglorious/engine/physics/bounds.js"
import { renderCharacter } from "@inglorious/ui/canvas/character.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"

export default {
  types: {
    ...controlsTypes(),

    character: [
      { render: renderCharacter },
      {
        update(entity, dt, { entities }) {
          const { parameters, input0, game } = entities
          const { fields } = parameters.groups.matchVelocity
          const SPEED = entity.maxSpeed

          const target = { velocity: [0, 0, 0] }
          if (input0.left) {
            target.velocity[0] = -SPEED
          }
          if (input0.down) {
            target.velocity[2] = -SPEED
          }
          if (input0.right) {
            target.velocity[0] = SPEED
          }
          if (input0.up) {
            target.velocity[2] = SPEED
          }

          merge(
            entity,
            matchVelocity(entity, target, dt, {
              timeToTarget: fields.timeToTarget.value,
            }),
          )

          clampToBounds(entity, game.bounds)
        },
      },
    ],

    form: {
      fieldChange(entity, { id, value }) {
        entity.groups.matchVelocity.fields[id].value = value
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
      maxAcceleration: 1000,
      maxSpeed: 250,
      position: [400, 0, 300],
    },

    parameters: {
      type: "form",
      position: [800 - 328, 0, 600],
      groups: {
        matchVelocity: {
          title: "Match Velocity",
          fields: {
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
