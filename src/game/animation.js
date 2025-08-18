const COUNTER_RESET = 0
const DEFAULT_VALUE = 0

export const Animation = { play }

function play({ what, state, instance, dt, onTick, ...options }) {
  const missing = [
    what == null && "'what'",
    state == null && "'state'",
    instance == null && "'instance'",
    dt == null && "'dt'",
  ]
    .filter(Boolean)
    .join(", ")
  if (missing.length) {
    throw new Error(
      `Animation.play is missing mandatory parameters: ${missing}`,
    )
  }

  const animation = instance[what]
  const {
    speed,
    defaultValue = DEFAULT_VALUE,
    value = DEFAULT_VALUE,
  } = animation

  if (state !== animation.state) {
    animation.state = state
    animation.counter = COUNTER_RESET
    animation.value = defaultValue
  }

  animation.counter += dt
  if (animation.counter >= speed) {
    animation.counter = COUNTER_RESET
    animation.value = value
    onTick?.(instance, dt, options)
  }
}
