import engine from '../engine'
import * as vectors from '../utils/vectors'

const config = {
  fps: 30,
  dimensions: [800, 600],
  loopStrategy: 'nap',
  handlers: {
    kitty: {
      'game:update'(entity) {
        const [width, height] = engine.config.dimensions

        if (entity.position[0] < 0 || entity.position[0] >= width) {
          entity.velocity[0] = -entity.velocity[0]
        }
        if (entity.position[2] < 0 || entity.position[2] >= height) {
          entity.velocity[2] = -entity.velocity[2]
        }

        entity.position = vectors.sum(entity.position, entity.velocity)
        entity.orientation = vectors.angle(entity.velocity)
      },
    },
  },
  state: {
    entities: {
      neko: {
        type: 'kitty',
        position: [0, 0, 0],
        velocity: [2, 0, 1],
        orientation: 0,
      },
    },
  },
}

export default config
