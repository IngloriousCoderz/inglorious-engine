const DEFAULT_STATE = "default"
const DEFAULT_VALUE = 0
const COUNTER_RESET = 0

export const Ticker = { tick }

function tick({ target, state = DEFAULT_STATE, dt, onTick, ...options }) {
  const missing = [target == null && "'target'", dt == null && "'dt'"]
    .filter(Boolean)
    .join(", ")
  if (missing.length) {
    throw new Error(`Ticker.tick is missing mandatory parameters: ${missing}`)
  }

  const { speed, defaultValue = DEFAULT_VALUE } = target

  // The `state` property on a sprite is used to declare the desired animation.
  // The Ticker needs its own internal property to track the *current* animation
  // to detect when it changes. We'll use `target.animation`.
  if (state !== target.animation) {
    target.animation = state
    target.counter = COUNTER_RESET
    target.value = defaultValue
  }

  // Always ensure the public `state` property reflects the intended animation for `onTick`.
  target.state = state

  // Ensure properties are initialized on the first run for a given target.
  target.counter ??= COUNTER_RESET
  target.value ??= defaultValue

  target.counter += dt
  if (target.counter >= speed) {
    target.counter = COUNTER_RESET
    onTick?.(target, dt, options)
  }
}
