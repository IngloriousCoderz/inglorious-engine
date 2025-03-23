import { start } from "@inglorious/ui/canvas.js"
import game from "game"

const canvas = document.getElementById("canvas")
window.addEventListener("load", () => start(game, canvas))
