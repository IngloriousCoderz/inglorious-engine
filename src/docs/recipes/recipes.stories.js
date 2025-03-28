// import Game from "@inglorious/ui/react/game/index.jsx"

import Game from "@inglorious/docs/game.jsx"

import addAndRemove from "./add-and-remove.js"
import addInstance from "./add-instance.js"
import decisionTree from "./decision-tree.js"
import randomInstances from "./random-instances.js"
import removeInstance from "./remove-instance.js"
import states from "./states.js"

export default {
  title: "Engine/Recipes",
  component: Game,
  parameters: { layout: "centered" },
}

export const RandomInstances = {
  args: { config: randomInstances },
}

export const AddInstance = {
  args: { config: addInstance },
}

export const RemoveInstance = {
  args: { config: removeInstance },
}

export const AddAndRemove = {
  args: { config: addAndRemove },
}

export const States = {
  args: { config: states },
}

export const DecisionTree = {
  args: { config: decisionTree },
}
