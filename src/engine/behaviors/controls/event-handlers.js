export function createMovementEventHandlers(events) {
  return events.reduce((acc, eventName) => {
    acc[eventName] = (entity, { inputId, value }) => {
      if (inputId !== entity.onInput) {
        return
      }

      entity.movement ??= {}
      entity.movement[eventName] = value ?? true
    }

    acc[`${eventName}End`] = (entity, { inputId }) => {
      if (inputId !== entity.onInput) {
        return
      }

      entity.movement ??= {}
      entity.movement[eventName] = false
    }

    return acc
  }, {})
}
