export function createMovementEventHandlers(events) {
  return events.reduce((acc, eventName) => {
    acc[eventName] = (entity, event) => {
      let entityId, value
      if (typeof event === "string") {
        entityId = event
      } else {
        entityId = event.entityId
        value = event.value
      }

      if (entityId === entity.id) {
        entity.movement[eventName] = value ?? true
      }
    }

    acc[`${eventName}End`] = (entity, entityId) => {
      if (entityId === entity.id) {
        entity.movement[eventName] = false
      }
    }

    return acc
  }, {})
}
