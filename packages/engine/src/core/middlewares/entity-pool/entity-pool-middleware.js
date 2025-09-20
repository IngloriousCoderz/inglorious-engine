import { EventMap } from "@inglorious/store/event-map.js"

export function entityPoolMiddleware(pools) {
  return (api) => {
    const types = api.getTypes()
    const eventMap = new EventMap()

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
