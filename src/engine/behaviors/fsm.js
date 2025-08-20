import { extend } from "@inglorious/utils/data-structures/objects.js"

const DEFAULT_STATE = "default"

export function fsm(states) {
  return (type) => {
    const uniqueEventNames = [
      ...new Set(Object.values(states).flatMap(Object.keys)),
    ]

    const newType = uniqueEventNames.reduce(
      (acc, eventName) => ({
        ...acc,

        [eventName](entity, event, options) {
          type[eventName]?.(entity, event, options)

          const state = states[entity.state ?? DEFAULT_STATE]
          state?.[eventName]?.(entity, event, options)
        },
      }),
      {},
    )

    return extend(type, newType)
  }
}
