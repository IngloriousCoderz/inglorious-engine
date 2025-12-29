export function generateLitLoader(options = {}) {
  return `let seed = ${options.seed}
let mode = "seeded"

const originalRandom = Math.random
Math.random = random

await import("@inglorious/web")

queueMicrotask(() => {
  Math.random = originalRandom
  mode = "normal"
})

function random() {
  if (mode === "seeded") {
    seed = (seed * 1664525 + 1013904223) % 4294967296
    return seed / 4294967296
  }
  return originalRandom()
}
`
}
