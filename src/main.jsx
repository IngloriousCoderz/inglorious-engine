import ReactDOM from 'react-dom/client'

import game from './docs/recipes/decision-tree'
import Game from './ui/game'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Game config={game} />
)
