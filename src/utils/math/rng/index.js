/* eslint-disable no-magic-numbers */

export function random(...args) {
  let step, from, to

  if (!args.length) {
    return Math.random()
  }

  if (args.length === 1) {
    step = 1
    from = 0
    to = args[0] + 1
  }

  if (args.length > 1) {
    step = args[2] ?? 1
    from = args[0] / step
    to = (args[1] + 1) / step
  }

  return Math.floor(Math.random() * (to - from) + from) * step
}

export function randomBinomial() {
  return random() - random()
}
