import { start } from "@inglorious/renderers/canvas.js"
import game from "game"

const canvas = document.getElementById("canvas")
window.addEventListener("load", () => start(game, canvas))
