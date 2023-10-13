const GRAVITY = -9.8
const Y = 1

export function applyGravity(instance) {
  instance.acceleration[Y] = GRAVITY
  return instance
}
