import engine from '../engine'
import { bounce } from '../utils/characters'

export default {
  bounds: [0, 0, 800, 600],
  types: {
    elapsed: {
      'game:update'(instance, _, { elapsed }) {
        instance.value = elapsed
      },
    },
    kitty: {
      'game:update'(instance) {
        bounce(instance, engine.config.bounds)
      },
    },
  },
  state: {
    instances: {
      elapsed: {
        type: 'elapsed',
        value: 0,
      },
      neko: {
        type: 'kitty',
        position: [0, 0, 0],
        velocity: [10, 0, 5],
        orientation: 0,
      },
    },
  },
}
