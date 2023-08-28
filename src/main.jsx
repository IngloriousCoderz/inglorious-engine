import React from 'react'
import ReactDOM from 'react-dom/client'

import engine from './games/seek'
import Game from './ui/game'

if (import.meta.env.DEV) {
  window.store = engine.getStore()
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Game engine={engine} />
  </React.StrictMode>
)
