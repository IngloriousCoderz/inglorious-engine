import { extend } from "@inglorious/utils/data-structures/objects.js"

import { createGamepad, gamepad } from "./gamepad.js"
import { createInput, input } from "./input.js"
import { createKeyboard, keyboard } from "./keyboard.js"

const DEFAULT_PARAMS = {
  name: "input0",
}

export function controlsTypes(params) {
  params = extend(DEFAULT_PARAMS, params)

  return {
    keyboard: [keyboard(params)],
    gamepad: [gamepad(params)],
    input: [input(params)],
  }
}

export function controlsInstances(name = DEFAULT_PARAMS.name, mapping = {}) {
  return {
    [`keyboard_${name}`]: createKeyboard(`keyboard_${name}`, mapping),
    [`gamepad_${name}`]: createGamepad(`gamepad_${name}`, mapping),
    [name]: createInput(name, mapping),
  }
}
