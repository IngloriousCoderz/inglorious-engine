import arrive from '../../../../ai/movement/kinematic/arrive'
import engine from '../../../../engine'
import * as vectors from '../../../../utils/vectors'

const config = {
  dimensions: [800, 600],
  handlers: {
    elapsed: {
      'game:update'(entity, _, { elapsed }) {
        entity.value = elapsed
      },
    },
    cursor: {
      'mouse:move'(entity, { payload }) {
        entity.position = payload
      },
    },
    kitty: {
      'game:update'(entity, _, options) {
        const target = engine.getState().entities.cursor
        const arriveOptions = { radius: 8, timeToTarget: 10 }
        entity = {
          ...entity,
          ...arrive(entity, target, { ...options, ...arriveOptions }),
        }

        const [width, height] = engine.config.dimensions
        entity.position = vectors.clamp(
          entity.position,
          [0, 0, 0],
          [width, 0, height]
        )

        return entity
      },
    },
  },
  state: {
    entities: {
      elapsed: {
        type: 'elapsed',
        value: 0,
      },
      cursor: {
        type: 'cursor',
        position: [0, 0, 0],
      },
      neko: {
        type: 'kitty',
        speed: 500,
        position: [400, 0, 300],
        velocity: [0, 0, 0],
      },
    },
  },
}

export default config
