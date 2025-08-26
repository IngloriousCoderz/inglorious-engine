export function createMovementEventHandlers(events) {
  return events.reduce((acc, eventName) => {
    acc[eventName] = (entity, { inputId, value }) => {
      if (inputId !== entity.associatedInput) {
        return
      }

      entity.movement[eventName] = value ?? true
    }

    acc[`${eventName}End`] = (entity, { entityId }) => {
      if (entityId !== entity.id) {
        return
      }

      entity.movement[eventName] = false
    }

    return acc
  }, {})
}
