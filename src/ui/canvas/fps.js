/* eslint-disable no-magic-numbers */
const DEFAULT_OPTIONS = {}

const DEFAULT_FREQUENCY = 1
const DEFAULT_ACCURACY = 1

const PADDING = 10
const ONE_SECOND = 1

const DEFAULT_ANIMATION = { counter: 0, value: 0.016 }

export function animate(instance, { dt, config }) {
  const { frequency = DEFAULT_FREQUENCY } = config.types[instance.type]

  instance._animation = instance._animation ?? { ...DEFAULT_ANIMATION }

  instance._animation.counter += dt
  if (instance._animation.counter >= frequency) {
    instance._animation.counter = 0
    instance._animation.value = instance.value
  }
}

export function draw(ctx, options = DEFAULT_OPTIONS) {
  const { config, instance } = options
  const { accuracy = DEFAULT_ACCURACY } = config.types[instance.type]
  const { size = 16, _animation } = instance

  ctx.font = `${size}px sans serif`
  ctx.fillStyle = 'black'
  ctx.fillText(
    (ONE_SECOND / _animation.value).toFixed(accuracy),
    PADDING,
    PADDING + size
  )
}
