import ReactDOM from 'react-dom/client'

import Game from './game'

export function start(game) {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <Game config={game} />
  )
}
