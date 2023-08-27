import { Provider } from 'react-redux'

import Entity from './entity'

export default function Game({ engine }) {
  return (
    <Provider store={engine.getStore()}>
      <Entity id="neko" />
    </Provider>
  )
}
