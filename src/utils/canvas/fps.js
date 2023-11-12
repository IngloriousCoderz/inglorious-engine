/* eslint-disable no-magic-numbers */
const DEFAULT_OPTIONS = {}

const DEFAULT_FREQUENCY = 1
const DEFAULT_ACCURACY = 1

const PADDING = 10
const ONE_SECOND = 1

const DEFAULT_ANIMATION = { counter: 0, value: 0.016 }

export function animate(instance, { dt, config }) {
  const { frequency = DEFAULT_FREQUENCY } = config.types[instance.type]

  instance.animation = instance.animation ?? DEFAULT_ANIMATION

  instance.animation.counter += dt
  if (instance.animation.counter >= frequency) {
    instance.animation.counter = 0
    instance.animation.value = instance.value
  }
}

export default function draw(ctx, options = DEFAULT_OPTIONS) {
  const { config, instance } = options
  const { accuracy = DEFAULT_ACCURACY } = config.types[instance.type]
  const { size = 16, animation } = instance

  ctx.font = `${size}px sans serif`
  ctx.fillStyle = 'black'
  ctx.fillText(
    (ONE_SECOND / animation.value).toFixed(accuracy),
    PADDING,
    PADDING + size
  )
}
