import * as Gamepad from './input/gamepad.js'
import * as Keyboard from './input/keyboard.js'

const DEFAULT_ID = 0

export function type() {
  return {
    keyboard: Keyboard.type(),

    gamepad: Gamepad.type(),

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

export function instance(id = DEFAULT_ID, mapping = {}) {
  return {
    [`keyboard${id}`]: Keyboard.instance(id, mapping),
    [`gamepad${id}`]: Gamepad.instance(id, mapping),
    [`input${id}`]: { id: `input${id}`, type: 'input', mapping },
  }
}
