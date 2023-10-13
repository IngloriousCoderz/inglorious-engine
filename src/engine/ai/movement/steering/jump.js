const Y = 1

export default function jump(instance, { elapsed }) {
  instance.acceleration[Y] = instance.maxJumpAcceleration * elapsed
  instance.velocity[Y] += instance.acceleration[Y]
  instance.position[Y] += instance.velocity[Y]
  return instance
}
