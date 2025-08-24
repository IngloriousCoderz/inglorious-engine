import {
  DEFAULT_TIME_TO_TARGET,
  matchVelocity,
} from "@inglorious/engine/ai/movement/dynamic/match-velocity.js"
import {
  controlsEntities,
  setupControls,
} from "@inglorious/engine/behaviors/input/controls.js"
import { clampToBounds } from "@inglorious/engine/physics/bounds.js"
import { renderCharacter } from "@inglorious/renderers/canvas/character.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"

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

          merge(entity, { position: clampToBounds(entity, game.bounds) })
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
