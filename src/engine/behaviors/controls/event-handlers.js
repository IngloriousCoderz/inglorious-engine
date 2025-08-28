export function createMovementEventHandlers(events) {
  return events.reduce((acc, eventName) => {
    acc[eventName] = (entity, { entityId, value }) => {
      if (entityId === entity.id) {
        entity.movement[eventName] = value ?? true
      }
    }

    acc[`${eventName}End`] = (entity, { entityId }) => {
      if (entityId === entity.id) {
        entity.movement[eventName] = false
      }
    }

    return acc
  }, {})
}
