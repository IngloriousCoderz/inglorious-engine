import {
  DEFAULT_TIME_TO_TARGET,
  matchVelocity,
} from "@inglorious/engine/ai/movement/dynamic/match-velocity.js"
import { clamped } from "@inglorious/engine/behaviors/clamped.js"
import {
  controlsEntities,
  setupControls,
} from "@inglorious/engine/behaviors/input/controls.js"
import { renderCharacter } from "@inglorious/renderers/canvas/character.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"

const controls = setupControls()

export default {
  devMode: true,
  types: {
    ...controls.types,

    character: [
      {
        render: renderCharacter,

        moveLeft(entity, { inputId }) {
          if (inputId === entity.associatedInput) entity.movement.left = true
        },
        moveLeftEnd(entity, { inputId }) {
          if (inputId === entity.associatedInput) entity.movement.left = false
        },
        moveRight(entity, { inputId }) {
          if (inputId === entity.associatedInput) entity.movement.right = true
        },
        moveRightEnd(entity, { inputId }) {
          if (inputId === entity.associatedInput) entity.movement.right = false
        },
        moveUp(entity, { inputId }) {
          if (inputId === entity.associatedInput) entity.movement.up = true
        },
        moveUpEnd(entity, { inputId }) {
          if (inputId === entity.associatedInput) entity.movement.up = false
        },
        moveDown(entity, { inputId }) {
          if (inputId === entity.associatedInput) entity.movement.down = true
        },
        moveDownEnd(entity, { inputId }) {
          if (inputId === entity.associatedInput) entity.movement.down = false
        },

        update(entity, dt, api) {
          const parameters = api.getEntity("parameters")
          const { fields } = parameters.groups.matchVelocity
          const SPEED = entity.maxSpeed

          entity.movement ??= {}
          const target = { velocity: [0, 0, 0] }

          if (entity.movement.left) {
            target.velocity[0] = -SPEED
          }
          if (entity.movement.down) {
            target.velocity[2] = -SPEED
          }
          if (entity.movement.right) {
            target.velocity[0] = SPEED
          }
          if (entity.movement.up) {
            target.velocity[2] = SPEED
          }

          merge(
            entity,
            matchVelocity(entity, target, dt, {
              timeToTarget: fields.timeToTarget.value,
            }),
          )
        },
      },
      clamped(),
    ],

    form: {
      fieldChange(entity, { id, value }) {
        entity.groups.matchVelocity.fields[id].value = value
      },
    },
  },

  entities: {
    ...controls.entities,
    ...controlsEntities("input0", {
      ArrowLeft: "moveLeft",
      ArrowRight: "moveRight",
      ArrowDown: "moveDown",
      ArrowUp: "moveUp",
    }),

    character: {
      type: "character",
      associatedInput: "input0",
      maxAcceleration: 1000,
      maxSpeed: 250,
      position: [400, 0, 300],
      collisions: {
        bounds: {
          shape: "circle",
          radius: 12,
        },
      },
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
