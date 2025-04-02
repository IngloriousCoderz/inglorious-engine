/* eslint-disable no-magic-numbers */
import { Animation } from "@inglorious/game/animation.js"
import { angle } from "@inglorious/utils/math/linear-algebra/vector.js"
import { subtract } from "@inglorious/utils/math/linear-algebra/vectors.js"
import { mod } from "@inglorious/utils/math/numbers.js"
import { pi, toRange } from "@inglorious/utils/math/trigonometry.js"

const BEFORE = -1
const AFTER = 1

export const Sprite = { move2, move4, move6, move8, play }

function move2(instance, target) {
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

function move4(instance, target) {
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

function move6(instance, target) {
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

function move8(instance, target) {
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

function play(spriteState, instance, options) {
  Animation.play("sprite", spriteState, instance, { ...options, onTick })
}

function onTick(instance, options) {
  const { notify } = options

  const { frames, state } = instance.sprite

  const framesLength = frames[state].length

  instance.sprite.value = mod(instance.sprite.value + 1, framesLength)
  if (instance.sprite.value === framesLength - 1) {
    notify({
      id: `sprite:animationEnd`,
      payload: { id: instance.id, spriteState: state },
    })
  }
}
