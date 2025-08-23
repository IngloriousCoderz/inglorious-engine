import {
  DEFAULT_SLOW_RADIUS,
  DEFAULT_TARGET_RADIUS,
  DEFAULT_TIME_TO_TARGET,
} from "@inglorious/engine/ai/movement/dynamic/align.js"
import { lookWhereYoureGoing } from "@inglorious/engine/ai/movement/dynamic/look-where-youre-going.js"
import {
  controlsEntities,
  setupControls,
} from "@inglorious/engine/behaviors/input/controls.js"
import { clampToBounds } from "@inglorious/engine/physics/bounds.js"
import { renderCharacter } from "@inglorious/renderers/canvas/character.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"
import { sum } from "@inglorious/utils/math/linear-algebra/vectors.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

const controls = setupControls()

export default {
  devMode: true,
  types: {
    ...controls.types,

    character: [
      { render: renderCharacter },
      {
        moveLeft(entity, { id }) {
          if (id === entity.associatedInput) entity.movement.left = true
        },
        moveLeftEnd(entity, { id }) {
          if (id === entity.associatedInput) entity.movement.left = false
        },
        moveRight(entity, { id }) {
          if (id === entity.associatedInput) entity.movement.right = true
        },
        moveRightEnd(entity, { id }) {
          if (id === entity.associatedInput) entity.movement.right = false
        },
        moveUp(entity, { id }) {
          if (id === entity.associatedInput) entity.movement.up = true
        },
        moveUpEnd(entity, { id }) {
          if (id === entity.associatedInput) entity.movement.up = false
        },
        moveDown(entity, { id }) {
          if (id === entity.associatedInput) entity.movement.down = true
        },
        moveDownEnd(entity, { id }) {
          if (id === entity.associatedInput) entity.movement.down = false
        },

        update(entity, dt, api) {
          const parameters = api.getEntity("parameters")
          const game = api.getEntity("game")
          const { fields } = parameters.groups.lookWhereYoureGoing

          entity.movement ??= {}
          const target = { velocity: [0, 0, 0] }

          if (entity.movement.left) {
            target.velocity[0] = -1
          }
          if (entity.movement.down) {
            target.velocity[2] = -1
          }
          if (entity.movement.right) {
            target.velocity[0] = 1
          }
          if (entity.movement.up) {
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
