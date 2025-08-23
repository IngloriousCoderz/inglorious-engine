import { extend } from "@inglorious/utils/data-structures/objects.js"

import { createGamepad, gamepadListener, gamepadsPoller } from "./gamepad.js"
import { createInput, input } from "./input.js"
import { createKeyboard, keyboard } from "./keyboard.js"

const DEFAULT_PARAMS = {
  name: "input0",
}

export function setupControls(params) {
  params = extend(DEFAULT_PARAMS, params)

  return {
    types: {
      keyboard: [keyboard(params)],
      gamepads_poller: [gamepadsPoller(params)],
      gamepad_listener: [gamepadListener(params)],
      input: [input(params)],
    },
    entities: {
      gamepads: { type: "gamepads_poller" },
    },
  }
}

export function controlsEntities(name = DEFAULT_PARAMS.name, mapping = {}) {
  return {
    [`keyboard_${name}`]: createKeyboard(`keyboard_${name}`, mapping),
    [`gamepad_${name}`]: createGamepad(`gamepad_${name}`, mapping),
    [name]: createInput(name, mapping),
  }
}
