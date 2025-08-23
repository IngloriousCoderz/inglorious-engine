import RendererChooser from "../renderer-chooser.jsx"
import controls from "./controls.js"
import mouse from "./mouse.js"

export default {
  title: "Engine/Input",
  component: RendererChooser,
}

export const Mouse = {
  args: { config: mouse },
}

export const Controls = {
  args: { config: controls },
}
