/* eslint-disable no-magic-numbers */

const DEFAULT_ANIMATION = { counter: 0, value: 0 }

export function play(type, state, instance, options) {
  const { dt, types, onTick } = options
  const { speed, value = 0 } = types[instance.type][type]

  instance[type] = instance[type] ?? { ...DEFAULT_ANIMATION }
  if (state !== instance[type].state) {
    instance[type].state = state
    instance[type].counter = 0
    instance[type].value = value
  }

  instance[type].counter += dt
  if (instance[type].counter >= speed) {
    instance[type].counter = 0
    onTick && onTick(instance, options)
  }
}
