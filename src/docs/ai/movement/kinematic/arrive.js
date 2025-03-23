import arrive, {
  DEFAULT_TARGET_RADIUS,
  DEFAULT_TIME_TO_TARGET,
} from "@inglorious/engine/ai/movement/kinematic/arrive.js"
import { clampToBounds } from "@inglorious/game/bounds.js"
import { enableCharacter } from "@inglorious/game/decorators/character.js"
import { enableMouse } from "@inglorious/game/decorators/input/mouse.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"

export default {
  types: {
    mouse: [enableMouse()],

    character: [
      enableCharacter(),
      {
        "game:update"(instance, event, { dt, config, instances }) {
          const target = instances.mouse
          const { fields } = instances.parameters.groups.arrive

          merge(
            instance,
            arrive(instance, target, {
              dt,
              targetRadius: fields.targetRadius.value,
              timeToTarget: fields.timeToTarget.value,
            }),
          )

          clampToBounds(instance, config.bounds)
        },
      },
    ],

    form: {
      "field:change"(instance, event) {
        const { id, value } = event.payload
        instance.groups.arrive.fields[id].value = value
      },
    },
  },

  instances: {
    mouse: {
      id: "mouse",
      type: "mouse",
      position: [400, 0, 300],
    },

    character: {
      id: "character",
      type: "character",
      maxSpeed: 250,
      position: [400, 0, 300],
    },

    parameters: {
      type: "form",
      position: [800 - 328, 0, 600],
      groups: {
        arrive: {
          title: "Kinematic Arrive",
          fields: {
            targetRadius: {
              label: "Target Radius",
              inputType: "number",
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
