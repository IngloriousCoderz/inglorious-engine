import { createGamepad, gamepadListener, gamepadsPoller } from "./gamepad.js"
import { createInput, input } from "./input.js"
import { createKeyboard, keyboard } from "./keyboard.js"

export function controls(...targetIds) {
  return {
    keyboard: [keyboard()],
    gamepads_poller: [gamepadsPoller(targetIds)],
    gamepad_listener: [gamepadListener()],
    input: [input()],
  }
}

export function createControls(targetId, mapping = {}) {
  return {
    gamepads: { type: "gamepads_poller" },
    [`keyboard_${targetId}`]: createKeyboard(targetId, mapping),
    [`gamepad_${targetId}`]: createGamepad(targetId, mapping),
    [`input_${targetId}`]: createInput(targetId, mapping),
  }
}
