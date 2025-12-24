let mode = "normal"
let seed = 0

export function patchRandom(seed) {
  const original = Math.random
  const restore = setSeed(seed)

  Math.random = random

  return () => {
    restore()
    Math.random = original
  }
}

function random() {
  if (mode === "seeded") {
    seed = (seed * 1664525 + 1013904223) % 4294967296
    return seed / 4294967296
  }
  return Math.random()
}

function setSeed(newSeed) {
  seed = newSeed
  mode = "seeded"
  return () => {
    mode = "normal"
  }
}
