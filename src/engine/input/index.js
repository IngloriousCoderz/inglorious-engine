import { gamepadInstance, gamepadType } from './gamepad'
import { keyboardInstance, keyboardType } from './keyboard'

const DEFAULT_ID = 0

export function inputType(mapping = {}) {
  return {
    ...keyboardType(),

    ...gamepadType(),

    input: {
      mapping,

      'input:axis'(instance, event) {
        const { id, axis, value } = event.payload

        if (instance.id !== `input${id}`) {
          return
        }

        instance[mapping[axis]] = value
      },

      'input:press'(instance, event) {
        const { id, button } = event.payload

        if (instance.id !== `input${id}`) {
          return
        }

        instance[mapping[button]] = true
      },

      'input:release'(instance, event) {
        const { id, button } = event.payload

        if (instance.id !== `input${id}`) {
          return
        }

        instance[mapping[button]] = false
      },
    },
  }
}

export function inputInstance(id = DEFAULT_ID) {
  return {
    ...keyboardInstance(id),
    ...gamepadInstance(id),

    [`input${id}`]: { type: 'input' },
  }
}
