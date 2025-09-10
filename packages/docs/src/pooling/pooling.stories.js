import RendererChooser from "../renderer-chooser.jsx"
import pooling from "./pooling.js"
import noPooling from "./no-pooling.js"

export default {
  title: "Engine/Pooling",
  component: RendererChooser,
}

export const NoPooling = {
  args: { config: noPooling },
}

export const Pooling = {
  args: { config: pooling },
}
