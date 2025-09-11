const INITIAL_ID = 0
const NOT_FOUND = -1
const ITEMS_TO_REMOVE = 1

export class EntityPool {
  _activeEntities = []
  _inactiveEntities = []
  _nextId = INITIAL_ID

  populate(factory, count) {
    for (let i = 0; i < count; i++) {
      this._activeEntities.push(factory())
    }
  }

  acquire(props) {
    const entity = this._inactiveEntities.pop() || {
      id: `entity-${this._nextId++}`,
    }
    Object.assign(entity, props)
    this._activeEntities.push(entity)
    return entity
  }

  recycle(entity) {
    const index = this._activeEntities.indexOf(entity)
    if (index !== NOT_FOUND) {
      const [entity] = this._activeEntities.splice(index, ITEMS_TO_REMOVE)
      this._inactiveEntities.push(entity)
    }
    return entity
  }

  getStats() {
    return {
      active: this._activeEntities.length,
      inactive: this._inactiveEntities.length,
    }
  }
}
