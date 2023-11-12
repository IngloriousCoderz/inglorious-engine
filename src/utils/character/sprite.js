/* eslint-disable no-magic-numbers */
import { angle } from '@inglorious/utils/math/linear-algebra/vector.js'
import { subtract } from '@inglorious/utils/math/linear-algebra/vectors.js'
import { mod } from '@inglorious/utils/math/numbers.js'
import { pi, toRange } from '@inglorious/utils/math/trigonometry.js'

const BEFORE = -1
const AFTER = 1

export function init(sprite, instance) {
  instance.sprite = sprite
  instance.animation = resetAnimation()
}

export function move2(instance, target) {
  const direction = subtract(target.position, instance.position)

  const directions = 2
  const multiple = pi() / directions
  const theta = toRange(angle(direction)) / multiple

  if (theta >= 0 + BEFORE && theta < 0 + AFTER) {
    return 'right'
  } else {
    return 'left'
  }
}

export function move4(instance, target) {
  const direction = subtract(target.position, instance.position)

  const directions = 4
  const multiple = pi() / directions
  const theta = toRange(angle(direction)) / multiple

  if (theta >= -2 + BEFORE && theta < -2 + AFTER) {
    return 'down'
  } else if (theta >= 0 + BEFORE && theta < 0 + AFTER) {
    return 'right'
  } else if (theta >= 2 + BEFORE && theta < 2 + AFTER) {
    return 'up'
  } else {
    return 'left'
  }
}

export function move6(instance, target) {
  const direction = subtract(target.position, instance.position)

  const directions = 6
  const multiple = pi() / directions
  const theta = toRange(angle(direction)) / multiple

  if (theta >= -6 + BEFORE && theta < -6 + AFTER) {
    return 'leftDown'
  } else if (theta >= -4 + BEFORE && theta < -4 + AFTER) {
    return 'down'
  } else if (theta >= -2 + BEFORE && theta < -2 + AFTER) {
    return 'rightDown'
  } else if (theta >= 0 + BEFORE && theta < 0 + AFTER) {
    return 'right'
  } else if (theta >= 2 + BEFORE && theta < 2 + AFTER) {
    return 'rightUp'
  } else if (theta >= 4 + BEFORE && theta < 4 + AFTER) {
    return 'up'
  } else if (theta >= 6 + BEFORE && theta < 6 + AFTER) {
    return 'leftUp'
  } else {
    return 'left'
  }
}

export function move8(instance, target) {
  const direction = subtract(target.position, instance.position)

  const directions = 8
  const multiple = pi() / directions
  const theta = toRange(angle(direction)) / multiple

  if (theta >= -6 + BEFORE && theta < -6 + AFTER) {
    return 'leftDown'
  } else if (theta >= -4 + BEFORE && theta < -4 + AFTER) {
    return 'down'
  } else if (theta >= -2 + BEFORE && theta < -2 + AFTER) {
    return 'rightDown'
  } else if (theta >= 0 + BEFORE && theta < 0 + AFTER) {
    return 'right'
  } else if (theta >= 2 + BEFORE && theta < 2 + AFTER) {
    return 'rightUp'
  } else if (theta >= 4 + BEFORE && theta < 4 + AFTER) {
    return 'up'
  } else if (theta >= 6 + BEFORE && theta < 6 + AFTER) {
    return 'leftUp'
  } else {
    return 'left'
  }
}

export function animate(instance, { dt, config, notify }) {
  const { speed, states } = config.types[instance.type].sprite
  const { frames } = states[instance.sprite]

  instance.animation = instance.animation ?? resetAnimation()

  instance.animation.counter += dt
  if (instance.animation.counter >= speed) {
    instance.animation.counter = 0
    instance.animation.frame = mod(instance.animation.frame + 1, frames.length)

    if (instance.animation.frame === frames.length - 1) {
      notify({
        id: `sprite:animationEnd`,
        payload: { id: instance.id, sprite: instance.sprite },
      })
    }
  }
}

export function draw(instance, { ctx, config }) {
  const [, , , screenHeight] = config.bounds
  const { src, width, height, rows, cols, scale, states } =
    config.types[instance.type].sprite

  const img = document.getElementById(src)

  const { frames, flip } = states[instance.sprite]
  const [sx, sy] = frames[instance.animation.frame]

  const [x, , z] = instance.position

  const cellWidth = width / cols
  const cellHeight = height / rows

  ctx.translate(x, screenHeight - z)
  ctx.scale(flip === 'h' ? -1 : 1, flip === 'v' ? -1 : 1)
  ctx.scale(scale, scale)
  ctx.translate(-cellWidth / 2, -cellHeight / 2)

  ctx.imageSmoothingEnabled = false
  ctx.drawImage(
    img,
    sx * cellWidth,
    sy * cellHeight,
    cellWidth,
    cellHeight,
    0,
    0,
    cellWidth,
    cellHeight
  )

  ctx.resetTransform()
}

function resetAnimation() {
  return { counter: 0, frame: 0 }
}
