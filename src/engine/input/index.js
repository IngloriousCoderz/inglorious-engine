import { gamepadInstances, gamepadType } from './gamepad'
import { keyboardInstance, keyboardType } from './keyboard'

export function inputType(mapping = {}) {
  return {
    ...keyboardType(),

    ...gamepadType(),

    input: {
      mapping,

      'input:axis'(instance, event) {
        const id = mapping[event.payload.id]
        instance[id] = event.payload.value
      },

      'input:press'(instance, event) {
        const id = mapping[event.payload]
        instance[id] = true
      },

      'input:release'(instance, event) {
        const id = mapping[event.payload]
        instance[id] = false
      },
    },
  }
}

export function inputInstances() {
  return {
    ...keyboardInstance(),

    ...gamepadInstances(),

    input0: { type: 'input' },
    input1: { type: 'input' },
    input2: { type: 'input' },
    input3: { type: 'input' },
  }
}
