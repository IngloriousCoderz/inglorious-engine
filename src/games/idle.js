export default {
  bounds: [0, 0, 800, 600],
  // loop: { type: 'nap', fps: 10 },
  types: {
    elapsed: {
      'game:update'(instance, _, { elapsed }) {
        instance.value = elapsed
      },
    },
    cursor: {},
    character: {},
  },
  state: {
    instances: [
      {
        type: 'elapsed',
        value: 0,
      },
      {
        type: 'cursor',
        position: [0, 0, 0],
      },
      {
        type: 'character',
        position: [0, 0, 0],
      },
    ],
  },
}
