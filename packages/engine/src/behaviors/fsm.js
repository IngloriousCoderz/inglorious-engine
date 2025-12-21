const DEFAULT_STATE = "default"

export function fsm(states) {
  const uniqueEventNames = [
    ...new Set(Object.values(states).flatMap(Object.keys)),
  ]

  return (type) => {
    return {
      create(entity, payload, api) {
        type.create?.(entity, payload, api)

        entity.state ??= DEFAULT_STATE
      },

      ...uniqueEventNames.reduce(
        (acc, eventName) => ({
          ...acc,

          [eventName](entity, event, api) {
            type[eventName]?.(entity, event, api)

            const state = states[entity.state]
            state?.[eventName]?.(entity, event, api)
          },
        }),
        {},
      ),
    }
  }
}
