import Game from '../../ui/game'
import addAndRemove from './add-and-remove'
import addInstance from './add-instance'
import fsm from './fsm'
import jump from './jump'
import randomInstances from './random-instances'
import removeInstance from './remove-instance'

export default {
  title: 'Games/Recipes',
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

export const FSM = {
  args: { config: fsm },
}

export const Jump = {
  args: { config: jump },
}
