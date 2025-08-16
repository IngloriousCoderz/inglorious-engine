const X = 0

export default {
  types: {
    character: {
      draw(ctx, instance) {
        const {
          size = 24,
          orientation = 0,
          stroke = "black",
          fill = "transparent",
        } = instance

        const radius = size * 0.5

        ctx.save()
        ctx.rotate(-orientation)
        ctx.translate(radius - 1, 0)

        ctx.fillStyle = "black"

        ctx.beginPath()
        ctx.moveTo(0, 6)
        ctx.lineTo(0, -6)
        ctx.lineTo(6, 0)
        ctx.fill()
        ctx.closePath()
        ctx.restore()

        ctx.save()
        ctx.lineWidth = 1
        ctx.strokeStyle = stroke
        ctx.fillStyle = fill

        ctx.beginPath()
        ctx.arc(0, 0, radius, 0, 2 * 3.14)
        ctx.fill()
        ctx.stroke()
        ctx.closePath()
        ctx.restore()
      },

      "game:update"(instance, dt, { instances }) {
        const { game } = instances
        const [left, , right] = game.bounds

        if (instance.position[X] > right) {
          instance.velocity[X] = -instance.maxSpeed
          instance.orientation = 3.14
        } else if (instance.position[X] < left) {
          instance.velocity[X] = instance.maxSpeed
          instance.orientation = 0
        }

        instance.position[X] += instance.velocity[X] * dt
      },
    },
  },

  instances: {
    character: {
      type: "character",
      maxSpeed: 250,
      position: [400, 0, 300],
      velocity: [250, 0, 0],
      orientation: 0,
    },
  },
}
