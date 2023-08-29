export default {
  fps: 30,
  dimensions: [800, 600],
  // loop: { type: 'nap', fps: 10 },
  types: {
    elapsed: {
      'game:update'(instance, _, { elapsed }) {
        instance.value = elapsed
      },
    },
    cursor: {},
    kitty: {},
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
        position: [0, 0, 0],
        velocity: [0, 0, 0],
        orientation: 0,
      },
    },
  },
}
