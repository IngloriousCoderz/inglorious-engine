/* eslint-disable no-magic-numbers */

const DEFAULT_MAX_JUMP = 0
const DEFAULT_MAX_LEAP = 0
const DEFAULT_MAX_SPEED = 0

export default function jump(instance, { dt }) {
  const maxJump = instance.maxJump ?? DEFAULT_MAX_JUMP
  const maxLeap = instance.maxLeap ?? DEFAULT_MAX_LEAP
  const maxSpeed = instance.maxSpeed ?? DEFAULT_MAX_SPEED

  instance.vy = (2 * maxJump * maxSpeed) / maxLeap
  instance.py += instance.vy * dt

  return instance
}
