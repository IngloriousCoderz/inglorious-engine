import engine from '../engine'

const gameConfig = {
  fps: 1,
  handlers: {
    kitty: {
      'game:update'(entity) {
        entity.x = (entity.x + 10) % 100
        entity.y = (entity.y + 5) % 100
      },
    },
  },
  state: {
    entities: [
      {
        id: 'neko',
        type: 'kitty',
        x: 50,
        y: 50,
      },
    ],
  },
}

engine.load(gameConfig)
engine.start('nap') // TODO: retrieve from config

export default engine
