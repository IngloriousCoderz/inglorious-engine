import firstGame from "./quick-start/first-game.js"
import helloWorld from "./quick-start/hello-world.js"
import RendererChooser from "./renderer-chooser.jsx"

export default {
  title: "Quick Start",
  component: RendererChooser,
}

export const HelloWorld = {
  args: { config: helloWorld },
}

export const FirstGame = {
  args: { config: firstGame },
}
