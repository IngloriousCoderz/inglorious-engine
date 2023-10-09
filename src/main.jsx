import ReactDOM from 'react-dom/client'

import game from './docs/chase-the-mouse'
import Game from './ui/game'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Game config={game} />
)
