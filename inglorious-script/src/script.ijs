import { v } from "@inglorious/utils/v.js"

const position = v(10, 20, 30)
const velocity = v(1, 1.5, 2)
const deltaTime = 0.16

// This is IngloriousScript!
const newPosition = position + velocity * deltaTime

console.log("Original Position:", position)
console.log("New Position:", newPosition)
