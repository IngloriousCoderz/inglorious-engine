import {
  align,
  DEFAULT_SLOW_RADIUS,
  DEFAULT_TARGET_RADIUS,
  DEFAULT_TIME_TO_TARGET,
} from "@inglorious/engine/ai/movement/dynamic/align.js"
import {
  controlsEntities,
  controlsTypes,
} from "@inglorious/engine/behaviors/input/controls.js"
import { mouse } from "@inglorious/engine/behaviors/input/mouse.js"
import { clampToBounds } from "@inglorious/engine/physics/bounds.js"
import { renderCharacter } from "@inglorious/renderers/canvas/character.js"
import { renderMouse } from "@inglorious/renderers/canvas/mouse.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"
import { clamp } from "@inglorious/utils/math/numbers.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

export default {
  devMode: true,
  types: {
    mouse: [
      { render: renderMouse },
      mouse(),
      {
        fieldChange(entity, { id, value }) {
          if (id === "targetOrientation") {
            entity.orientation = -value * pi()
          }
        },
        turnLeft(entity, { id }) {
          if (id !== entity.associatedInput) return
          entity.turningLeft = true
        },
        turnLeftEnd(entity, { id }) {
          if (id !== entity.associatedInput) return
          entity.turningLeft = false
        },
        turnRight(entity, { id }) {
          if (id !== entity.associatedInput) return
          entity.turningRight = true
        },
        turnRightEnd(entity, { id }) {
          if (id !== entity.associatedInput) return
          entity.turningRight = false
        },
        update(entity, dt) {
          if (entity.turningLeft) {
            entity.orientation += 5 * dt
          } else if (entity.turningRight) {
            entity.orientation -= 5 * dt
          }
          entity.orientation = clamp(entity.orientation, -pi(), pi())
        },
      },
    ],

    ...controlsTypes(),

    character: [
      { render: renderCharacter },
      {
        update(entity, dt, api) {
          const mouse = api.getEntity("mouse")
          const parameters = api.getEntity("parameters")
          const game = api.getEntity("game")
          const { fields } = parameters.groups.align

          merge(
            entity,
            align(entity, mouse, dt, {
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
        entity.groups.align.fields[id].value = value
      },
    },
  },

  entities: {
    mouse: {
      type: "mouse",
      associatedInput: "input0",
      position: [400, 0, 300],
      orientation: 0,
    },

    ...controlsEntities("input0", {
      ArrowLeft: "turnLeft",
      ArrowRight: "turnRight",
      ArrowDown: "turnRight",
      ArrowUp: "turnLeft",
    }),

    character: {
      type: "character",
      maxAngularSpeed: pi() / 4,
      maxAngularAcceleration: 10,
      position: [400, 0, 300],
    },

    parameters: {
      type: "form",
      position: [800 - 328, 0, 600],
      groups: {
        align: {
          title: "Dynamic Align",
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
            targetOrientation: {
              label: "Target Orientation",
              inputType: "number",
              step: 0.25,
              min: -1,
              max: 1,
              defaultValue: 0,
            },
          },
        },
      },
    },
  },
}
