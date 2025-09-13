import { extend } from "@inglorious/utils/data-structures/objects.js"

const DEFAULT_STATE = "default"

export function fsm(states) {
  const uniqueEventNames = [
    ...new Set(Object.values(states).flatMap(Object.keys)),
  ]

  return (type) => {
    return extend(type, {
      create(entity, entityId, api) {
        type.create?.(entity, entityId, api)

        if (entityId !== entity.id) return

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
    })
  }
}
