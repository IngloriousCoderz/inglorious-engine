import Game from '@inglorious/ui/react/game'

import circles from './circles'
import platform from './platform'

export default {
  title: 'Engine/Collision Detection',
  component: Game,
  parameters: { layout: 'centered' },
}

export const Circles = {
  args: { config: circles },
}

export const Platform = {
  args: { config: platform },
}
