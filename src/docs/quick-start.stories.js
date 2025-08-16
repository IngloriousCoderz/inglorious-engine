import UiChooser from "@inglorious/docs/ui-chooser.jsx"

import firstGame from "./quick-start/first-game.js"
import helloWorld from "./quick-start/hello-world.js"

export default {
  title: "Quick Start",
  component: UiChooser,
}

export const HelloWorld = {
  args: { config: helloWorld },
}

export const FirstGame = {
  args: { config: firstGame },
}
