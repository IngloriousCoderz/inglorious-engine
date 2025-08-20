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

  if (state !== target.state) {
    target.state = state
    target.counter = COUNTER_RESET
    target.value = defaultValue
  }

  target.counter += dt
  if (target.counter >= speed) {
    target.counter = COUNTER_RESET
    onTick?.(target, dt, options)
  }
}
