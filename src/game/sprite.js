/* eslint-disable no-magic-numbers */
import * as Animation from "@inglorious/game/animation.js"
import { angle } from "@inglorious/utils/math/linear-algebra/vector.js"
import { subtract } from "@inglorious/utils/math/linear-algebra/vectors.js"
import { mod } from "@inglorious/utils/math/numbers.js"
import { pi, toRange } from "@inglorious/utils/math/trigonometry.js"

const BEFORE = -1
const AFTER = 1

export function move2(instance, target) {
  const direction = subtract(target.position, instance.position)

  const directions = 2
  const multiple = pi() / directions
  const theta = toRange(angle(direction)) / multiple

  if (theta >= 0 + BEFORE && theta < 0 + AFTER) {
    return "right"
  } else {
    return "left"
  }
}

export function move4(instance, target) {
  const direction = subtract(target.position, instance.position)

  const directions = 4
  const multiple = pi() / directions
  const theta = toRange(angle(direction)) / multiple

  if (theta >= -2 + BEFORE && theta < -2 + AFTER) {
    return "down"
  } else if (theta >= 0 + BEFORE && theta < 0 + AFTER) {
    return "right"
  } else if (theta >= 2 + BEFORE && theta < 2 + AFTER) {
    return "up"
  } else {
    return "left"
  }
}

export function move6(instance, target) {
  const direction = subtract(target.position, instance.position)

  const directions = 6
  const multiple = pi() / directions
  const theta = toRange(angle(direction)) / multiple

  if (theta >= -6 + BEFORE && theta < -6 + AFTER) {
    return "leftDown"
  } else if (theta >= -4 + BEFORE && theta < -4 + AFTER) {
    return "down"
  } else if (theta >= -2 + BEFORE && theta < -2 + AFTER) {
    return "rightDown"
  } else if (theta >= 0 + BEFORE && theta < 0 + AFTER) {
    return "right"
  } else if (theta >= 2 + BEFORE && theta < 2 + AFTER) {
    return "rightUp"
  } else if (theta >= 4 + BEFORE && theta < 4 + AFTER) {
    return "up"
  } else if (theta >= 6 + BEFORE && theta < 6 + AFTER) {
    return "leftUp"
  } else {
    return "left"
  }
}

export function move8(instance, target) {
  const direction = subtract(target.position, instance.position)

  const directions = 8
  const multiple = pi() / directions
  const theta = toRange(angle(direction)) / multiple

  if (theta >= -6 + BEFORE && theta < -6 + AFTER) {
    return "leftDown"
  } else if (theta >= -4 + BEFORE && theta < -4 + AFTER) {
    return "down"
  } else if (theta >= -2 + BEFORE && theta < -2 + AFTER) {
    return "rightDown"
  } else if (theta >= 0 + BEFORE && theta < 0 + AFTER) {
    return "right"
  } else if (theta >= 2 + BEFORE && theta < 2 + AFTER) {
    return "rightUp"
  } else if (theta >= 4 + BEFORE && theta < 4 + AFTER) {
    return "up"
  } else if (theta >= 6 + BEFORE && theta < 6 + AFTER) {
    return "leftUp"
  } else {
    return "left"
  }
}

export function play(spriteState, instance, options) {
  Animation.play("sprite", spriteState, instance, { ...options, onTick })
}

function onTick(instance, options) {
  const { config, notify } = options
  const { type, sprite } = instance

  const { states } = config.types[type].sprite
  const { frames } = states[sprite.state]

  instance.sprite.value = mod(instance.sprite.value + 1, frames.length)
  if (instance.sprite.value === frames.length - 1) {
    notify({
      id: `sprite:animationEnd`,
      payload: { id: instance.id, sprite: instance.sprite.state },
    })
  }
}
