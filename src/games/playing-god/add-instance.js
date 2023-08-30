import engine from '../../engine'
import { randomRange } from '../../utils/maths'

export default {
  bounds: [0, 0, 800, 600],
  types: {
    game: {
      'button:click'() {
        const ids = Object.keys(engine.store.getState().instances).filter(
          (id) => id.startsWith('instance')
        )

        const maxId = ids.length
          ? Number(ids[ids.length - 1].replace('instance', ''))
          : 0

        engine.store.add(`instance${maxId + 1}`, {
          type: 'character',
          position: [randomRange(0, 800), 0, randomRange(0, 600)],
          orientation: randomRange(0, 2 * Math.PI, 0.01),
        })
      },
    },
    elapsed: {
      'game:update'(instance, _, { elapsed }) {
        instance.value = elapsed
      },
    },
    button: {},
    character: {},
  },
  state: {
    instances: {
      debug: {
        type: 'elapsed',
        value: 0,
      },
      button: {
        type: 'button',
        position: [800 - 66, 0, 0],
        label: 'Add random instance',
      },
    },
  },
}
