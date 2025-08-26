import RendererChooser from "../renderer-chooser.jsx"
import addAndRemove from "./add-and-remove.js"
import addEntity from "./add-entity.js"
import decisionTree from "./decision-tree.js"
import dynamicBehaviors from "./dynamic-behaviors.js"
import randomEntities from "./random-entities.js"
import removeEntity from "./remove-entity.js"
import states from "./states.js"

export default {
  title: "Engine/Recipes",
  component: RendererChooser,
}

export const RandomEntities = {
  args: { config: randomEntities },
}

export const AddEntity = {
  args: { config: addEntity },
}

export const RemoveEntity = {
  args: { config: removeEntity },
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

export const DynamicBehaviors = {
  args: { config: dynamicBehaviors },
}
