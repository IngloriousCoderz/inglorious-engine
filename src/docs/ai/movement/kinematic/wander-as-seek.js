import wanderAsSeek, {
  DEFAULT_WANDER_RADIUS,
} from "@inglorious/engine/ai/movement/kinematic/wander-as-seek.js"
import { flip } from "@inglorious/game/bounds.js"
import { enableCharacter } from "@inglorious/game/decorators/character.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

export default {
  types: {
    character: [
      enableCharacter(),
      {
        "game:update"(instance, event, { dt, config, instances }) {
          const { fields } = instances.parameters.groups.wanderAsSeek

          merge(
            instance,
            wanderAsSeek(instance, {
              dt,
              wanderRadius: fields.wanderRadius.value,
            }),
          )
          flip(instance, config.bounds)
        },
      },
    ],

    form: {
      "field:change"(instance, event) {
        const { id, value } = event.payload
        instance.groups.wanderAsSeek.fields[id].value = value
      },
    },
  },

  state: {
    instances: {
      character: {
        id: "character",
        type: "character",
        maxSpeed: 250,
        maxAngularSpeed: pi() / 4,
        position: [400, 0, 300],
      },

      parameters: {
        type: "form",
        position: [800 - 352, 0, 600],
        groups: {
          wanderAsSeek: {
            title: "Wander As Seek",
            fields: {
              wanderRadius: {
                label: "Wander Radius",
                inputType: "number",
                defaultValue: DEFAULT_WANDER_RADIUS,
              },
            },
          },
        },
      },
    },
  },
}
