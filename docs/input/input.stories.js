import UiChooser from "../ui-chooser.jsx"
import controls from "./controls.js"
import gamepad from "./gamepad.js"
import keyboard from "./keyboard.js"
import mouse from "./mouse.js"

export default {
  title: "Engine/Input",
  component: UiChooser,
}

export const Mouse = {
  args: { config: mouse },
}

export const Keyboard = {
  args: { config: keyboard },
}

export const Gamepad = {
  args: { config: gamepad },
}

export const Controls = {
  args: { config: controls },
}
