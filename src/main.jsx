import ReactDOM from 'react-dom/client'

import config from './games/ai/kinematic/seek'
import Game from './ui/game'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Game config={config} />
)
