import { extend } from "@inglorious/utils/data-structures/objects.js"

const DEFAULT_STATE = "default"

export function enableFsm(states) {
  return (type) => {
    const uniqueEventNames = [
      ...new Set(Object.values(states).flatMap(Object.keys)),
    ]

    const newType = uniqueEventNames.reduce(
      (acc, eventName) => ({
        ...acc,

        [eventName](instance, event, options) {
          type[eventName]?.(instance, event, options)

          const state = states[instance.state ?? DEFAULT_STATE]
          state?.[eventName]?.(instance, event, options)
        },
      }),
      {},
    )

    return extend(type, newType)
  }
}
