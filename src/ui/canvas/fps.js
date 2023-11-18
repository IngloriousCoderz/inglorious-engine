/* eslint-disable no-magic-numbers */
import * as Animation from '@inglorious/utils/character/animation.js'

const DEFAULT_SIZE = 16
const DEFAULT_PADDING = 10
const ONE_SECOND = 1

export function fpsType(type) {
  return {
    fps: {
      accuracy: 1,

      dt: {
        speed: 1,
        value: 60,
      },

      'game:update'(instance, event, options) {
        Animation.play('dt', 'default', instance, { ...options, onTick })
      },

      draw,

      ...type,
    },
  }
}

export function fpsInstance(instance) {
  return {
    fps: {
      id: 'fps',
      type: 'fps',
      size: DEFAULT_SIZE,
      position: [0, 0, 600],
      ...instance,
    },
  }
}

function onTick(instance, options) {
  instance.dt.value = options.dt
}

function draw(ctx, options) {
  const { config, instance } = options
  const { accuracy } = config.types[instance.type]
  const { size = DEFAULT_SIZE, dt } = instance

  ctx.font = `${size}px sans serif`
  ctx.fillStyle = 'black'
  ctx.fillText(
    (ONE_SECOND / dt.value).toFixed(accuracy),
    DEFAULT_PADDING,
    DEFAULT_PADDING + size
  )
}
