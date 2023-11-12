/* eslint-disable no-magic-numbers */
import { ZERO_VECTOR } from '../math/linear-algebra/vector.js'

const DEFAULT_OPTIONS = {}

const ONE_SECOND = 1
const DEFAULT_ACCURACY = 1
const PADDING = 10

export function animate(instance, { dt, config }) {
  const { frequency = ONE_SECOND } = config.types[instance.type]

  instance.animation = instance.animation ?? { counter: 0, value: 1 }

  instance.animation.counter += dt
  if (instance.animation.counter >= frequency) {
    instance.animation.counter = 0
    instance.animation.value = instance.value
  }
}

export default function draw(ctx, options = DEFAULT_OPTIONS) {
  const {
    config,
    type,
    size = 16,
    position = ZERO_VECTOR,
    animation = 0,
  } = options
  const [, , , screenHeight] = config.bounds
  const { accuracy = DEFAULT_ACCURACY } = config.types[type]
  const [x, , z] = position

  ctx.resetTransform()
  ctx.translate(x, screenHeight - z)

  ctx.font = `${size}px sans serif`
  ctx.fillStyle = 'black'
  ctx.fillText(
    (ONE_SECOND / animation.value).toFixed(accuracy),
    PADDING,
    PADDING + size
  )
}
