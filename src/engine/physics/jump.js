/* eslint-disable no-magic-numbers */

export function jump(instance, { dt }) {
  instance.vy = (2 * instance.maxJump * instance.maxSpeed) / instance.maxLeap
  instance.py += instance.vy * dt

  return instance
}
