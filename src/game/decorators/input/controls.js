import { merge } from "@inglorious/utils/data-structures/objects.js"

import { createGamepad, enableGamepad } from "./gamepad.js"
import { createInput, enableInput } from "./input.js"
import { createKeyboard, enableKeyboard } from "./keyboard.js"

const DEFAULT_PARAMS = {
  name: "input0",
}

export function enableControls(params) {
  params = merge({}, DEFAULT_PARAMS, params)

  return {
    keyboard: [enableKeyboard(params)],
    gamepad: [enableGamepad(params)],
    input: [enableInput(params)],
  }
}

export function createControls(name = DEFAULT_PARAMS.name, mapping = {}) {
  return {
    [`keyboard_${name}`]: createKeyboard(`keyboard_${name}`, mapping),
    [`gamepad_${name}`]: createGamepad(`gamepad_${name}`, mapping),
    [name]: createInput(name, mapping),
  }
}
