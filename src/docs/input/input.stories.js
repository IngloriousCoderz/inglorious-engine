import Game from '@inglorious/ui/react/game'

import controls from './controls'
import gamepad from './gamepad'
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

export const Controls = {
  args: { config: controls },
}
