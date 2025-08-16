import wander, {
  DEFAULT_WANDER_OFFSET,
  DEFAULT_WANDER_RADIUS,
} from "@inglorious/engine/ai/movement/dynamic/wander.js"
import { flip } from "@inglorious/game/bounds.js"
import { enableCharacter } from "@inglorious/game/decorators/character.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

export default {
  types: {
    character: [
      enableCharacter(),
      {
        "game:update"(instance, dt, { instances }) {
          const { parameters, game } = instances
          const { fields } = parameters.groups.wander

          merge(
            instance,
            wander(instance, dt, {
              wanderOffset: fields.wanderOffset.value,
              wanderRadius: fields.wanderRadius.value,
            }),
          )
          flip(instance, game.bounds)
        },
      },
    ],

    form: {
      "field:change"(instance, { id, value }) {
        instance.groups.wander.fields[id].value = value
      },
    },
  },

  instances: {
    character: {
      type: "character",
      maxAcceleration: 1000,
      maxSpeed: 250,
      maxAngularSpeed: pi() / 4,
      position: [400, 0, 300],
    },

    parameters: {
      type: "form",
      position: [800 - 352, 0, 600],
      groups: {
        wander: {
          title: "Dynamic Wander",
          fields: {
            wanderOffset: {
              label: "Wander Offset",
              inputType: "number",
              defaultValue: DEFAULT_WANDER_OFFSET,
            },
            wanderRadius: {
              label: "Wander Radius",
              inputType: "number",
              step: 0.1,
              defaultValue: DEFAULT_WANDER_RADIUS,
            },
          },
        },
      },
    },
  },
}
