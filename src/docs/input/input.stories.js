import Game from '../../ui/game'
import tankControls from '../ai/movement/kinematic/tank-controls'
import input from './input'
import keyboard from './keyboard'
import mouse from './mouse'

export default {
  title: 'Engine/Input',
  component: Game,
}

export const Keyboard = {
  args: { config: keyboard },
}

export const Input = {
  args: { config: input },
}

export const Mouse = {
  args: { config: mouse },
}
