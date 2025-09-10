export function entityPoolMiddleware(pools) {
  return (api) => (next) => (event) => {
    switch (event.type) {
      case "spawn": {
        pools.acquire(event.payload)
        break
      }

      case "despawn": {
        pools.recycle(event.payload)
        break
      }

      default: {
        const types = api.getTypes()
        pools._pools.values().forEach((pool) => {
          pool._activeEntities.forEach((entity) => {
            const type = types[entity.type]
            const handle = type[event.type]
            handle?.(entity, event.payload, api)
          })
        })
      }
    }

    return next(event)
  }
}
