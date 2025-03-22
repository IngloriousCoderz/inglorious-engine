import { merge } from "@inglorious/utils/data-structures/objects.js"

import { createGamepad, enableGamepad } from "./gamepad.js"
import { createInput, enableInput } from "./input.js"
import { createKeyboard, enableKeyboard } from "./keyboard.js"

const DEFAULT_PARAMS = {
  id: 0,
}

export function enableControls(params) {
  params = merge({}, DEFAULT_PARAMS, params)

  return {
    keyboard: [enableKeyboard(params)],
    gamepad: [enableGamepad(params)],
    input: [enableInput(params)],
  }
}

export function createControls(id = DEFAULT_PARAMS.id, mapping = {}) {
  return {
    [`keyboard${id}`]: createKeyboard(id, mapping),
    [`gamepad${id}`]: createGamepad(id, mapping),
    [`input${id}`]: createInput(id, mapping),
  }
}
