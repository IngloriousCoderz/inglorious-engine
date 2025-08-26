/* eslint-disable no-magic-numbers */
import { Ticker } from "@inglorious/engine/animation/ticker.js"
import { mod } from "@inglorious/utils/math/numbers.js"
import { pi, toRange } from "@inglorious/utils/math/trigonometry.js"

const BEFORE = -1
const AFTER = 1

export const Sprite = {
  move2,
  move4,
  move6,
  move8,
  play,
}

function move2(entity) {
  const directions = 2
  const multiple = pi() / directions
  const theta = toRange(entity.orientation) / multiple

  if (theta > 0 + BEFORE && theta < 0 + AFTER) {
    return "right"
  } else if (theta < 0 + BEFORE || theta > 0 + AFTER) {
    return "left"
  }

  return entity.sprite.state ?? "right"
}

function move4(entity) {
  const directions = 4
  const multiple = pi() / directions
  const theta = toRange(entity.orientation) / multiple

  if (theta >= -2 + BEFORE && theta < -2 + AFTER) {
    return "down"
  } else if (theta >= 0 + BEFORE && theta < 0 + AFTER) {
    return "right"
  } else if (theta >= 2 + BEFORE && theta < 2 + AFTER) {
    return "up"
  } else if (theta < 0 + BEFORE || theta > 0 + AFTER) {
    return "left"
  }

  return entity.sprite.state ?? "down"
}

function move6(entity) {
  const directions = 6
  const multiple = pi() / directions
  const theta = toRange(entity.orientation) / multiple

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
  } else if (theta < 0 + BEFORE || theta > 0 + AFTER) {
    return "left"
  }

  return entity.sprite.state ?? "down"
}

function move8(entity) {
  const directions = 8
  const multiple = pi() / directions
  const theta = toRange(entity.orientation) / multiple

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
  } else if (theta < 0 + BEFORE || theta > 0 + AFTER) {
    return "left"
  }

  return entity.sprite.state ?? "down"
}

function play(animation, { entity, dt, notify }) {
  const missing = [
    animation == null && "'animation'",
    entity == null && "'entity'",
    dt == null && "'dt'",
    notify == null && "'notify'",
  ]
    .filter(Boolean)
    .join(", ")
  if (missing.length) {
    throw new Error(`Sprite.play is missing mandatory parameters: ${missing}`)
  }

  Ticker.tick({
    target: entity.sprite,
    state: animation,
    dt,
    onTick: (sprite) => {
      const { frames, state: animation } = sprite
      const framesLength = frames[animation].length
      sprite.value = mod(sprite.value + 1, framesLength)
      if (sprite.value === framesLength - 1) {
        notify("spriteAnimationEnd", { entityId: entity.id, animation })
      }
    },
  })
}
