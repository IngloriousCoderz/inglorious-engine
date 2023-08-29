import seek from '../../../../ai/movement/kinematic/seek'
import engine from '../../../../engine'
import * as vectors from '../../../../utils/vectors'

export default {
  dimensions: [800, 600],
  types: {
    elapsed: {
      'game:update'(entity, _, { elapsed }) {
        entity.value = elapsed
      },
    },
    cursor: {
      'mouse:move'(entity, { payload }) {
        entity.position = vectors.subtract(payload, [16, 0, 16])

        const [width, height] = engine.config.dimensions
        entity.position = vectors.clamp(
          entity.position,
          [0, 0, 0],
          [width, 0, height]
        )
      },
    },
    kitty: {
      'game:update'(entity, _, options) {
        const target = engine.getState().instances.cursor
        entity = { ...entity, ...seek(entity, target, options) }

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
    instances: {
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
