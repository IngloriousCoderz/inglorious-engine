import { createApi } from "@inglorious/store/api.js"
import { EventMap } from "@inglorious/store/event-map.js"

import { EntityPools } from "./entity-pools"

export function entityPoolMiddleware() {
  return (store) => {
    const pools = new EntityPools()
    const types = store.getTypes()
    const eventMap = new EventMap()

    store.extras ??= {}
    store.extras.getAllActivePoolEntities = () => pools.getAllActiveEntities()

    const game = store.getState().game
    if (game.devMode) {
      store.extras.getEntityPoolsStats = () => pools.getStats()
    }

    const api = createApi(store)

    return (next) => (event) => {
      switch (event.type) {
        case "spawn": {
          const entity = pools.acquire(event.payload)
          const type = types[entity.type]
          eventMap.addEntity(entity.id, type)
          break
        }

        case "despawn": {
          const entity = pools.recycle(event.payload)
          const type = types[entity.type]
          eventMap.removeEntity(entity.id, type)
          break
        }

        default: {
          const entityIds = eventMap.getEntitiesForEvent(event.type)
          for (const id of entityIds) {
            const entity = pools.activeEntitiesById.get(id)
            const type = types[entity.type]
            const handle = type[event.type]
            handle?.(entity, event.payload, api)
          }
        }
      }

      return next(event)
    }
  }
}
