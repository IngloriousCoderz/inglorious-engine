import { merge } from '@inglorious/utils/data-structures/objects.js'

import Loop from './engine/loop.js'
import { createStore } from './engine/store.js'
import { filter, map } from './utils/data-structures/object.js'
import { pipe } from './utils/functions/functions.js'

const DEFAULT_CONFIG = {
  bounds: [0, 0, 800, 600], // eslint-disable-line no-magic-numbers
  loop: { type: 'animationFrame' },
  types: { game: {} },
}

const ONE_SECOND = 1000
const FIRST = 0
const LAST = 1
const SECOND_TO_LAST = -1

export default class Engine {
  constructor(game, ui) {
    this._config = merge({}, DEFAULT_CONFIG, game)
    this._config.types = applyDecorators(this._config.types)
    this._config.types = turnTypesIntoFsm(this._config.types)
    this._store = createStore(this._config)
    this._loop = new Loop[this._config.loop.type]()
    this._ui = ui
  }

  get config() {
    return this._config
  }

  start() {
    const { fps } = this._config.loop
    const msPerFrame = ONE_SECOND / fps
    this._loop.start(this, msPerFrame)
    this.isRunning = true
  }

  update(dt) {
    this._store.update(dt)
  }

  render(dt) {
    this._ui?.render({
      dt,
      config: this._config,
      instances: this._store.getState().instances,
    })
  }

  notify = (event) => {
    this._store.notify(event)
  }

  stop() {
    this._store.notify({ id: 'game:stop' })
    this._store.update()
    this._loop.stop()
    this.isRunning = false
  }
}

function applyDecorators(types) {
  return map(types, (_, type) => {
    if (!Array.isArray(type)) {
      return type
    }

    const customType = type[type.length - LAST]
    const hasCustomType = typeof customType !== 'function'
    const decorators = hasCustomType ? type.slice(FIRST, SECOND_TO_LAST) : type
    let mergedType = pipe(...decorators)({})
    if (hasCustomType) {
      mergedType = merge(mergedType, customType)
    }
    return mergedType
  })
}

function turnTypesIntoFsm(types) {
  return map(types, (_, type) => {
    const topLevelEventHandlers = filter(
      type,
      (_, value) => typeof value === 'function'
    )
    const typeWithoutTopLevelEventHandlers = filter(
      type,
      (_, value) => typeof value !== 'function'
    )

    return merge(typeWithoutTopLevelEventHandlers, {
      states: { default: topLevelEventHandlers },
    })
  })
}
