import Game from '@inglorious/ui/react/game'

import gamepad from './gamepad'
import input from './input'
import keyboard from './keyboard'
import mouse from './mouse'

export default {
  title: 'Engine/Input',
  component: Game,
}

export const Mouse = {
  args: { config: mouse },
}

export const Keyboard = {
  args: { config: keyboard },
}

export const Gamepad = {
  args: { config: gamepad },
}

export const Input = {
  args: { config: input },
}
