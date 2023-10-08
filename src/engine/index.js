import Loop from './loop'
import { createStore } from './store'

const DEFAULT_WIDTH = 800
const DEFAULT_HEIGHT = 600
const DEFAULT_POSITION = 0

const DEFAULT_FPS = 60
const ONE_SECOND = 1000

const DEFAULT_CONFIG = {
  bounds: [DEFAULT_POSITION, DEFAULT_POSITION, DEFAULT_WIDTH, DEFAULT_HEIGHT],
  loop: { type: 'animationFrame', fps: DEFAULT_FPS },
}

export default class Engine {
  constructor(game) {
    const { types, state, ...rest } = game
    this._config = { ...DEFAULT_CONFIG, ...rest }
    this._store = createStore({ engine: this, types, state })
    this._loop = new Loop[this._config.loop.type]()
  }

  get config() {
    return this._config
  }

  get instances() {
    return this._store.getState().instances
  }

  add(id, instance) {
    this._store.add(id, instance)
  }

  remove(id) {
    this._store.remove(id)
  }

  notify(event) {
    this._store.notify(event)
  }

  start() {
    const { fps } = this.config.loop
    const msPerFrame = ONE_SECOND / fps
    this._loop.start(this, msPerFrame)
  }

  stop() {
    this._loop.stop()
  }

  update(elapsed) {
    this._store.update(elapsed)
  }
}
