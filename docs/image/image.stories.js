import UiChooser from "../ui-chooser.jsx"
import image from "./image.js"
import sprite from "./sprite.js"
import tilemap from "./tilemap.js"

export default {
  title: "Engine/Image",
  component: UiChooser,
}

export const Image = {
  args: { config: image },
}

export const Tilemap = {
  args: { config: tilemap },
}

export const Sprite = {
  args: { config: sprite },
}
