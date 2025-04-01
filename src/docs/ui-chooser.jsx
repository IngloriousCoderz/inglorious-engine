import CanvasGame from "@inglorious/docs/game.jsx"
import ReactGame from "@inglorious/ui/react/game/index.jsx"

export default function UiChooser({ ui = "canvas", ...props }) {
  return ui === "canvas" ? <CanvasGame {...props} /> : <ReactGame {...props} />
}
