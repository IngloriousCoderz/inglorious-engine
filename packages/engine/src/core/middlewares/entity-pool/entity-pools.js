import { EntityPool } from "./entity-pool"

export class EntityPools {
  _pools = new Map()

  acquire(entity) {
    this.lazyInit(entity)
    this._pools.get(entity.type).acquire(entity)
  }

  recycle(entity) {
    this.lazyInit(entity)
    this._pools.get(entity.type).recycle(entity)
  }

  getStats() {
    const stats = {}
    for (const [type, pool] of this._pools.entries()) {
      stats[type] = pool.getStats()
    }
    return stats
  }

  lazyInit(entity) {
    if (!this._pools.get(entity.type)) {
      this._pools.set(entity.type, new EntityPool())
    }
  }

  getAllActiveEntities() {
    const activeEntities = []
    for (const pool of this._pools.values()) {
      activeEntities.push(...pool._activeEntities)
    }
    return activeEntities
  }
}
