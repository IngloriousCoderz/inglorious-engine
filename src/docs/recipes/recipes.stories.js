import Game from '../../ui/game'
import addInstance from './add-instance'
import fsm from './fsm'
import randomInstances from './random-instances'
import removeInstance from './remove-instance'

export default {
  title: 'Games/Recipes',
  component: Game,
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

export const FSM = {
  args: { config: fsm },
}
