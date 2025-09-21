/* eslint-disable no-magic-numbers */
import { toString } from "@inglorious/utils/math/vector.js"
import { v } from "@inglorious/utils/v.js"

const position = v(10, 20, 30)
const velocity = v(1, 1.5, 2)
const deltaTime = 0.16

// This is IngloriousScript!
const newPosition = position + velocity * deltaTime

document.querySelector("#result").innerHTML = `
<div>Original Position: ${toString(position)}</div>
<div>New Position: ${toString(newPosition, 2)}</div>
`
