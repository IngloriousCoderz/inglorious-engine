import Game from '../../ui/game'
import keyboard from './keyboard'
import mouse from './mouse'

export default {
  title: 'Games/Input',
  component: Game,
}

export const Keyboard = {
  args: { config: keyboard },
}

export const Mouse = {
  args: { config: mouse },
}
