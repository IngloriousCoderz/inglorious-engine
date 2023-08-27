import React from 'react'
import ReactDOM from 'react-dom/client'

import Game from './components/game'
import engine from './game'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Game engine={engine} />
  </React.StrictMode>
)
