/* eslint-disable no-magic-numbers */

const DEFAULT_MAX_JUMP = 0
const DEFAULT_MAX_LEAP = 0
const DEFAULT_MAX_SPEED = 0

const DEFAULT_PY = 0

const DEFAULT_OPTIONS = { dt: 0 }

export function jump(
  {
    maxJump = DEFAULT_MAX_JUMP,
    maxLeap = DEFAULT_MAX_LEAP,
    maxSpeed = DEFAULT_MAX_SPEED,
    py = DEFAULT_PY,
  },
  options = DEFAULT_OPTIONS
) {
  const { dt } = options

  const vy = (2 * maxJump * maxSpeed) / maxLeap
  py += vy * dt

  return { vy, py }
}
