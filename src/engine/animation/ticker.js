const COUNTER_RESET = 0
const DEFAULT_VALUE = 0

export const Ticker = { tick }

function tick({ what, state, instance, dt, onTick, ...options }) {
  const missing = [
    what == null && "'what'",
    state == null && "'state'",
    instance == null && "'instance'",
    dt == null && "'dt'",
  ]
    .filter(Boolean)
    .join(", ")
  if (missing.length) {
    throw new Error(`Ticker.tick is missing mandatory parameters: ${missing}`)
  }

  const ticker = instance[what]
  const { speed, defaultValue = DEFAULT_VALUE } = ticker

  if (state !== ticker.state) {
    ticker.state = state
    ticker.counter = COUNTER_RESET
    ticker.value = defaultValue
  }

  ticker.counter += dt
  if (ticker.counter >= speed) {
    ticker.counter = COUNTER_RESET
    onTick?.(instance, dt, options)
  }
}
