/* eslint-disable no-magic-numbers */
import { Animation } from "@inglorious/game/animation.js"
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

function move2(instance) {
  const directions = 2
  const multiple = pi() / directions
  const theta = toRange(instance.orientation) / multiple

  if (theta > 0 + BEFORE && theta < 0 + AFTER) {
    return "right"
  } else if (theta < 0 + BEFORE || theta > 0 + AFTER) {
    return "left"
  }

  return instance.sprite.state ?? "right"
}

function move4(instance) {
  const directions = 4
  const multiple = pi() / directions
  const theta = toRange(instance.orientation) / multiple

  if (theta >= -2 + BEFORE && theta < -2 + AFTER) {
    return "down"
  } else if (theta >= 0 + BEFORE && theta < 0 + AFTER) {
    return "right"
  } else if (theta >= 2 + BEFORE && theta < 2 + AFTER) {
    return "up"
  } else if (theta < 0 + BEFORE || theta > 0 + AFTER) {
    return "left"
  }

  return instance.sprite.state ?? "down"
}

function move6(instance) {
  const directions = 6
  const multiple = pi() / directions
  const theta = toRange(instance.orientation) / multiple

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

  return instance.sprite.state ?? "down"
}

function move8(instance) {
  const directions = 8
  const multiple = pi() / directions
  const theta = toRange(instance.orientation) / multiple

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

  return instance.sprite.state ?? "down"
}

function play({ state, instance, dt, notify }) {
  const missing = [
    state == null && "'state'",
    instance == null && "'instance'",
    dt == null && "'dt'",
    notify == null && "'notify'",
  ]
    .filter(Boolean)
    .join(", ")
  if (missing.length) {
    throw new Error(
      `Animation.play is missing mandatory parameters: ${missing}`,
    )
  }

  Animation.play({
    what: "sprite",
    state,
    instance,
    dt,
    onTick,
    notify,
  })
}

function onTick(instance, dt, { notify }) {
  const { frames, state } = instance.sprite

  const framesLength = frames[state].length

  instance.sprite.value = mod(instance.sprite.value + 1, framesLength)
  if (instance.sprite.value === framesLength - 1) {
    notify("sprite:animationEnd", { id: instance.id, spriteState: state })
  }
}
