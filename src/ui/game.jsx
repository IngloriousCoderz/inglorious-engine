import { Provider } from 'react-redux'

import Character from './character'
import Cursor from './cursor'
import Debug from './debug'
import Scene from './scene'

export default function Game({ engine }) {
  return (
    <Provider store={engine.getStore()}>
      <Scene>
        <Cursor />
        <Debug id="neko" />
        <Character id="neko" />
      </Scene>
    </Provider>
  )
}
