import flee from '../../../../ai/movement/kinematic/flee'
import engine from '../../../../engine'
import * as maths from '../../../../utils/maths'

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
        const [width, height] = engine.config.dimensions

        const target = engine.getState().entities.cursor
        entity = { ...entity, ...flee(entity, target, options) }
        entity.position[0] = maths.clamp(entity.position[0], 0, width)
        entity.position[2] = maths.clamp(entity.position[2], 0, height)
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
        speed: 100,
        position: [400, 0, 300],
        velocity: [0, 0, 0],
      },
    },
  },
}

export default config
