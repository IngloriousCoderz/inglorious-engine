import { gamepadInstance, gamepadType } from './gamepad'
import { keyboardInstance, keyboardType } from './keyboard'

const DEFAULT_ID = 0

export function inputType() {
  return {
    ...keyboardType(),

    ...gamepadType(),

    input: {
      'input:axis'(instance, event) {
        const { id, axis, value } = event.payload

        if (instance.id !== `input${id}`) {
          return
        }

        instance[instance.mapping[axis]] = value
      },

      'input:press'(instance, event) {
        const { id, button } = event.payload

        if (instance.id !== `input${id}`) {
          return
        }

        instance[instance.mapping[button]] = true
      },

      'input:release'(instance, event) {
        const { id, button } = event.payload

        if (instance.id !== `input${id}`) {
          return
        }

        instance[instance.mapping[button]] = false
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
