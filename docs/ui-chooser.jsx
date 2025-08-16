import ReactGame from "@inglorious/ui/react/game/index.jsx"

import CanvasGame from "./game.jsx"

export default function UiChooser({ ui = "canvas", ...props }) {
  return ui === "canvas" ? <CanvasGame {...props} /> : <ReactGame {...props} />
}
