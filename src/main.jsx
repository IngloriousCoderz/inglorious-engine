import ReactDOM from 'react-dom/client'

import config from './games/bounce'
import Game from './ui/game'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Game config={config} />
)
