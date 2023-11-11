import Game from '@inglorious/ui/react/game'

import addAndRemove from './add-and-remove'
import addInstance from './add-instance'
import decisionTree from './decision-tree'
import randomInstances from './random-instances'
import removeInstance from './remove-instance'
import states from './states'

export default {
  title: 'Engine/Recipes',
  component: Game,
  parameters: { layout: 'centered' },
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
