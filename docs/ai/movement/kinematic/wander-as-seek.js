import {
  DEFAULT_WANDER_RADIUS,
  wanderAsSeek,
} from "@inglorious/engine/ai/movement/kinematic/wander-as-seek.js"
import { flip } from "@inglorious/engine/physics/bounds.js"
import { renderCharacter } from "@inglorious/ui/canvas/character.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

export default {
  types: {
    character: [
      { render: renderCharacter },
      {
        update(entity, dt, { entities }) {
          const { parameters, game } = entities
          const { fields } = parameters.groups.wanderAsSeek

          merge(
            entity,
            wanderAsSeek(entity, dt, {
              wanderRadius: fields.wanderRadius.value,
            }),
          )
          flip(entity, game.bounds)
        },
      },
    ],

    form: {
      fieldChange(entity, { id, value }) {
        entity.groups.wanderAsSeek.fields[id].value = value
      },
    },
  },

  entities: {
    character: {
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
}
