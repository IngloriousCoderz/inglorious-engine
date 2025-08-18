const COUNTER_RESET = 0
const DEFAULT_VALUE = 0

export const Animation = { play }

function play(what, state, instance, dt, options) {
  const { onTick } = options
  const {
    speed,
    defaultValue = DEFAULT_VALUE,
    value = DEFAULT_VALUE,
  } = instance[what]

  if (state !== instance[what].state) {
    instance[what].state = state
    instance[what].counter = COUNTER_RESET
    instance[what].value = defaultValue
  }

  instance[what].counter += dt
  if (instance[what].counter >= speed) {
    instance[what].counter = COUNTER_RESET
    instance[what].value = value
    onTick && onTick(instance, dt, options)
  }
}
