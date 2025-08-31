import ReactGame from "@inglorious/renderers/react/game/index.jsx"

import CanvasGame from "./game.jsx"

export default function RendererChooser({ renderer = "canvas", ...props }) {
  return renderer === "canvas" ? (
    <CanvasGame {...props} />
  ) : (
    <ReactGame {...props} />
  )
}
