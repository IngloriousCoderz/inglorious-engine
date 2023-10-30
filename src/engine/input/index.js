import { gamepadInstance, gamepadType } from './gamepad'
import { keyboardInstance, keyboardType } from './keyboard'

const DEFAULT_ID = 0

export function inputType() {
  return {
    ...keyboardType(),

    ...gamepadType(),

    input: {
      'input:axis'(instance, event) {
        const { id, action, value } = event.payload

        if (instance.id !== `input${id}`) {
          return
        }

        instance[action] = value
      },

      'input:press'(instance, event) {
        const { id, action } = event.payload

        if (instance.id !== `input${id}`) {
          return
        }

        instance[action] = true
      },

      'input:release'(instance, event) {
        const { id, action } = event.payload

        if (instance.id !== `input${id}`) {
          return
        }

        instance[action] = false
      },
    },
  }
}

export function inputInstance(id = DEFAULT_ID, mapping = {}) {
  return {
    ...keyboardInstance(mapping),
    ...gamepadInstance(id, mapping),

    [`input${id}`]: { type: 'input', mapping },
  }
}
