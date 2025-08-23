export function createMovementEventHandlers(events) {
  return events.reduce((acc, eventName) => {
    acc[eventName] = (entity, { id, value }) => {
      if (id !== entity.associatedInput) {
        return
      }

      entity.movement ??= {}
      entity.movement[eventName] = value ?? true
    }

    acc[`${eventName}End`] = (entity, { id }) => {
      if (id !== entity.associatedInput) {
        return
      }

      entity.movement ??= {}
      entity.movement[eventName] = false
    }

    return acc
  }, {})
}
